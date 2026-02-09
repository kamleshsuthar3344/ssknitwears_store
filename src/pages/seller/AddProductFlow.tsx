import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, Check, X, Tag, IndianRupee, FileText, Plus, Trash2, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'sonner';

interface Variant {
    id: string; // temp id for UI
    color: string;
    size: string;
    stock: number;
    price: number;
    imageFile?: File;
    imagePreview?: string;
}

export default function AddProductFlow() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Images, 2: Basic Info, 3: Variants

    // Step 1: Images
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const variantFileInputRef = useRef<HTMLInputElement>(null);
    const [activeVariantId, setActiveVariantId] = useState<string | null>(null);

    // Step 2: Info
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Men');
    const [season, setSeason] = useState('All');

    // Step 3: Variants
    const [hasVariants, setHasVariants] = useState(false);
    const [simpleStock, setSimpleStock] = useState('100');

    const [availableSizes, setAvailableSizes] = useState<string[]>([]);
    const [colorsInput, setColorsInput] = useState(''); // Comma separated
    const [generatedVariants, setGeneratedVariants] = useState<Variant[]>([]);

    const [loading, setLoading] = useState(false);

    // Handlers
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages(prev => [...prev, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Variant Image Handlers
    const triggerVariantImageUpload = (id: string) => {
        setActiveVariantId(id);
        variantFileInputRef.current?.click();
    };

    const handleVariantImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && activeVariantId) {
            const file = e.target.files[0];
            const preview = URL.createObjectURL(file);

            setGeneratedVariants(prev => prev.map(v =>
                v.id === activeVariantId
                    ? { ...v, imageFile: file, imagePreview: preview }
                    : v
            ));

            // Reset input
            e.target.value = '';
            setActiveVariantId(null);
        }
    };

    const toggleSize = (size: string) => {
        if (availableSizes.includes(size)) {
            setAvailableSizes(prev => prev.filter(s => s !== size));
        } else {
            setAvailableSizes(prev => [...prev, size]);
        }
    };

    const generateVariants = () => {
        const colors = colorsInput.split(',').map(c => c.trim()).filter(c => c !== '');
        if (colors.length === 0) colors.push('Default');
        if (availableSizes.length === 0) availableSizes.push('One Size');

        const newVariants: Variant[] = [];
        colors.forEach(color => {
            availableSizes.forEach(size => {
                newVariants.push({
                    id: `${color}-${size}-${Date.now()}`,
                    color: color === 'Default' ? '' : color,
                    size: size === 'One Size' ? '' : size,
                    stock: 10, // Default stock
                    price: Number(price) || 0
                });
            });
        });
        setGeneratedVariants(newVariants);
    };

    const updateVariant = (id: string, field: keyof Variant, value: any) => {
        setGeneratedVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
    };

    const handlePost = async () => {
        if (images.length === 0) return toast.error('Please add at least one image');
        if (!name || !price) return toast.error('Please fill basic info');

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('season', season);

            // Images
            images.forEach((file, index) => {
                formData.append(`images[]`, file);
            });

            // Variants with Images
            if (hasVariants) {
                // Sanitize variants (remove id, temporary fields)
                const variantsToSend = generatedVariants.map(({ id, imageFile, imagePreview, ...rest }) => rest);
                formData.append('variants', JSON.stringify(variantsToSend));

                // Append Variant Images
                generatedVariants.forEach((variant, index) => {
                    if (variant.imageFile) {
                        formData.append(`variant_images[${index}]`, variant.imageFile);
                    }
                });
            } else {
                // Create a single default variant behind the scenes or just use product stock
                // Backend controller expects variants array or handled manually.
                // Our rewritten controller logic handles "stock" on product text if no variants? 
                // Wait, logic says `stock` => 0, variants aggregate. 
                // So if no variants, we should create a 'dummy' variant or just send stock for simple tracking?
                // Actually, the controller increments stock from variants. 
                // Let's create a single 'default' variant for simple products.
                const defaultVariant = [{
                    color: 'Default',
                    size: 'One Size',
                    stock: Number(simpleStock),
                    price: Number(price)
                }];
                formData.append('variants', JSON.stringify(defaultVariant));
            }

            await api.post('/seller/products', formData, {
                headers: {
                    'Content-Type': undefined // Let browser set multipart/form-data with boundary
                }
            });

            toast.success('Product Created Successfully!');
            navigate('/seller/products');
        } catch (error: any) {
            console.error('Upload failed', error);
            toast.error(error.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-black text-white md:bg-gray-50 md:text-black md:h-auto md:min-h-screen">
            {/* Header */}
            <header className="flex justify-between items-center p-4 shadow-sm bg-black/50 backdrop-blur-md sticky top-0 md:bg-white md:border-b">
                <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="text-white md:text-black">
                    <ArrowLeft />
                </button>
                <h1 className="font-bold text-lg">
                    {step === 1 ? 'Select Images' : (step === 2 ? 'Details' : 'Variants')}
                </h1>
                <button
                    onClick={step === 3 ? handlePost : () => setStep(step + 1)}
                    className="text-brand-gold font-bold md:text-blue-600"
                    disabled={loading}
                >
                    {step === 3 ? (loading ? 'Posting...' : 'Share') : 'Next'}
                </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto md:max-w-2xl md:mx-auto md:p-6 md:w-full">
                <AnimatePresence mode="wait">

                    {/* STEP 1: IMAGES */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-4 grid grid-cols-3 gap-2"
                        >
                            {/* Upload Button */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square bg-gray-800 rounded-lg flex flex-col items-center justify-center border border-gray-700 cursor-pointer md:bg-gray-200 md:border-gray-300 md:hover:bg-gray-300 transition-colors"
                            >
                                <Plus className="w-8 h-8 text-gray-400" />
                                <span className="text-xs text-gray-400 mt-1">Add Photo</span>
                            </div>

                            {/* Previews */}
                            {previews.map((src, idx) => (
                                <div key={idx} className="aspect-square relative rounded-lg overflow-hidden group">
                                    <img src={src} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-3 h-3 text-white" />
                                    </button>
                                    {idx === 0 && <span className="absolute bottom-1 left-1 bg-black/60 text-[10px] px-1 rounded">Main</span>}
                                </div>
                            ))}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageSelect}
                                className="hidden"
                                accept="image/*"
                                multiple // Allow multiple!
                            />
                        </motion.div>
                    )}

                    {/* STEP 2: DETAILS */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-4 space-y-6"
                        >
                            <div className="flex gap-4 items-start pb-6 border-b border-gray-800 md:border-gray-200">
                                {previews[0] && <img src={previews[0]} className="w-20 h-20 rounded object-cover bg-gray-800" />}
                                <textarea
                                    className="bg-transparent w-full text-lg resize-none focus:outline-none h-20 md:text-gray-900 placeholder-gray-500"
                                    placeholder="Write a caption... (Description)"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <FormInput icon={Tag} placeholder="Product Name" value={name} onChange={(e: any) => setName(e.target.value)} />
                                <FormInput icon={IndianRupee} placeholder="Base Price" type="number" value={price} onChange={(e: any) => setPrice(e.target.value)} />

                                {/* Category Select */}
                                <div className="flex items-center gap-3 py-3 border-b border-gray-800 md:border-gray-200">
                                    <Layers className="w-5 h-5 text-gray-400" />
                                    <select
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        className="bg-transparent w-full focus:outline-none md:text-gray-900 border-none px-0"
                                    >
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>

                                {/* Season Select */}
                                <div className="flex items-center gap-3 py-3 border-b border-gray-800 md:border-gray-200">
                                    <Tag className="w-5 h-5 text-gray-400" />
                                    <select
                                        value={season}
                                        onChange={e => setSeason(e.target.value)}
                                        className="bg-transparent w-full focus:outline-none md:text-gray-900 border-none px-0"
                                    >
                                        <option value="All">All Seasons</option>
                                        <option value="Summer">Summer</option>
                                        <option value="Winter">Winter</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: VARIANTS */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-4 space-y-6"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold md:text-gray-900">Variables & Stock</h3>
                                <div className="flex items-center bg-gray-800 rounded-full p-1 md:bg-gray-200">
                                    <button
                                        onClick={() => setHasVariants(false)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${!hasVariants ? 'bg-brand-gold text-black' : 'text-gray-400'}`}
                                    >Simple</button>
                                    <button
                                        onClick={() => setHasVariants(true)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${hasVariants ? 'bg-brand-gold text-black' : 'text-gray-400'}`}
                                    >Variants</button>
                                </div>
                            </div>

                            {!hasVariants ? (
                                <div className="space-y-4">
                                    <label className="block text-sm text-gray-400 md:text-gray-600">Total Stock Quantity</label>
                                    <input
                                        type="number"
                                        value={simpleStock}
                                        onChange={e => setSimpleStock(e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-gold focus:outline-none md:bg-white md:text-black md:border-gray-300"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Configurator */}
                                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 md:bg-white md:border-gray-200 md:shadow-sm">
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-400 mb-2 md:text-gray-600">Available Sizes</p>
                                            <div className="flex gap-2 flex-wrap">
                                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={() => toggleSize(s)}
                                                        className={`px-3 py-1 rounded border text-sm transition-colors ${availableSizes.includes(s) ? 'bg-brand-gold border-brand-gold text-black' : 'border-gray-600 text-gray-400 hover:border-gray-500'}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-400 mb-2 md:text-gray-600">Colors (comma separated)</p>
                                            <input
                                                type="text"
                                                value={colorsInput}
                                                onChange={e => setColorsInput(e.target.value)}
                                                placeholder="e.g. Red, Blue, Forest Green"
                                                className="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm focus:border-brand-gold focus:outline-none md:border-gray-300 md:text-black"
                                            />
                                        </div>
                                        <button
                                            onClick={generateVariants}
                                            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Generate / Refresh Table
                                        </button>
                                    </div>

                                    {/* Table */}
                                    {generatedVariants.length > 0 && (
                                        <div className="overflow-x-auto rounded-lg border border-gray-800 md:border-gray-200">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-gray-900 text-gray-400 md:bg-gray-100 md:text-gray-600">
                                                    <tr>
                                                        <th className="p-3">Image</th>
                                                        <th className="p-3">Color</th>
                                                        <th className="p-3">Size</th>
                                                        <th className="p-3">Stock</th>
                                                        <th className="p-3">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-800 md:divide-gray-200">
                                                    {generatedVariants.map(variant => (
                                                        <tr key={variant.id} className="md:text-black">
                                                            <td className="p-3">
                                                                <div
                                                                    onClick={() => triggerVariantImageUpload(variant.id)}
                                                                    className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center cursor-pointer overflow-hidden border border-gray-700 md:bg-gray-100 md:border-gray-300"
                                                                >
                                                                    {variant.imagePreview ? (
                                                                        <img src={variant.imagePreview} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <Upload className="w-4 h-4 text-gray-500" />
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="p-3">{variant.color}</td>
                                                            <td className="p-3">{variant.size}</td>
                                                            <td className="p-3">
                                                                <input
                                                                    type="number"
                                                                    value={variant.stock}
                                                                    onChange={e => updateVariant(variant.id, 'stock', parseInt(e.target.value))}
                                                                    className="w-16 bg-transparent border border-gray-700 rounded px-1 py-1 text-center md:border-gray-300 focus:border-brand-gold focus:outline-none"
                                                                />
                                                            </td>
                                                            <td className="p-3">
                                                                <input
                                                                    type="number"
                                                                    value={variant.price}
                                                                    onChange={e => updateVariant(variant.id, 'price', parseInt(e.target.value))}
                                                                    className="w-20 bg-transparent border border-gray-700 rounded px-1 py-1 text-center md:border-gray-300 focus:border-brand-gold focus:outline-none"
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {/* Hidden Input for Variant Images */}
                                            <input
                                                type="file"
                                                ref={variantFileInputRef}
                                                onChange={handleVariantImageSelect}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

// Helper Component for consistent inputs
function FormInput({ icon: Icon, type = "text", ...props }: any) {
    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-800 md:border-gray-200">
            <Icon className="w-5 h-5 text-gray-400" />
            <input
                type={type}
                className="bg-transparent w-full focus:outline-none md:text-gray-900 placeholder-gray-500"
                {...props}
            />
        </div>
    );
}
