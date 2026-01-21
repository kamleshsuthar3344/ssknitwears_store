import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';

export default function About() {
    return (
        <Layout>
            <div className="bg-white">
                {/* Small Colorful Hero Section */}
                <section className="relative pt-32 pb-16 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight"
                        >
                            ABOUT US
                        </motion.h1>
                        <div className="w-20 h-1 bg-white mx-auto mt-6 rounded-full opacity-50" />
                    </div>
                </section>

                {/* Main Content Sections */}
                <div className="container mx-auto px-6 py-20 space-y-24">
                    
                    {/* Introduction Section */}
                    <section className="bg-gray-50 rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
                        <div className="md:w-1/2 space-y-6 relative z-10">
                            <h2 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Cozy and stylish during colder months while minimizing waste generation.</h2>
                            <p className="text-gray-600 leading-relaxed text-lg text-justify">
                                With a rich portfolio of brands including **Brats**, **Dik Dik** we’re dedicated to keeping you cozy and stylish during colder months while minimizing waste generation. We understand the unique needs of men, women and kids and that’s why we offer a diverse range of winterwear products that cater to everyone. 
                            </p>
                            <p className="text-gray-600 leading-relaxed text-justify">
                                Explore our collection from snug sweater, pullovers to blankets, and experience warmth without compromising on style. Join our community of winterwear enthusiasts and let SS Knitwears be your go-to source for **fashionable comfort with conscience**.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img 
                                src="/images/categories/women.png" 
                                alt="Fashion Excellence" 
                                className="w-full aspect-video md:aspect-[4/3] object-cover rounded-[3rem] shadow-2xl transition-transform hover:scale-105 duration-700"
                            />
                        </div>
                    </section>

                    {/* BRATS Section - Colorful & Rounded */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-indigo-600 text-white rounded-[3rem] p-10 md:p-14 shadow-2xl flex flex-col justify-center relative overflow-hidden"
                        >
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
                            <span className="text-indigo-200 uppercase tracking-widest font-bold text-sm mb-4 block">Brand Story</span>
                            <h2 className="text-5xl font-serif font-bold mb-8">BRATS</h2>
                            <div className="space-y-6 text-indigo-50 leading-relaxed text-justify">
                                <p className="text-xl italic font-light">"Brats was not created just to be another clothing brand – it was born out of an idea where style, comfort, and attitude come together to create a distinct identity."</p>
                                <p>We believe today’s man doesn’t just wear fashion, he wears his personality. His clothes reflect his confidence, his freedom, and his spirit. That’s exactly what Brats stands for.</p>
                                <p>Every knitwear piece from Brats is designed to meet the needs of the modern man – comfortable, durable, and effortlessly stylish.</p>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-gray-100 rounded-[3rem] p-8 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow"
                        >
                            <div className="space-y-6 mb-8 text-justify">
                                <p className="text-gray-700 leading-relaxed">Whether it’s a sharp look for work or a laid-back vibe for the weekend, Brats fits every occasion.</p>
                                <div className="bg-white p-6 rounded-[2rem] border-l-8 border-indigo-600 shadow-sm transition-all hover:translate-x-2">
                                    <p className="text-gray-900 font-bold italic">"Brats is not just a brand, it’s an attitude – For those who don’t want to blend into the crowd, but stand apart."</p>
                                </div>
                                <p className="text-gray-600 italic">"Our mission is to craft knitwear for men that isn’t just worn, but becomes a symbol of confidence and style."</p>
                            </div>
                            <img src="/images/categories/men.png" alt="Brats Style" className="w-full h-64 object-cover rounded-[2.5rem] shadow-lg grayscale hover:grayscale-0 transition-all duration-700" />
                        </motion.div>
                    </section>

                    {/* DIK DIK Section - Elegant & Colorful */}
                    <section className="bg-rose-50 rounded-[4rem] p-10 md:p-20 shadow-xl border border-rose-100 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/50 rounded-full blur-3xl -mr-48 -mt-48"></div>
                        <div className="md:col-span-5 relative z-10">
                            <span className="text-rose-400 uppercase tracking-[0.4em] font-black text-xs mb-4 block">The Essence of Grace</span>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 decoration-rose-300 decoration-8 underline-offset-8">DIK DIK</h2>
                            <div className="space-y-6 text-gray-700 leading-relaxed text-lg text-justify">
                                <p>Inspired by the graceful Dik Dik antelope of Africa, our brand embodies the essence of **delicate beauty, inner strength, and timeless charm**.</p>
                                <p>Much like its namesake, Dik Dik represents women who may appear gentle yet carry incredible resilience, confidence, and elegance within.</p>
                            </div>
                        </div>
                        <div className="md:col-span-7 space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <img src="/images/categories/kids.png" alt="Dik Dik Soft" className="w-full aspect-square object-cover rounded-[3rem] shadow-xl hover:-rotate-2 transition-all cursor-pointer" />
                                <div className="bg-white p-8 rounded-[3rem] shadow-lg flex flex-col justify-center border border-rose-100 group">
                                    <h3 className="text-2xl font-serif font-bold text-rose-500 mb-4 italic group-hover:tracking-widest transition-all">Our Vision</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">To celebrate women through knitwear that empowers them to feel beautiful, confident, and free – every single day.</p>
                                </div>
                            </div>
                            <div className="bg-rose-500 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
                                    <div className="w-20 h-20 border-4 border-white rounded-full"></div>
                                </div>
                                <p className="text-xl font-medium leading-relaxed italic relative z-10 text-justify">"At Dik Dik, we create knitwear that mirrors these qualities – soft to touch, effortlessly stylish, and strong enough to last."</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Quote Area */}
                <section className="py-20 bg-gray-900 text-white text-center rounded-t-[5rem]">
                    <div className="container mx-auto px-6">
                        <p className="text-2xl md:text-3xl font-serif italic mb-4">"Join our community of winterwear enthusiasts"</p>
                        <p className="text-gray-400 uppercase tracking-[0.5em] text-xs">SS KNITWEARS • EST 2026</p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
