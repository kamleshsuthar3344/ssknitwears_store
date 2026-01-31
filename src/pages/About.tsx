import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import SEO from '../components/common/SEO';

export default function About() {
    return (
        <Layout>
            <SEO title="About Us | SSKNITWEAR" description="Learn about SSKNITWEAR - our heritage, quality craftsmanship, and commitment to sustainable fashion." />
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

                <div className="container mx-auto px-6 py-20 max-w-4xl space-y-24">
                    {/* Introduction Section */}
                    <section className="space-y-8 text-center md:text-left">
                        <div className="space-y-6">
                            <p className="text-gray-600 leading-relaxed text-lg">
                                With a rich portfolio of brands including <strong className="text-gray-900 text-xl">Brats</strong>, <strong className="text-gray-900 text-xl">Dik Dik</strong> we’re dedicated to keeping you cozy and stylish during colder months while minimizing waste generation. We understand the unique needs of <strong className="text-gray-900">men, women and kids</strong> and that’s why we offer a diverse range of <strong className="text-gray-900">winterwear products</strong> that cater to everyone.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Explore our collection from <strong className="text-gray-900">snug sweater, pullovers to blankets</strong>, and experience warmth without compromising on style. Join our community of winterwear enthusiasts and let <strong className="text-gray-900 text-xl">SSKNITWEAR</strong> be your go-to source for <strong className="text-gray-900">fashionable comfort with conscience</strong>.
                            </p>
                        </div>
                    </section>

                    {/* BRATS Section */}
                    <section className="bg-gray-50 rounded-[3rem] p-10 md:p-16 space-y-8 border border-gray-100">
                        <div className="space-y-4">
                            <span className="text-brand-gold uppercase tracking-widest font-bold text-sm block">Brand Story</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">BRATS</h2>
                        </div>
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-lg">
                                Brats was not created just to be another clothing brand—it was born out of an idea where style, comfort, and attitude come together to create a distinct identity.
                            </p>
                            <p>
                                We believe today’s man doesn’t just wear fashion, he <strong className="text-gray-900">wears his personality</strong>. His clothes reflect his <strong className="text-gray-900">confidence, his freedom, and his spirit</strong>. That’s exactly what Brats stands for.
                            </p>
                            <p>
                                Every knitwear piece from Brats is designed to meet the needs of the modern man—<strong className="text-gray-900">comfortable, durable, and effortlessly stylish</strong>. Whether it’s a sharp look for work or a laid-back vibe for the weekend, Brats <strong className="text-gray-900">fits every occasion</strong>.
                            </p>
                            <div className="bg-white p-8 rounded-2xl border-l-4 border-brand-black italic font-medium text-gray-900 shadow-sm">
                                "Brats is not just a brand, it’s an <strong className="text-gray-900">attitude</strong>— For those who don’t want to blend into the crowd, but stand apart. For those who <strong className="text-gray-900">live life not by rules, but on their own terms</strong>."
                            </div>
                            <p className="font-bold text-gray-900 uppercase tracking-wide text-sm">
                                Our mission is to craft <strong className="text-gray-900">knitwear for men</strong> that isn’t just worn, but becomes a <strong className="text-gray-900 text-lg">symbol of confidence and style</strong>.
                            </p>
                        </div>
                    </section>

                    {/* DIK DIK Section */}
                    <section className="bg-brand-cream rounded-[3rem] p-10 md:p-16 space-y-8 border border-gray-200">
                        <div className="space-y-4">
                            <span className="text-brand-gold uppercase tracking-widest font-bold text-sm block">Brand Story</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">DIK DIK</h2>
                        </div>
                        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                            <p>
                                Inspired by the graceful <strong className="text-gray-900">Dik Dik antelope</strong> of Africa, our brand embodies the <strong className="text-gray-900">essence of delicate beauty, inner strength, and timeless charm</strong>. Much like its namesake, Dik Dik represents women who <strong className="text-gray-900">may appear gentle yet carry incredible resilience, confidence, and elegance within</strong>.
                            </p>
                            <p>
                                At Dik Dik, we create knitwear that mirrors these qualities—<strong className="text-gray-900">soft to touch, effortlessly stylish, and strong enough to last</strong>. Every piece is designed to adapt to the modern woman’s lifestyle, offering comfort, versatility, and sophistication in equal measure.
                            </p>
                            <div className="bg-white p-8 rounded-2xl border-l-4 border-brand-gold italic font-medium text-gray-900 shadow-sm">
                                "Our vision is simple yet powerful: to celebrate women through knitwear that <strong className="text-gray-900">empowers them to feel beautiful, confident, and free</strong>—every single day."
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Quote Area */}
                <section className="py-20 bg-gray-900 text-white text-center rounded-t-[5rem]">
                    <div className="container mx-auto px-6">
                        <p className="text-2xl md:text-3xl font-serif italic mb-4">"Join our community of winterwear enthusiasts"</p>
                        <p className="text-gray-400 uppercase tracking-[0.5em] text-xs">SSKNITWEAR • EST 2014</p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
