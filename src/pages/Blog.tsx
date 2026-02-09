import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

// Mock blog data
const blogPosts = [
    {
        id: 1,
        title: "The Art of Knitwear: Crafting Quality Since 1985",
        excerpt: "Discover the intricate process behind our premium knitwear and the dedication that goes into every piece.",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
        category: "Craftsmanship",
        author: "SS Knitwear Team",
        date: "Feb 5, 2026",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Winter Fashion Trends 2026: Stay Warm, Stay Stylish",
        excerpt: "Explore the latest winter fashion trends and how to incorporate them into your wardrobe this season.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        category: "Fashion",
        author: "Style Editor",
        date: "Jan 28, 2026",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "Sustainable Fashion: Our Commitment to the Environment",
        excerpt: "Learn about our eco-friendly practices and how we're making a difference in the fashion industry.",
        image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80",
        category: "Sustainability",
        author: "SS Knitwear Team",
        date: "Jan 20, 2026",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Care Guide: Making Your Knitwear Last Forever",
        excerpt: "Expert tips on how to properly care for your knitwear to ensure it stays beautiful for years to come.",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
        category: "Care Tips",
        author: "Care Specialist",
        date: "Jan 15, 2026",
        readTime: "3 min read"
    },
    {
        id: 5,
        title: "Behind the Scenes: A Day at SS Knitwear Factory",
        excerpt: "Take a virtual tour of our manufacturing facility and meet the artisans who bring our designs to life.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        category: "Behind the Scenes",
        author: "SS Knitwear Team",
        date: "Jan 10, 2026",
        readTime: "7 min read"
    },
    {
        id: 6,
        title: "Summer Collection Preview: Light & Breezy Styles",
        excerpt: "Get an exclusive first look at our upcoming summer collection featuring breathable, stylish knitwear.",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
        category: "Collections",
        author: "Design Team",
        date: "Jan 5, 2026",
        readTime: "4 min read"
    }
];

const categories = ["All", "Fashion", "Craftsmanship", "Sustainability", "Care Tips", "Behind the Scenes", "Collections"];

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <Layout>
            <SEO
                title="Blog | SS Knitwear - Fashion, Tips & Stories"
                description="Explore our blog for fashion trends, care tips, sustainability stories, and behind-the-scenes insights from SS Knitwear."
            />

            {/* Hero Section */}
            <div className="pt-24 pb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto rounded-[3rem] overflow-hidden relative min-h-[400px] flex items-center bg-gradient-to-br from-brand-black to-gray-900 shadow-2xl"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl" />

                    <div className="relative z-10 w-full px-8 md:px-16 py-12 flex flex-col items-center text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-gold/20 text-brand-gold mb-6"
                        >
                            Our Stories
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-7xl font-serif font-black text-white mb-6"
                        >
                            SS Knitwear Blog
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg md:text-xl text-brand-gold max-w-2xl font-medium"
                        >
                            Fashion insights, care tips, and stories from our journey
                        </motion.p>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Search & Filter */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === category
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-gold transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs text-gray-600 font-medium">{post.author}</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-sm font-bold text-black group-hover:gap-3 transition-all">
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
