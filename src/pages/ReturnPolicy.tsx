import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { RotateCcw } from 'lucide-react';

export default function ReturnPolicy() {
    return (
        <Layout>
            <div className="pt-32 pb-24 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-gray-100 max-w-4xl mx-auto"
                    >
                        <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-8">
                            <RotateCcw className="w-8 h-8 text-pink-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 mb-8">Returns & Refunds</h1>

                        <div className="prose prose-lg text-gray-600 space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
                                <p>We want you to love your purchase. If you're not satisfied, you can return your items within 7 days of delivery. To be eligible, items must be unworn, unwashed, and in their original packaging with tags attached.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
                                <p>Certain items such as innerwear, accessories, or items bought during a "Final Sale" cannot be returned or exchanged due to hygiene and clearance reasons.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Process</h2>
                                <p>Once we receive and inspect your return, we will process your refund within 5-7 business days. The refund will be credited back to your original payment method.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchanges</h2>
                                <p>If you need a different size or color, please follow the return process and place a new order for the desired item. We do not offer direct exchanges at this time.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged Items</h2>
                                <p>If you receive a damaged or defective item, please contact us immediately at ssknitwears14@gmail.com with photos of the product. We will arrange for a replacement or a full refund.</p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
