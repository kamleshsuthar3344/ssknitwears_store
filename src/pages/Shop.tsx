import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, Sparkles, Sun, Snowflake } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { productData } from '../data/productData';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function Shop() {
    const { category } = useParams<{ category: string }>();
    const [selectedSeason, setSelectedSeason] = useState<string>('All');
    const sortBy = 'Featured';

    const normalizedCategory = category?.toLowerCase();

    const filteredByCategory = productData.filter(p =>
        p.category.toLowerCase() === normalizedCategory
    );

    const filteredProducts = filteredByCategory.filter(p =>
        selectedSeason === 'All' || p.season === selectedSeason
    );

    const getHeroStyles = () => {
        switch (normalizedCategory) {
            case 'men':
                return {
                    gradient: 'from-brand-black to-gray-900',
                    accent: 'text-brand-gold',
                    pill: 'bg-brand-gold/20 text-brand-gold',
                    activeButton: 'bg-brand-gold text-black'
                };
            case 'women':
                return {
                    gradient: 'from-brand-black to-gray-900',
                    accent: 'text-brand-gold',
                    pill: 'bg-brand-gold/20 text-brand-gold',
                    activeButton: 'bg-brand-gold text-black'
                };
            case 'kids':
                return {
                    gradient: 'from-brand-black to-gray-900',
                    accent: 'text-brand-gold',
                    pill: 'bg-brand-gold/20 text-brand-gold',
                    activeButton: 'bg-brand-gold text-black'
                };
            default:
                return {
                    gradient: 'from-brand-black to-gray-900',
                    accent: 'text-brand-gold',
                    pill: 'bg-brand-gold/20 text-brand-gold',
                    activeButton: 'bg-brand-gold text-black'
                };
        }
    };

    const styles = getHeroStyles();

    const getTitle = () => {
        switch (normalizedCategory) {
            case 'men': return "Men's Style";
            case 'women': return "Women's Grace";
            case 'kids': return "Kids' Joy";
            default: return "Shop Collection";
        }
    };

    const getDescription = () => {
        switch (normalizedCategory) {
            case 'men': return "Premium knitwear for the modern man. Comfort meets sophistication.";
            case 'women': return "Elegant designs crafted with love. Your perfect seasonal companions.";
            case 'kids': return "Colorful and cozy outfits for little adventures and big smiles.";
            default: return "Explore our comprehensive range of premium knitwear.";
        }
    };

    const seasons = [
        { name: 'All', icon: Sparkles },
        { name: 'Summer', icon: Sun },
        { name: 'Winter', icon: Snowflake },
    ];

    return (
        <Layout>
            <SEO
                title={`${category?.toUpperCase() || 'Shop'} | SSKNITWEAR`}
                description={`Shop our premium ${normalizedCategory} collection. ${getDescription()}`}
            />
            {/* Hero Section */}
            <div className="pt-24 pb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`container mx-auto rounded-[3rem] overflow-hidden relative min-h-[400px] flex items-center bg-gradient-to-br ${styles.gradient} shadow-2xl`}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl" />

                    <div className="relative z-10 w-full px-8 md:px-16 py-12 flex flex-col items-center text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${styles.pill} mb-6`}
                        >
                            {normalizedCategory} collection
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-7xl font-serif font-black text-white mb-6"
                        >
                            {getTitle()}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className={`text-lg md:text-xl ${styles.accent} max-w-2xl mb-12 font-medium`}
                        >
                            {getDescription()}
                        </motion.p>

                        {/* Seasonal Filter Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-4 bg-black/10 backdrop-blur-md p-2 rounded-[2rem] border border-white/20"
                        >
                            {seasons.map((season) => {
                                const Icon = season.icon;
                                const isActive = selectedSeason === season.name;
                                return (
                                    <button
                                        key={season.name}
                                        onClick={() => setSelectedSeason(season.name)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                                            ? `${styles.activeButton} shadow-lg scale-105`
                                            : 'text-white hover:bg-white/10'
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-inherit' : 'text-white/70'}`} />
                                        {season.name}
                                    </button>
                                );
                            })}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Sort & Stats Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-2xl">
                            <Filter className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{filteredProducts.length} Items Found</p>
                            <p className="text-xs text-gray-400">Showing {selectedSeason} Collection</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-500">Sort:</span>
                        <div className="relative group">
                            <button className="flex items-center gap-3 px-6 py-2.5 rounded-full text-sm font-bold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                                {sortBy} <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <AnimatePresence mode="wait">
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            key={selectedSeason}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {filteredProducts.map((product, index) => (
                                <Link to={`/product/${product.id}`} key={product.id} className="group">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
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
                                                <span className={`text-[10px] font-black uppercase tracking-widest text-brand-gold`}>
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
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="min-h-[40vh] flex flex-col items-center justify-center text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200"
                        >
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <Filter className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">No Products Found</h3>
                            <p className="text-gray-500 max-w-sm">We don't have any items in the {selectedSeason} collection for this category yet.</p>
                            <button
                                onClick={() => setSelectedSeason('All')}
                                className="mt-6 px-8 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                Show All Products
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
}
