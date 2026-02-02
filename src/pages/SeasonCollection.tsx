
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, Sparkles, User, Users, Baby, Snowflake } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { productData } from '../data/productData';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function SeasonCollection() {
    const { season } = useParams<{ season: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const sortBy = 'Featured';

    const normalizedSeason = season === 'all' ? 'New Arrivals' : (season ? season.charAt(0).toUpperCase() + season.slice(1).toLowerCase() : 'Summer');

    // 1. Filter by Season first
    const filteredBySeason = season === 'all'
        ? productData
        : productData.filter(p => p.season.toLowerCase() === season?.toLowerCase());

    // 2. Filter by Category (Men, Women, Kids)
    const filteredProducts = filteredBySeason.filter(p =>
        selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    const getHeroStyles = () => {
        return {
            gradient: 'from-brand-black to-gray-900',
            accent: 'text-brand-gold',
            pill: 'bg-brand-gold/20 text-brand-gold',
            activeButton: 'bg-brand-gold text-black'
        };
    };

    const styles = getHeroStyles();

    const getTitle = () => {
        return season === 'all' ? 'New Arrivals' : `${normalizedSeason} Collection`;
    };

    const getDescription = () => {
        if (season === 'all') {
            return "Explore our complete range of premium knitwear for all seasons. Quality, comfort, and style combined.";
        }
        if (normalizedSeason === 'Winter') {
            return "Embrace the chill with our premium warm knitwear. Cozy, stylish, and perfect for the season.";
        }
        return "Stay cool and chic with our exclusive summer lightweight collection.";
    };

    const categories = [
        { name: 'All', icon: Sparkles },
        { name: 'Men', icon: User },
        { name: 'Women', icon: Users },
        { name: 'Kids', icon: Baby },
    ];

    return (
        <Layout>
            <SEO
                title={`${normalizedSeason} Collection | SSKNITWEAR`}
                description={`Browse our exclusive ${normalizedSeason} collection. ${getDescription()}`}
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
                            Limited Edition
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

                        {/* Category Filter Pills (Men, Women, Kids) - OR Season Select for All */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            {season === 'all' ? (
                                <>
                                    <Link
                                        to="/season/summer"
                                        className="flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold bg-white text-black hover:bg-brand-gold hover:text-black transition-all duration-300 shadow-xl hover:scale-105"
                                    >
                                        <Sparkles className="w-6 h-6" />
                                        Shop Summer
                                    </Link>
                                    <Link
                                        to="/season/winter"
                                        className="flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold bg-black text-white hover:bg-gray-800 transition-all duration-300 shadow-xl border border-gray-700 hover:scale-105"
                                    >
                                        <Snowflake className="w-6 h-6" />
                                        Shop Winter
                                    </Link>
                                </>

                            ) : (
                                <div className="flex flex-wrap justify-center gap-4 bg-black/10 backdrop-blur-md p-2 rounded-[2rem] border border-white/20">
                                    {categories.map((cat) => {
                                        const Icon = cat.icon;
                                        const isActive = selectedCategory === cat.name;

                                        if (cat.name === 'All') {
                                            return (
                                                <button
                                                    key={cat.name}
                                                    onClick={() => setSelectedCategory(cat.name)}
                                                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                                                        ? `${styles.activeButton} shadow-lg scale-105`
                                                        : 'text-white hover:bg-white/10'
                                                        }`}
                                                >
                                                    <Icon className={`w-4 h-4 ${isActive ? 'text-inherit' : 'text-white/70'}`} />
                                                    {cat.name}
                                                </button>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={cat.name}
                                                to={`/shop/${cat.name.toLowerCase()}?season=${normalizedSeason}`}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 text-white hover:bg-white/10`}
                                            >
                                                <Icon className="w-4 h-4 text-white/70" />
                                                {cat.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
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
                            <p className="text-xs text-gray-400">Showing {selectedCategory === 'All' ? 'All Categories' : selectedCategory}</p>
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
                            key={selectedCategory}
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
                            <p className="text-gray-500 max-w-sm">We don't have any items in the {selectedCategory} category for {normalizedSeason} yet.</p>
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className="mt-6 px-8 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                Show All Categories
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
}
