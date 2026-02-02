import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { productData } from '../data/productData';
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
    const product = productData.find(p => p.id === Number(id)) || productData[0];
    const [selectedSize, setSelectedSize] = useState('M');
    const [activeImage, setActiveImage] = useState(product.image);

    // Modals State
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

    // Review Form State
    const [reviewName, setReviewName] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviews, setReviews] = useState([
        { id: 1, name: "Sarah J.", rating: 5, comment: "Absolutely love the quality! Fits perfectly.", date: "2 days ago" },
        { id: 2, name: "Michael B.", rating: 4, comment: "Great texture, but shipping took a while.", date: "1 week ago" }
    ]);

    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(state => state.wishlist.items);
    const isWishlist = wishlistItems.some(item => item.id === product.id);

    const sizes = ['S', 'M', 'L', 'XL'];

    // Mock dummy gallery since we might only have one image in mock data
    const galleryImages = [product.image, product.image, product.image, product.image];

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        const newReview = {
            id: reviews.length + 1,
            name: reviewName,
            rating: reviewRating,
            comment: reviewComment,
            date: "Just now"
        };
        setReviews([newReview, ...reviews]);
        setReviewName('');
        setReviewComment('');
        setIsReviewOpen(false);
        toast.success("Review submitted successfully!");
    };

    const handleShare = (platform: string) => {
        if (platform === 'copy') {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
            return;
        }
        // Mock share functionality
        console.log(`Sharing to ${platform}`);
        toast.success(`Shared to ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
    };

    return (
        <Layout>
            <SEO
                title={`${product.name} | SSKNITWEAR`}
                description={`Buy ${product.name} - ${product.category}. Premium quality knitwear available now.`}
            />
            <div className="container mx-auto px-4 py-8 md:py-16">

                {/* Breadcrumbs (Simple) */}
                <div className="text-sm text-gray-400 mb-8 flex gap-2 items-center">
                    <span>Home</span> / <span>Shop</span> / <span className="text-gray-900 font-medium">{product.name}</span>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[100px_1fr_400px] gap-8 lg:gap-16 items-start">

                    {/* LEFT: Vertical Gallery (Desktop) / Horizontal (Mobile) */}
                    <div className="order-2 lg:order-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full">
                        {galleryImages.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(img)}
                                className={`flex-shrink-0 w-20 h-24 lg:w-full lg:h-32 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-brand-black' : 'border-transparent hover:border-gray-200'}`}
                            >
                                <img src={img} alt={`View ${i}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* CENTER: Main Image */}
                    <div className="order-1 lg:order-2 w-full relative group">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={activeImage}
                            className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative"
                        >
                            <img
                                src={activeImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Zoom hint or badge could go here */}
                        </motion.div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="order-3 lg:order-3 flex flex-col space-y-8 sticky top-32">
                        <div>
                            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3 block">{product.category}</span>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

                            <div className="flex items-center justify-between mb-6">
                                <span className="text-3xl font-medium text-gray-900">{product.price}</span>
                                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsReviewOpen(true)}>
                                    <div className="flex text-brand-gold">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-current' : ''}`} />)}
                                    </div>
                                    <span className="text-xs font-bold text-gray-500 underline decoration-gray-300 underline-offset-4">{reviews.length} Reviews</span>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed font-light">
                                This premium knitwear piece combines timeless elegance with modern comfort. Crafted from the finest materials to ensure warmth and style for any occasion.
                            </p>
                        </div>

                        {/* Variants */}
                        <div className="space-y-6 pt-6 border-t border-gray-100">
                            <div>
                                <span className="text-sm font-bold text-gray-900 block mb-3">Color</span>
                                <div className="flex gap-2">
                                    {['bg-stone-800', 'bg-blue-900', 'bg-red-900'].map((color, idx) => (
                                        <button key={idx} className={`w-8 h-8 rounded-full ${color} border-2 border-white ring-1 ring-gray-200 hover:scale-110 transition-transform`} />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-3">
                                    <span className="text-sm font-bold text-gray-900">Select Size</span>
                                    <button
                                        onClick={() => setIsSizeChartOpen(true)}
                                        className="flex items-center gap-1 text-xs text-gray-500 underline hover:text-black transition-colors"
                                    >
                                        <Ruler className="w-3 h-3" /> Size Chart
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center text-sm font-bold border rounded-lg transition-all ${selectedSize === size
                                                ? 'border-brand-black bg-brand-black text-white'
                                                : 'border-gray-200 text-gray-600 hover:border-black'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    dispatch(addToCart(product));
                                    toast.success(`Added ${product.name} to Cart`);
                                }}
                                className="flex-1 bg-brand-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-black/10"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(toggleWishlist(product));
                                    toast.success(isWishlist ? "Removed from Wishlist" : "Added to Wishlist");
                                }}
                                className={`w-14 h-14 flex items-center justify-center border-2 rounded-xl transition-all ${isWishlist
                                    ? 'border-red-500 bg-red-50 text-red-500'
                                    : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                            >
                                <Heart className={`w-6 h-6 ${isWishlist ? 'fill-current' : ''}`} />
                            </button>
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
                                    <td className="px-6 py-4 text-gray-600">42</td>
                                    <td className="px-6 py-4 text-gray-600">29</td>
                                    <td className="px-6 py-4 text-gray-600">18.5</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">X-Large (XL)</td>
                                    <td className="px-6 py-4 text-gray-600">44</td>
                                    <td className="px-6 py-4 text-gray-600">30</td>
                                    <td className="px-6 py-4 text-gray-600">19.5</td>
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
