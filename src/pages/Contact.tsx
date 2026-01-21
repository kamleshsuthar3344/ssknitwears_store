import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function Contact() {
    return (
        <Layout>
            <div className="bg-white">
                {/* Small Colorful Hero Section */}
                <section className="relative pt-32 pb-16 bg-gradient-to-r from-orange-400 via-pink-500 to-violet-600 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight"
                        >
                            CONTACT US
                        </motion.h1>
                        <div className="w-20 h-1 bg-white mx-auto mt-6 rounded-full opacity-50" />
                    </div>
                </section>

                <div className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Contact Information Cards */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-violet-50 p-8 rounded-[2.5rem] border border-violet-100 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-violet-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                                <p className="text-violet-600 font-medium break-all">ssknitwears14@gmail.com</p>
                                <p className="text-gray-500 text-sm mt-2">We'll respond within 24 hours.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-pink-50 p-8 rounded-[2.5rem] border border-pink-100 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Call & WhatsApp</h3>
                                <p className="text-pink-600 font-bold text-lg">+91 97597 22200</p>
                                <p className="text-gray-500 text-sm mt-2">Mon - Sat: 10:00 AM - 7:00 PM</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Locations</h3>
                                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                                    <p className="border-l-4 border-orange-400 pl-4 bg-white/50 p-3 rounded-xl">
                                        C 10 Ahuja Colony, Kashipur Road, Rudrapur 263153
                                    </p>
                                    <p className="border-l-4 border-orange-400 pl-4 bg-white/50 p-3 rounded-xl">
                                        A26, Balaji Mandir Road, Adarsh Colony, Rudrapur 263153
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form Container */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-gray-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100 rounded-full -mr-32 -mt-32 blur-3xl opacity-30"></div>
                                <div className="relative z-10">
                                    <div className="mb-10 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Send a Message</h2>
                                            <p className="text-gray-500">We'd love to hear from you.</p>
                                        </div>
                                    </div>

                                    <form className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest font-black text-gray-400 ml-4">Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-violet-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-gray-300"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest font-black text-gray-400 ml-4">Email Address</label>
                                                <input
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-gray-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-black text-gray-400 ml-4">Subject</label>
                                            <select className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all appearance-none cursor-pointer">
                                                <option>General Inquiry</option>
                                                <option>Product Support</option>
                                                <option>Wholesale/B2B</option>
                                                <option>Career Opportunities</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-black text-gray-400 ml-4">Your Message</label>
                                            <textarea
                                                rows={5}
                                                placeholder="How can we help you?"
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-violet-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-gray-300 resize-none"
                                            ></textarea>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, translateY: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl py-5 font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3"
                                        >
                                            Send Message
                                            <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                            </motion.div>
                                        </motion.button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Map/Location Section Placeholder */}
                <section className="container mx-auto px-6 pb-20">
                    <div className="bg-gray-100 h-80 rounded-[3rem] flex items-center justify-center border-4 border-dashed border-gray-200">
                        <div className="text-center text-gray-400">
                            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="font-bold tracking-widest uppercase text-xs">Interactive Map Coming Soon</p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
