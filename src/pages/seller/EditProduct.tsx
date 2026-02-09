import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Tag, IndianRupee, Layers } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'sonner';

interface Variant {
    id: string; // temp id for UI or real id
    color: string;
    size: string;
    stock: number;
    price: number;
    image?: string; // URL from backend
    imageFile?: File; // New upload
    imagePreview?: string; // Preview of new upload
}

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Data State
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Men');
    const [season, setSeason] = useState('All');

    const [previews, setPreviews] = useState<{ id?: number, url: string }[]>([]); // Mixed: existing (id) & new (no id)
    const [newImages, setNewImages] = useState<File[]>([]);
    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

    // Variants
    const [variants, setVariants] = useState<Variant[]>([]);
    const [hasVariants, setHasVariants] = useState(false);

    // Variant Generator State
    const [availableSizes, setAvailableSizes] = useState<string[]>([]);
    const [colorsInput, setColorsInput] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const variantFileInputRef = useRef<HTMLInputElement>(null);
    const [activeVariantId, setActiveVariantId] = useState<string | null>(null);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const { data } = await api.get(`/products/${id}`);
            setName(data.name);
            setPrice(data.price);
            setDescription(data.description);
            setCategory(data.category);
            setSeason(data.season);

            // Images
            if (data.product_images && data.product_images.length > 0) {
                setPreviews(data.product_images.map((img: any) => ({
                    id: img.id,
                    url: img.image_path
                })));
            } else if (data.images && data.images.main) {
                // Legacy support
                setPreviews([{ url: data.images.main }]);
            }

            // Variants
            if (data.variants && data.variants.length > 0) {
                setHasVariants(true);
                setVariants(data.variants.map((v: any) => ({
                    id: v.id, // Keep ID for tracking if we were doing smart updates, but we might just wipe
                    color: v.color || 'Default',
                    size: v.size || 'One Size',
                    stock: v.stock,
                    price: v.price,
                    image: v.image // Load existing image URL
                })));
            } else {
                setHasVariants(false);
                // Maybe set simple stock from product.stock
            }
        } catch (error) {
            toast.error('Failed to load product');
            navigate('/seller/products');
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...newFiles]);

            const newPrevs = newFiles.map(file => ({
                url: URL.createObjectURL(file)
            }));
            setPreviews(prev => [...prev, ...newPrevs]);
        }
    };

    const removeImage = (index: number) => {
        const imageToRemove = previews[index];

        if (imageToRemove.id) {
            // It's an existing image, mark for deletion
            setDeletedImageIds(prev => [...prev, imageToRemove.id!]);
        }
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

            setVariants(prev => prev.map(v =>
                v.id === activeVariantId
                    ? { ...v, imageFile: file, imagePreview: preview }
                    : v
            ));

            // Reset input
            e.target.value = '';
            setActiveVariantId(null);
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
                    id: `temp-${color}-${size}-${Date.now()}`,
                    color: color === 'Default' ? '' : color,
                    size: size === 'One Size' ? '' : size,
                    stock: 10,
                    price: Number(price) || 0
                });
            });
        });
        setVariants(newVariants);
    };

    const handleUpdate = async () => {
        setSaving(true);
        try {
            // Use _method: PUT for FormData
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('name', name);
            formData.append('price', price.toString());
            formData.append('description', description);
            formData.append('category', category);
            formData.append('season', season);

            newImages.forEach(file => {
                formData.append('images[]', file);
            });

            // Append deleted IDs
            if (deletedImageIds.length > 0) {
                formData.append('deleted_images', JSON.stringify(deletedImageIds));
            }

            if (hasVariants) {
                const variantsToSend = variants.map(({ id, imageFile, imagePreview, ...rest }) => rest);
                formData.append('variants', JSON.stringify(variantsToSend));

                // Append Variant Images
                variants.forEach((variant, index) => {
                    if (variant.imageFile) {
                        formData.append(`variant_images[${index}]`, variant.imageFile);
                    }
                });
            }

            await api.post(`/seller/products/${id}`, formData, {
                headers: { 'Content-Type': undefined }
            });

            toast.success('Product Updated!');
            navigate('/seller/products');
        } catch (error) {
            toast.error('Update failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Data...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
            <header className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
                <button onClick={() => navigate('/seller/products')} className="flex items-center gap-2">
                    <ArrowLeft /> Back
                </button>
                <h1 className="font-bold text-xl">Edit Product</h1>
                <button onClick={handleUpdate} disabled={saving} className="text-blue-600 font-bold">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </header>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Images */}
                <section className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="font-bold mb-4">Images</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-dashed border-2 border-gray-300 cursor-pointer"
                        >
                            <Plus className="w-6 h-6 text-gray-400" />
                        </div>
                        {previews.map((item, idx) => (
                            <div key={idx} className="aspect-square relative rounded-lg overflow-hidden group">
                                <img src={item.url} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-3 h-3 text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleImageSelect} className="hidden" multiple />
                </section>

                {/* Details */}
                <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-bold mb-4">Basic Details</h2>
                    <FormInput icon={Tag} label="Name" value={name} onChange={setName} />
                    <FormInput icon={IndianRupee} label="Price" value={price} onChange={setPrice} type="number" />
                    <textarea
                        className="w-full border rounded p-2"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                    />
                </section>

                {/* Variants */}
                <section className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold">Variants</h2>
                        <button onClick={() => setHasVariants(!hasVariants)} className="text-sm text-blue-600">
                            {hasVariants ? 'Switch to Simple' : 'Enable Variants'}
                        </button>
                    </div>

                    {hasVariants && (
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded text-sm mb-4">
                                <p className="mb-2 font-bold">Generator</p>
                                <input
                                    placeholder="Colors (Red, Blue)"
                                    value={colorsInput}
                                    onChange={e => setColorsInput(e.target.value)}
                                    className="border p-1 rounded mr-2"
                                />
                                <button onClick={generateVariants} className="bg-black text-white px-3 py-1 rounded">Generate</button>
                            </div>

                            {variants.length > 0 && (
                                <>
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="p-2">Image</th>
                                                <th className="p-2">Color</th>
                                                <th className="p-2">Size</th>
                                                <th className="p-2">Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {variants.map((v, i) => (
                                                <tr key={i} className="border-b">
                                                    <td className="p-2">
                                                        <div
                                                            onClick={() => triggerVariantImageUpload(v.id)}
                                                            className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center cursor-pointer overflow-hidden border border-gray-300"
                                                        >
                                                            {v.imagePreview ? (
                                                                <img src={v.imagePreview} className="w-full h-full object-cover" />
                                                            ) : v.image ? (
                                                                <img src={v.image} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <Plus className="w-4 h-4 text-gray-400" />
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-2">{v.color}</td>
                                                    <td className="p-2">{v.size}</td>
                                                    <td className="p-2">
                                                        <input
                                                            value={v.stock}
                                                            onChange={e => {
                                                                const newV = [...variants];
                                                                newV[i].stock = parseInt(e.target.value);
                                                                setVariants(newV);
                                                            }}
                                                            className="w-16 border rounded p-1"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <input
                                        type="file"
                                        ref={variantFileInputRef}
                                        onChange={handleVariantImageSelect}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </>
                            )}
                        </div>
                    )}
                </section>
            </div >
        </div >
    );
}

function FormInput({ label, value, onChange, type = 'text', icon: Icon }: any) {
    return (
        <div>
            <label className="block text-sm text-gray-500 mb-1">{label}</label>
            <div className="flex items-center gap-2 border rounded-lg p-2">
                {Icon && <Icon className="w-4 h-4 text-gray-400" />}
                <input value={value} onChange={e => onChange(e.target.value)} type={type} className="w-full outline-none" />
            </div>
        </div>
    );
}
