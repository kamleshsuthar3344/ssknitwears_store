import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import SEO from '../components/common/SEO';

export default function About() {
    return (
        <Layout>
            <SEO title="About Us | SS Knitwear" description="Learn about SS Knitwear - our heritage, quality craftsmanship, and commitment to sustainable fashion." />
            <div className="bg-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 bg-brand-black overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight"
                        >
                            ABOUT US
                        </motion.h1>
                        <div className="w-20 h-1 bg-brand-gold mx-auto mt-6 rounded-full" />
                    </div>
                </section>

                <div className="container mx-auto px-6 py-20 space-y-32">
                    {/* Who We Are Section */}
                    <section className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100 flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-2/3 space-y-8">
                            <div className="space-y-4">
                                <span className="text-brand-gold uppercase tracking-widest font-bold text-sm block">Overview</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 border-b-2 border-brand-gold pb-4 inline-block">Who We Are</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg text-justify">
                                <strong className="text-gray-900">SS Knitwear</strong> was established in <strong className="text-gray-900">2014</strong> with a clear focus on producing dependable, high-quality knitwear for evolving apparel markets. What began as a focused manufacturing setup has steadily grown into a skilled team of <strong className="text-gray-900">11–50 professionals</strong>, working together across design, production, and quality control. Over the years, we have built our reputation on consistency, ethical practices, and long-term business relationships. <strong className="text-gray-900">Sustainability</strong> is an integral part of our operations, reflected in our responsible sourcing, efficient production processes, and efforts to minimize waste. Our commitment to quality and compliance is supported by recognized industry standards, including Wool Blend Certification and <strong className="text-gray-900">ZED Bronze Certification</strong> (Zero Defect, Zero Effect), reinforcing our dedication to both product excellence and environmentally responsible manufacturing.
                            </p>
                        </div>
                        <div className="lg:w-1/3">
                            <img
                                src="/images/categories/women.png"
                                alt="Our Legacy"
                                className="w-full aspect-[3/4] object-cover rounded-[2.5rem] shadow-lg hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </section>

                    {/* What We Do Section */}
                    <section className="bg-brand-cream rounded-[3rem] p-10 md:p-16 border border-gray-200 flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/3 order-2 lg:order-1">
                            <img
                                src="/images/categories/men.png"
                                alt="Our Process"
                                className="w-full aspect-[3/4] object-cover rounded-[2.5rem] shadow-lg hover:rotate-2 transition-transform duration-500"
                            />
                        </div>
                        <div className="lg:w-2/3 order-1 lg:order-2 space-y-8">
                            <div className="space-y-4">
                                <span className="text-brand-gold uppercase tracking-widest font-bold text-sm block">Our Craft</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 border-b-2 border-brand-gold pb-4 inline-block">What we do</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg text-justify">
                                At <strong className="text-gray-900">SS Knitwear</strong>, we design, develop, and deliver high-quality knitwear that blends functionality with contemporary style. From season-ready basics to tailored knitted pieces, we cater to a wide range of needs. Our process begins with thoughtful fabric creation — prioritizing <strong className="text-gray-900">comfort</strong>, <strong className="text-gray-900">durability</strong>, and <strong className="text-gray-900">sustainability</strong> — and continues through meticulous pattern development, precision knitting, and rigorous quality checks. By combining skilled craftsmanship with efficient manufacturing practices, we ensure timely delivery without compromising on finish or performance. Whether it’s everyday essentials or trend-inspired collections, we bring consistency, reliability, and value to every garment we create.
                            </p>
                        </div>
                    </section>

                    {/* BRATS Section */}
                    <section className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100 flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-2/3 space-y-8">
                            <div className="space-y-4">
                                <span className="text-brand-gold uppercase tracking-widest font-bold text-sm block">Brand Story</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">BRATS</h2>
                            </div>
                            <div className="space-y-6 text-gray-700 leading-relaxed text-lg text-justify">
                                <p className="italic font-medium text-gray-900 text-xl border-l-4 border-brand-black pl-6">
                                    "Brats was created with a simple belief: clothing should do more than look good — it should express who you are. Built on the foundation of quality knitwear and thoughtful design, Brats brings together comfort, style, and individuality to form a bold identity."
                                </p>
                                <p>
                                    We design for the modern man who values confidence and freedom in what he wears. His style is effortless, his choices intentional, and his wardrobe a reflection of his mindset. Brats speaks to that attitude — clean silhouettes, reliable fabrics, and fits that feel right from day to night. Backed by responsible manufacturing and consistent quality, every piece is designed to last beyond trends.
                                </p>
                                <p className="font-bold text-gray-900">
                                    For those who choose authenticity over conformity. For those who move forward on their own terms.
                                </p>
                                <p className="uppercase tracking-wide text-sm font-bold border-t border-gray-200 pt-6">
                                    Our mission is to create men’s knitwear that doesn’t just get worn, but becomes part of a confident, everyday lifestyle.
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/3">
                            <img
                                src="/images/categories/men new.png"
                                alt="Brats Style"
                                className="w-full aspect-[3/4] object-cover rounded-[2.5rem] shadow-lg grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </section>

                    {/* DIK DIK Section */}
                    <section className="bg-brand-cream rounded-[3rem] p-10 md:p-16 border border-gray-200 flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/3 order-2 lg:order-1">
                            <img
                                src="/images/categories/kids.png"
                                alt="Dik Dik Comfort"
                                className="w-full aspect-[3/4] object-cover rounded-[2.5rem] shadow-lg hover:-rotate-2 transition-transform duration-500"
                            />
                        </div>
                        <div className="lg:w-2/3 order-1 lg:order-2 space-y-8">
                            <div className="space-y-4">
                                <span className="text-brand-gold uppercase tracking-widest font-bold text-sm block">Brand Story</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">DIK DIK</h2>
                            </div>
                            <div className="space-y-6 text-gray-700 leading-relaxed text-lg text-justify">
                                <p className="italic font-medium text-gray-900 text-xl border-r-4 border-brand-gold pr-6 text-right">
                                    "Inspired by the graceful Dik Dik antelope of Africa, DIK DIK is a celebration of quiet strength and effortless elegance. Though delicate in appearance, the Dik Dik is resilient and confident — a reflection of the modern woman who carries poise, independence, and inner power with ease."
                                </p>
                                <p>
                                    We design knitwear that balances softness with durability and style with comfort. Each piece is thoughtfully crafted to move with a woman through her day, adapting seamlessly from casual moments to refined occasions. Our designs focus on clean silhouettes, versatile fits, and fabrics that feel gentle on the skin while standing the test of time.
                                </p>
                                <p className="font-bold text-gray-900 uppercase tracking-wide text-sm border-b border-white/50 pb-6">
                                    Our vision is to empower women through knitwear that feels as good as it looks — pieces that inspire confidence, freedom, and individuality, every day.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Quote Area - Designed like Track Hero */}
                <div className="py-12 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="container mx-auto rounded-[3rem] overflow-hidden relative min-h-[300px] flex items-center justify-center bg-gradient-to-br from-brand-black to-gray-900 shadow-2xl"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl opacity-60" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl" />

                        <div className="relative z-10 w-full px-8 md:px-16 py-12 flex flex-col items-center text-center">
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-3xl md:text-5xl font-serif italic text-white mb-6 leading-tight"
                            >
                                "Join our community of winterwear enthusiasts"
                            </motion.h2>
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-brand-gold uppercase tracking-[0.5em] text-xs font-bold"
                            >
                                SS Knitwear • EST 2014
                            </motion.span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
