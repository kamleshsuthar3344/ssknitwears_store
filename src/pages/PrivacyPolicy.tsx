import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <Layout>
            <div className="pt-32 pb-24 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-gray-100 max-w-4xl mx-auto"
                    >
                        <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-8">
                            <Shield className="w-8 h-8 text-violet-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 mb-8">Privacy Policy</h1>

                        <div className="prose prose-lg text-gray-600 space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                                <p>Welcome to SS Knitwears. Your privacy is of paramount importance to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our website.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                                <p>We collect personal information such as your name, email address, and phone number when you register an account or make a purchase. We also collect usage data through cookies to improve your experience.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Data</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>To process and fulfill your orders</li>
                                    <li>To communicate updates regarding your purchases</li>
                                    <li>To send promotional offers (if you've opted in)</li>
                                    <li>To improve our website functionality and user experience</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                                <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored in secure networks and is only accessible by a limited number of persons who have special access rights.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                                <p>If you have any questions regarding this Privacy Policy, you can contact us at ssknitwears14@gmail.com.</p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
