import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productData } from '../../data/productData';

export default function FeaturedProducts() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-black uppercase tracking-widest mb-4">Featured Products</h2>
                    <div className="w-16 h-1 bg-black mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productData.slice(0, 4).map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {product.tag && (
                                    <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                        {product.tag}
                                    </span>
                                )}

                                {/* Action Overlay (Kona Style) */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm">
                                    <button className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>

                                <button className="absolute top-4 right-4 p-2.5 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500 shadow-sm">
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="pt-6 text-center">
                                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2">{product.category}</p>
                                <h3 className="text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-sm font-bold text-black">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-xs text-gray-400 line-through font-light">{product.originalPrice}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/shop"
                        className="inline-block border-b-2 border-black pb-1 text-xs font-bold uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition-all"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
