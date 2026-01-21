import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { productData } from '../data/productData';
import { Heart, Share2, Star, PlayCircle, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

export default function ProductDetails() {
    const { id } = useParams();
    const product = productData.find(p => p.id === Number(id)) || productData[0];
    const [selectedSize, setSelectedSize] = useState('M');
    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const [activeImage, setActiveImage] = useState(product.image);
    const dispatch = useAppDispatch();

    const sizes = ['S', 'M', 'L', 'XL'];

    // Scroll listener for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setShowStickyHeader(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Layout>
            {/* Sticky Header Bar */}
            <AnimatePresence>
                {showStickyHeader && (
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-[50] border-b border-gray-100 shadow-sm hidden md:block"
                    >
                        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-tight">{product.name}</h3>
                                    <span className="text-gray-500 text-sm">{product.price}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 py-8 md:py-20">
                {/* 3-Column Layout: Info | Image | Gallery */}
                <div className="flex flex-col lg:grid lg:grid-cols-[25%_45%_30%] gap-8 lg:gap-16 items-start">

                    {/* Column 1: Info (Left on Desktop, Order 2 on Mobile) */}
                    <div className="order-2 lg:order-1 flex flex-col space-y-8 sticky top-32">
                        <div>
                            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3 block">{product.category}</span>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-2xl font-medium text-gray-900">{product.price}</span>
                                <div className="flex items-center gap-1 text-black">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <span className="text-xs font-bold ml-2 underline decoration-gray-300 underline-offset-4">12 Reviews</span>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed font-light">
                                This premium knitwear piece combines timeless elegance with modern comfort. Crafted from the finest materials to ensure warmth and style for any occasion.
                            </p>
                        </div>

                        <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity w-fit group">
                            <PlayCircle className="w-10 h-10 stroke-1 group-hover:scale-110 transition-transform" />
                            Watch Video
                        </button>
                    </div>

                    {/* Column 2: Main Image (Center on Desktop, Order 1 on Mobile) */}
                    <div className="order-1 lg:order-2 w-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="aspect-[3/4] lg:aspect-[4/5] bg-gray-100 overflow-hidden relative"
                        >
                            <img
                                src={activeImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Column 3: Actions & Gallery (Right on Desktop, Order 3 on Mobile) */}
                    <div className="order-3 lg:order-3 flex flex-col space-y-10 sticky top-32">
                        {/* Actions */}
                        <div className="space-y-6 bg-gray-50 p-8 rounded-2xl lg:bg-transparent lg:p-0">
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
                                    <span className="text-sm font-bold text-gray-900">Size</span>
                                    <button className="text-xs text-gray-500 underline">Size Chart</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-10 flex items-center justify-center text-sm font-bold border transition-all ${selectedSize === size
                                                ? 'border-black bg-black text-white'
                                                : 'border-gray-200 text-gray-600 hover:border-black'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-3"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Add to Cart
                            </button>

                            <div className="flex justify-center gap-6 text-gray-500">
                                <button
                                    onClick={() => dispatch(toggleWishlist(product))}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-black"
                                >
                                    <Heart className="w-4 h-4" /> Wishlist
                                </button>
                                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-black">
                                    <Share2 className="w-4 h-4" /> Share
                                </button>
                            </div>
                        </div>

                        {/* Gallery Grid (Vertical on Desktop) */}
                        <div className="grid grid-cols-4 lg:grid-cols-2 gap-3">
                            {[product.image, product.image, product.image, product.image].map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(img)}
                                    className={`aspect-square bg-gray-100 overflow-hidden hover:opacity-80 transition-opacity ${activeImage === img ? 'opacity-50' : ''}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
