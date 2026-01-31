import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Truck } from 'lucide-react';
import SEO from '../components/common/SEO';

export default function ShippingPolicy() {
    return (
        <Layout>
            <SEO title="Shipping Policy | SSKNITWEAR" description="Learn about our shipping rates, delivery times, and international shipping options." />
            <div className="pt-32 pb-24 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-gray-100 max-w-4xl mx-auto"
                    >
                        <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mb-8">
                            <Truck className="w-8 h-8 text-brand-gold" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 mb-8">Shipping Policy</h1>

                        <div className="prose prose-lg text-gray-600 space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Coverage</h2>
                                <p>We offer shipping services across India. We are working towards expanding our delivery capabilities to international locations soon.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Timeline</h2>
                                <p>Standard shipping usually takes 5-7 business days for delivery. During peak seasons or sales events, delivery may take up to 10 business days.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Charges</h2>
                                <p>We offer free standard shipping on all orders above ₹999. For orders below this amount, a flat shipping fee of ₹49 will be applied at checkout.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Your Order</h2>
                                <p>Once your order is shipped, you will receive an email and SMS with the tracking details. You can also track your order directly on our "Track Order" page.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Address Information</h2>
                                <p>Please ensure that your shipping address is accurate. SSKNITWEAR is not responsible for deliveries made to incorrect addresses provided by the customer.</p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
