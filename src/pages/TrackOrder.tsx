import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Package, Truck, CheckCircle, Search, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import api from '../services/api';
import { toast } from 'sonner';

export default function TrackOrder() {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [orderData, setOrderData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setOrderData(null);

        try {
            const res = await api.post('/track-order', {
                order_id: orderId,
                email: email
            });
            setOrderData(res.data);
            toast.success("Order found!");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to track order. Please check your details.");
            toast.error("Tracking failed");
        } finally {
            setLoading(false);
        }
    };

    const getStatusStep = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 1;
            case 'processing': return 2;
            case 'shipped': return 3;
            case 'delivered': return 4;
            default: return 1;
        }
    };

    const currentStep = orderData ? getStatusStep(orderData.status) : 0;

    return (
        <Layout>
            <div className="bg-white min-h-screen">
                {/* ... existing hero section ... */}
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

                            <form onSubmit={handleTrack} className="relative z-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-black text-gray-400 ml-4">Order ID</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 2 or #2"
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-gray-300"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-black text-gray-400 ml-4">Billing Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-gray-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, translateY: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className="w-full bg-black text-white rounded-2xl py-5 font-bold uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? 'Tracking...' : 'Track Status'}
                                    <Search className="w-4 h-4" />
                                </motion.button>

                                {error && (
                                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="text-sm font-bold">{error}</span>
                                    </div>
                                )}
                            </form>
                        </motion.div>

                        {/* Order Timeline */}
                        {orderData && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-16 space-y-12"
                            >
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-serif font-bold mb-2">Order #{orderData.id}</h2>
                                    <p className="text-gray-500">Placed on {new Date(orderData.created_at).toLocaleDateString()}</p>
                                    <p className="text-2xl font-black mt-4">Total: ₹{orderData.total_amount}</p>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                                    {/* Line */}
                                    <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gray-100 hidden md:block" />

                                    {/* Step 1: Placed */}
                                    <div className={`flex flex-col items-center gap-4 relative z-10 ${currentStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg ring-8 transition-all ${currentStep >= 1 ? 'bg-green-500 ring-green-50' : 'bg-gray-200 ring-gray-50 text-gray-400'}`}>
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-gray-900">Order Placed</p>
                                        </div>
                                    </div>

                                    {/* Step 2: Processing */}
                                    <div className={`flex flex-col items-center gap-4 relative z-10 ${currentStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg ring-8 transition-all ${currentStep >= 2 ? 'bg-brand-gold ring-brand-cream' : 'bg-gray-200 ring-gray-50 text-gray-400'}`}>
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-gray-900">Processing</p>
                                        </div>
                                    </div>

                                    {/* Step 3: In Transit */}
                                    <div className={`flex flex-col items-center gap-4 relative z-10 ${currentStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg ring-8 transition-all ${currentStep >= 3 ? 'bg-brand-gold ring-brand-cream' : 'bg-gray-200 ring-gray-50 text-gray-400'}`}>
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-gray-900">In Transit</p>
                                        </div>
                                    </div>

                                    {/* Step 4: Delivered */}
                                    <div className={`flex flex-col items-center gap-4 relative z-10 ${currentStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg ring-8 transition-all ${currentStep >= 4 ? 'bg-green-500 ring-green-50' : 'bg-gray-200 ring-gray-50 text-gray-400'}`}>
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-gray-900">Delivered</p>
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
