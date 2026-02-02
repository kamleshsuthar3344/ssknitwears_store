import Layout from '../components/layout/Layout';
import { categoryData } from '../data/productData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Category() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 md:py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                        Discover Categories
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Explore our curated collections for every season and style.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {categoryData.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/shop/${category.title.toLowerCase()}`} className="group block h-full">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-lg mb-6 transform transition-transform duration-500 group-hover:scale-[1.02]">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-3xl font-serif font-black text-white">{category.title}</h2>
                                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
