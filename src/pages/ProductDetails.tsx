import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { Heart, Star, ShoppingBag, X, Send, Share2, Ruler, MessageCircle, Link } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import Modal from '../components/ui/Modal';
import { toast } from 'sonner';
import SEO from '../components/common/SEO';

// Mock Social Icons (using lucide or similar logic)
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(state => state.wishlist.items);

    const [product, setProduct] = useState<any>(null);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [availableSizes, setAvailableSizes] = useState<string[]>([]);
    const [activeImage, setActiveImage] = useState('');

    // Modals State
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
    const [reviewName, setReviewName] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviews, setReviews] = useState([
        { id: 1, name: "Sarah J.", rating: 5, comment: "Absolutely love the quality! Fits perfectly.", date: "2 days ago" },
    ]);

    const isWishlist = product ? wishlistItems.some((item: any) => item.id === product.id) : false;
    const colors = product ? Array.from(new Set(product.variants?.map((v: any) => v.color))) : [];

    useEffect(() => {
        if (id) {
            api.get(`/products/${id}`).then(res => {
                const p = res.data;
                const variants = p.variants || [];
                const colors = Array.from(new Set(variants.map((v: any) => v.color))).filter(Boolean) as string[];

                if (colors.length > 0) {
                    setSelectedColor(colors[0]);
                }

                const mappedProduct = {
                    ...p,
                    price: `₹${p.sale_price || p.price}`,
                    image: p.product_images?.find((img: any) => img.is_main)?.image_path || p.product_images?.[0]?.image_path || '/images/placeholder.jpg',
                    images: p.product_images?.map((img: any) => img.image_path) || [p.image],
                    variants: variants
                };
                setProduct(mappedProduct);
                setActiveImage(mappedProduct.image);
            }).catch(err => {
                console.error(err);
                setProduct(null);
                toast.error("Failed to load product. Please try again later.");
            });
        }
    }, [id]);

    useEffect(() => {
        if (product && selectedColor) {
            const sizesForColor = product.variants
                .filter((v: any) => v.color === selectedColor && v.stock > 0)
                .map((v: any) => v.size);
            setAvailableSizes(sizesForColor);

            if (!sizesForColor.includes(selectedSize)) {
                setSelectedSize(sizesForColor[0] || '');
            }

            // Switch to variant image if available
            const variantWithImage = product.variants.find((v: any) => v.color === selectedColor && v.image);
            if (variantWithImage && variantWithImage.image) {
                setActiveImage(variantWithImage.image);
            } else {
                // Fallback to main product image
                setActiveImage(product.image);
            }
        }
    }, [selectedColor, product]);

    const addToCartHandler = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color");
            return;
        }

        const variant = product.variants.find((v: any) => v.color === selectedColor && v.size === selectedSize);

        if (!variant) {
            toast.error("Selected combination unavailable");
            return;
        }

        dispatch(addToCart({
            ...product,
            variantId: variant.id,
            selectedSize,
            selectedColor,
            price: variant.price || product.sale_price || parseInt(product.price.replace('₹', ''))
        }));
        toast.success(`Added ${product.name} to Cart`);
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        setIsReviewOpen(false);
        toast.success("Review submitted!");
    };

    const handleShare = (platform: string) => { /* Social share logic */ };

    if (!product) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
                    <p className="text-gray-500">Please wait while we fetch the product details.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO title={`${product.name} | SS`} description={product.description} />
            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Breadcrumbs */}
                <div className="text-sm text-gray-400 mb-8 flex gap-2 items-center">
                    <span>Home</span> / <span>Shop</span> / <span className="text-gray-900 font-medium">{product.name}</span>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[100px_1fr_400px] gap-8 lg:gap-16 items-start">

                    {/* Gallery */}
                    <div className="order-2 lg:order-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full">
                        {product.images?.map((img: string, i: number) => (
                            <button key={i} onClick={() => setActiveImage(img)} className={`flex-shrink-0 w-20 h-24 lg:w-full lg:h-32 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-black' : 'border-transparent'}`}>
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="order-1 lg:order-2 w-full aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">
                        <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="order-3 lg:order-3 sticky top-32 space-y-8">
                        <div>
                            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{product.category}</span>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-4">{product.name}</h1>
                            <div className="text-3xl font-medium">{product.price}</div>
                        </div>

                        {/* Variants */}
                        <div className="space-y-6 pt-6 border-t border-gray-100">
                            {/* Colors */}
                            <div>
                                <span className="text-sm font-bold block mb-3">Color: {selectedColor}</span>
                                <div className="flex gap-2">
                                    {colors.map((color: any) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 border rounded-full text-sm transition-all ${selectedColor === color ? 'bg-black text-white' : 'hover:border-black'}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <div className="flex justify-between mb-3">
                                    <span className="text-sm font-bold">Size: {selectedSize || 'Select Color first'}</span>
                                    <button onClick={() => setIsSizeChartOpen(true)} className="text-xs underline flex items-center gap-1"><Ruler className="w-3" /> Size Chart</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => {
                                        const isAvailable = availableSizes.includes(size);
                                        return (
                                            <button
                                                key={size}
                                                disabled={!isAvailable}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 flex items-center justify-center text-sm font-bold border rounded-lg transition-all
                                                    ${selectedSize === size ? 'bg-black text-white border-black' :
                                                        isAvailable ? 'hover:border-black text-gray-800' : 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400'}`}
                                            >
                                                {size}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex gap-4">
                            <button
                                onClick={addToCartHandler}
                                className="flex-1 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                            >
                                <ShoppingBag className="w-5 h-5" /> Add to Cart
                            </button>
                            <button
                                onClick={() => dispatch(toggleWishlist(product))}
                                className={`w-14 h-14 flex items-center justify-center border-2 rounded-xl transition-all ${isWishlist ? 'border-red-500 text-red-500' : 'border-gray-200'}`}
                            >
                                <Heart className={`w-6 h-6 ${isWishlist ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Meta & Social */}
                <div className="pt-8 space-y-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <span>Tag: <span className="text-gray-900">Winter, Knitwear</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-900">Share:</span>
                        <div className="flex gap-3">
                            <button onClick={() => handleShare('whatsapp')} className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold hover:bg-gray-200 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleShare('facebook')} className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold hover:bg-gray-200 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleShare('instagram')} className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold hover:bg-gray-200 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleShare('copy')} className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold hover:bg-gray-200 transition-colors" title="Copy Link">
                                <Link className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* REVIEW MODAL */}
            <Modal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                title="Customer Reviews"
                maxWidth="max-w-2xl"
            >
                <div className="space-y-8">
                    {/* Review List */}
                    <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                                            <span className="text-xs text-gray-400">{review.date}</span>
                                        </div>
                                        <div className="flex text-brand-gold">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 py-8">No reviews yet. Be the first!</p>
                        )}
                    </div>

                    {/* Write Review Form */}
                    <div className="bg-gray-50 p-6 rounded-2xl">
                        <h4 className="font-bold text-gray-900 mb-4">Write a Review</h4>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewRating(star)}
                                            className={`transition-transform hover:scale-110 ${star <= reviewRating ? 'text-brand-gold' : 'text-gray-300'}`}
                                        >
                                            <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-current' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    value={reviewName}
                                    onChange={e => setReviewName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-black text-sm"
                                />
                                <textarea
                                    required
                                    placeholder="Your Review"
                                    rows={3}
                                    value={reviewComment}
                                    onChange={e => setReviewComment(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-black text-sm resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-brand-black text-white py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" /> Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>

            {/* SIZE CHART MODAL */}
            <Modal
                isOpen={isSizeChartOpen}
                onClose={() => setIsSizeChartOpen(false)}
                title="Size Guide"
                maxWidth="max-w-3xl"
            >
                <div className="space-y-6">
                    <p className="text-gray-600 text-sm">
                        All measurements are in inches. Please measure your best-fitting garment and compare with the chart below.
                    </p>

                    {/* Mock Table based on reference */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-xl">Size</th>
                                    <th className="px-6 py-4">Chest (Inches)</th>
                                    <th className="px-6 py-4">Length (Inches)</th>
                                    <th className="px-6 py-4 rounded-tr-xl">Shoulder (Inches)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-6 py-4 font-bold">Small (S)</td>
                                    <td className="px-6 py-4 text-gray-600">38</td>
                                    <td className="px-6 py-4 text-gray-600">27</td>
                                    <td className="px-6 py-4 text-gray-600">16.5</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">Medium (M)</td>
                                    <td className="px-6 py-4 text-gray-600">40</td>
                                    <td className="px-6 py-4 text-gray-600">28</td>
                                    <td className="px-6 py-4 text-gray-600">17.5</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">Large (L)</td>
                                    <td className="px-6 py-4 font-bold">42</td>
                                    <td className="px-6 py-4 text-gray-600">29</td>
                                    <td className="px-6 py-4 text-gray-600">18.5</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">X-Large (XL)</td>
                                    <td className="px-6 py-4 text-gray-600">44</td>
                                    <td className="px-6 py-4 text-gray-600">30</td>
                                    <td className="px-6 py-4 text-gray-600">19.5</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">XX-Large (XXL)</td>
                                    <td className="px-6 py-4 text-gray-600">46</td>
                                    <td className="px-6 py-4 text-gray-600">31</td>
                                    <td className="px-6 py-4 text-gray-600">20.5</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">XXX-Large (XXXL)</td>
                                    <td className="px-6 py-4 text-gray-600">48</td>
                                    <td className="px-6 py-4 text-gray-600">32</td>
                                    <td className="px-6 py-4 text-gray-600">21.5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl flex gap-4 items-start">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                            <Ruler className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">How to Measure</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                <strong>Chest:</strong> Measure around the fullest part of the chest.<br />
                                <strong>Length:</strong> Measure from the highest point of the shoulder to the bottom hem.<br />
                                <strong>Shoulder:</strong> Measure across the back from shoulder tip to shoulder tip.
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
}

