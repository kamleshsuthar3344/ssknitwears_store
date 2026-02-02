import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Package, Truck, CheckCircle, Search } from 'lucide-react';
import { useState } from 'react';

export default function TrackOrder() {
    const [orderId, setOrderId] = useState('');

    return (
        <Layout>
            <div className="bg-white min-h-screen">
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
                                Order Tracking
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl md:text-7xl font-serif font-black text-white mb-6"
                            >
                                Track Your Order
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-lg md:text-xl text-brand-gold max-w-2xl font-medium"
                            >
                                Enter your order ID and billing email to track your shipping status in real-time.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-gray-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cream rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>

                            <form className="relative z-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-black text-gray-400 ml-4">Order ID</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. #SS-12345"
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-black text-gray-400 ml-4">Billing Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, translateY: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-black text-white rounded-2xl py-5 font-bold uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3"
                                >
                                    Track Status
                                    <Search className="w-4 h-4" />
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Order Timeline (Mock) */}
                        {orderId && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-16 space-y-12"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                                    {/* Line */}
                                    <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gray-100 hidden md:block" />

                                    <div className="flex flex-col items-center gap-4 relative z-10">
                                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg ring-8 ring-green-50">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-gray-900">Order Placed</p>
                                            <p className="text-xs text-gray-500">Jan 20, 2026</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-4 relative z-10">
                                        <div className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-lg ring-8 ring-brand-cream">
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-gray-900">Processing</p>
                                            <p className="text-xs text-gray-500">In Progress</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-4 relative z-10 opacity-30">
                                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-gray-900">In Transit</p>
                                            <p className="text-xs text-gray-500">Pending</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-4 relative z-10 opacity-30">
                                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-gray-900">Delivered</p>
                                            <p className="text-xs text-gray-500">Pending</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
