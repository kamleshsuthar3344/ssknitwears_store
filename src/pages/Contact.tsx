import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '../components/common/SEO';

export default function Contact() {
    return (
        <Layout>
            <SEO title="Contact Us | SS Knitwear" description="Get in touch with SS Knitwear for any inquiries, support, or feedback." />
            <div className="bg-white">
                {/* Small Colorful Hero Section */}
                {/* Brand Hero Section */}
                <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-brand-black overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight"
                        >
                            CONTACT US
                        </motion.h1>
                        <div className="w-20 h-1 bg-brand-gold mx-auto mt-6 rounded-full opacity-100" />
                    </div>
                </section>

                <div className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Contact Information Cards */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-brand-cream p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-brand-black rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:rotate-12 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Email Us</h3>
                                <p className="text-brand-gold font-bold break-all">ssknitwears14@gmail.com</p>
                                <p className="text-gray-500 text-sm mt-2">We'll respond within 24 hours.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-brand-cream p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-brand-black rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:rotate-12 transition-transform">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Call & WhatsApp</h3>
                                <p className="text-brand-gold font-bold text-lg">+91 97597 22200</p>
                                <p className="text-gray-500 text-sm mt-2">Mon - Sat: 10:00 AM - 7:00 PM</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-brand-cream p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-brand-black rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:rotate-12 transition-transform">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Our Locations</h3>
                                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                                    <p className="border-l-4 border-brand-gold pl-4 bg-white/50 p-3 rounded-xl">
                                        C-10, Kashipur Rd, Ahuja Colony, Dashmesh Nagar, Rudrapur, Uttarakhand 263153
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form Container */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-14 shadow-2xl border border-gray-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cream rounded-full -mr-32 -mt-32 blur-3xl opacity-30"></div>
                                <div className="relative p-6 md:p-12 h-full flex flex-col justify-between">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-cream rounded-2xl flex items-center justify-center shrink-0">
                                            <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-brand-gold" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 tracking-tight">Send a Message</h2>
                                            <p className="text-gray-500 text-sm md:text-base">We'd love to hear from you.</p>
                                        </div>
                                    </div>

                                    <form className="space-y-8" onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        const data = {
                                            name: formData.get('name'),
                                            email: formData.get('email'),
                                            subject: formData.get('subject'),
                                            message: formData.get('message')
                                        };

                                        try {
                                            // @ts-ignore
                                            await import('../services/api').then(module => module.default.post('/contact', data));
                                            toast.success("Message sent successfully!");
                                            (e.target as HTMLFormElement).reset();
                                        } catch (error) {
                                            toast.error("Failed to send message. Please try again.");
                                        }
                                    }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-4">Full Name</label>
                                                <input
                                                    name="name"
                                                    required
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl px-4 md:px-6 py-4 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-4">Email Address</label>
                                                <input
                                                    name="email"
                                                    required
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl px-4 md:px-6 py-4 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-4">Subject</label>
                                            <select name="subject" className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl px-4 md:px-6 py-4 outline-none transition-all appearance-none cursor-pointer text-gray-900 text-base">
                                                <option>General Inquiry</option>
                                                <option>Product Support</option>
                                                <option>Wholesale/B2B</option>
                                                <option>Career Opportunities</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-4">Your Message</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={5}
                                                placeholder="How can we help you?"
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl px-4 md:px-6 py-4 outline-none transition-all placeholder:text-gray-400 text-gray-900 resize-none"
                                            ></textarea>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, translateY: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-brand-black text-brand-gold border border-brand-gold rounded-2xl py-5 font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-brand-gold hover:text-black transition-all flex items-center justify-center gap-3"
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

                {/* Map/Location Section */}
                <section className="container mx-auto px-6 pb-20">
                    <div className="bg-gray-100 h-[300px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-lg border border-gray-100 relative">
                        <iframe
                            src="https://maps.google.com/maps?q=C-10%2C%20Kashipur%20Rd%2C%20Ahuja%20Colony%2C%20Dashmesh%20Nagar%2C%20Rudrapur%2C%20Uttarakhand%20263153&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="SS Knitwear Location"
                            className="grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    );
}
