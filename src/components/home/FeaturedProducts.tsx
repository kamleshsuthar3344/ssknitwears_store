import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function FeaturedProducts() {


    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        api.get('/products').then(res => {
            const mappedProducts = res.data.map((p: any) => ({
                id: p.id,
                name: p.name,
                price: `₹${parseFloat(p.sale_price || p.price).toFixed(2)}`,
                originalPrice: p.sale_price ? `₹${parseFloat(p.price).toFixed(2)}` : null,
                image: p.product_images?.length > 0
                    ? p.product_images.find((img: any) => img.is_main)?.image_path || p.product_images[0].image_path
                    : (p.images || '/images/placeholder.jpg'),
                tag: (p.sale_price && p.price) ? `-${Math.round(((p.price - p.sale_price) / p.price) * 100)}%` : '',
                season: p.season,
                category: p.category
            }));
            setProducts(mappedProducts);
        }).catch(err => console.error(err));
    }, []);

    if (products.length === 0) {
        return <div className="py-20 text-center">Loading Featured Products...</div>;
    }

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-black uppercase tracking-widest mb-4">Featured Products</h2>
                    <div className="w-16 h-1 bg-black mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.slice(0, 8).map((product, index) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {product.tag && (
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                                                {product.tag}
                                            </span>
                                        </div>
                                    )}
                                    {/* Quick Actions Hover */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                            View Details
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                                            {product.season}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-black line-clamp-2 leading-tight">
                                        {product.name}
                                    </h3>
                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-gray-900">{product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through font-bold">{product.originalPrice}</span>
                                            )}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                            <ChevronDown className="w-5 h-5 -rotate-90" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
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
