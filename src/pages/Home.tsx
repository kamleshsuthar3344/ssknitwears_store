import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, Lock, Star, Award, Heart, CheckCircle2, Quote, Users } from 'lucide-react';
import HeroSlider from '../components/home/HeroSlider';
import FeaturedProducts from '../components/home/FeaturedProducts';

// Enhanced Category Data with Gradients
const categories = [
    {
        id: 1,
        title: 'MEN',
        path: '/shop/men',
        image: '/images/categories/men.png',
        description: 'Refined classics for the modern man.'
    },
    {
        id: 2,
        title: 'WOMEN',
        path: '/shop/women',
        image: '/images/categories/women.png',
        description: 'Elegance woven into every stitch.'
    },
    {
        id: 3,
        title: 'KIDS',
        path: '/shop/kids',
        image: '/images/categories/kids.png',
        description: 'Playful comfort for little adventurers.'
    },
];

export default function Home() {
    return (
        <Layout>
            {/* Hero Section with Parallax & Glassmorphism */}
            <HeroSlider />

            {/* Floating Categories Section */}
            {/* Simple Clean Categories Section */}
            {/* Floating Categories Section */}
            {/* Kona Style: Clean grid, minimal text top-left, landscape images */}
            {/* Floating Categories Section */}
            {/* Kona Style: Clean grid, minimal text top-left, landscape images */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-12">

                    {/* Restored Section Heading as requested ("add heading for card") */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black uppercase tracking-widest">Shop by Category</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((cat) => (
                            <Link to={cat.path} key={cat.id} className="group relative block w-full overflow-hidden">
                                {/* Image Container with Aspect Ratio */}
                                <div className="aspect-[3/2] w-full overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    />
                                    {/* Subtle Flash Overlay on Hover */}
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500" />
                                </div>

                                {/* Content - Top Left (Kona Style) 
                                    - Small Text Size (text-lg) to avoid overlap 
                                    - Removed "View Collection" subtitle
                                */}
                                <div className="absolute top-6 left-6 z-10">
                                    <h3 className="text-lg font-serif font-bold text-black tracking-widest">
                                        {cat.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Summer & Winter "Floating Art" Section */}
            <section className="relative py-32 bg-white overflow-hidden">
                {/* Faint Background Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[12rem] md:text-[20rem] font-bold text-gray-50 opacity-[0.4] tracking-tighter whitespace-nowrap">
                        SEASONS
                    </span>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">

                        {/* Left Image (Summer) - Tilted Left & Floating */}
                        <motion.div
                            className="w-full md:w-1/3 flex justify-center md:justify-end"
                            initial={{ opacity: 0, x: -50, rotate: -10 }}
                            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-[3/4] w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl bg-white p-2 transform transition-transform hover:rotate-0 hover:scale-105 duration-500">
                                <img src="/images/categories/women.png" alt="Summer Collection" className="w-full h-full object-cover rounded-xl" />
                                <div className="absolute bottom-6 left-0 right-0 text-center">
                                    <span className="bg-white/90 backdrop-blur-sm px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">Summer</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Center Content */}
                        <div className="w-full md:w-1/3 text-center order-first md:order-none">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-serif font-medium text-gray-900 mb-6"
                            >
                                Summer & Winter
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-500 mb-10 leading-relaxed max-w-sm mx-auto"
                            >
                                Meticulously crafted pieces that blend traditional quality with modern seasonal design. Use code <span className="text-black font-bold">NEW2026</span> for exclusive access.
                            </motion.p>

                            {/* Central "Card" */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] inline-block border border-gray-100 relative"
                            >
                                <h3 className="text-xl font-serif font-bold mb-2 text-gray-900">New Arrivals</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Premium 100% Cotton</p>
                                <Link to="/shop" className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg">
                                    Discover
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Image (Winter) - Tilted Right & Floating */}
                        <motion.div
                            className="w-full md:w-1/3 flex justify-center md:justify-start"
                            initial={{ opacity: 0, x: 50, rotate: 10 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-[3/4] w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl bg-white p-2 transform transition-transform hover:rotate-0 hover:scale-105 duration-500">
                                <img src="/images/categories/men.png" alt="Winter Collection" className="w-full h-full object-cover rounded-xl" />
                                <div className="absolute bottom-6 left-0 right-0 text-center">
                                    <span className="bg-white/90 backdrop-blur-sm px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">Winter</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <FeaturedProducts />

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-violet-600 font-bold uppercase tracking-widest text-sm"
                        >
                            Difference that matters
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-serif font-black text-gray-900 mt-2"
                        >
                            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500">SS Knitwears</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Award,
                                title: "Premium Quality",
                                desc: "We use 100% fine cotton and pure wool for unmatched comfort.",
                                color: "bg-blue-50 text-blue-600",
                                border: "border-blue-100"
                            },
                            {
                                icon: Heart,
                                title: "Ethically Made",
                                desc: "Traditional craftsmanship blended with fair trade practices.",
                                color: "bg-rose-50 text-rose-600",
                                border: "border-rose-100"
                            },
                            {
                                icon: CheckCircle2,
                                title: "Perfect Fit",
                                desc: "Precision tailoring ensuring the perfect modern fit for every size.",
                                color: "bg-emerald-50 text-emerald-600",
                                border: "border-emerald-100"
                            },
                            {
                                icon: Users,
                                title: "25+ Years Legacy",
                                desc: "Trusted by generations for quality and durability in knitwear.",
                                color: "bg-violet-50 text-violet-600",
                                border: "border-violet-100"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-8 rounded-[2.5rem] border ${item.border} hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 bg-white group`}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Our Clients Say (Testimonials) */}
            <section className="py-24 bg-gray-50 rounded-[4rem] mx-4 mb-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-pink-500 font-bold uppercase tracking-widest text-sm"
                            >
                                Testimonials
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-serif font-black text-gray-900 mt-2"
                            >
                                What our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">clients say</span> about us
                            </motion.h2>
                        </div>
                        <div className="flex gap-2">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                            <span className="ml-2 font-bold text-gray-900">4.9/5 Rating</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Rahul Sharma",
                                role: "Regular Customer",
                                content: "The quality of the Brats pullovers is exceptional. I've been wearing them for 3 seasons and they still look brand new.",
                                image: "RS",
                                color: "from-blue-400 to-indigo-500"
                            },
                            {
                                name: "Ananya Iyer",
                                role: "Fashion Blogger",
                                content: "Dik Dik's winter collection for women is absolutely stunning. The designs are modern and the wool is so soft!",
                                image: "AI",
                                color: "from-rose-400 to-pink-500"
                            },
                            {
                                name: "Vikram Singh",
                                role: "Verified Buyer",
                                content: "Fast delivery and great customer service. The kids' knitwear is durable and my son loves the bright colors.",
                                image: "VS",
                                color: "from-orange-400 to-amber-500"
                            }
                        ].map((rev, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[3rem] shadow-sm relative group hover:shadow-xl transition-all duration-500"
                            >
                                <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-50 opacity-10 group-hover:scale-125 transition-transform duration-700" />

                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rev.color} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
                                        {rev.image}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 leading-none mb-1">{rev.name}</h4>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{rev.role}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed italic mb-6">
                                    "{rev.content}"
                                </p>

                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* End of Summer Promo Section */}
            <section className="py-24 bg-[#F9F9F7]">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                            End of Summer!
                            <br />
                            <span className="text-3xl md:text-4xl mt-2 block">Up to 40% off on all items.</span>
                        </h2>
                        <p className="text-gray-500 mb-10 text-lg">
                            Last chance to take advantage of our discounts!
                        </p>

                        <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto shadow-lg rounded-full overflow-hidden">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-white px-8 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                            />
                            <button
                                type="button"
                                className="px-10 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-colors"
                            >
                                Sign Up
                            </button>
                        </form>
                        <p className="text-xs text-gray-400 mt-4">
                            Sign up to our Newsletter and get the discount code!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features / Services Section */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {/* Free Shipping */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <Truck className="w-10 h-10 text-gray-900 mb-6 stroke-1" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Free International Shipping</h3>
                            <p className="text-gray-500 text-sm">On all orders over $100.00</p>
                        </motion.div>

                        {/* Returns */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <RotateCcw className="w-10 h-10 text-gray-900 mb-6 stroke-1" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">45 Days Return</h3>
                            <p className="text-gray-500 text-sm">Money back guarantee</p>
                        </motion.div>

                        {/* Secure Checkout */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center"
                        >
                            <Lock className="w-10 h-10 text-gray-900 mb-6 stroke-1" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Checkout</h3>
                            <p className="text-gray-500 text-sm">100% secured checkout process</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
