import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { FileText } from 'lucide-react';
import SEO from '../components/common/SEO';

export default function TermsOfService() {
    return (
        <Layout>
            <SEO title="Terms of Service | SS Knitwear" description="Read the terms and conditions for shopping at SS Knitwear." />
            <div className="pt-32 pb-24 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-gray-100 max-w-4xl mx-auto"
                    >
                        <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mb-8">
                            <FileText className="w-8 h-8 text-brand-gold" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 mb-8">Terms of Service</h1>

                        <div className="prose prose-lg text-gray-600 space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Service</h2>
                                <p>You agree to use our website for lawful purposes only. You are prohibited from using the site to engage in any fraudulent activity or any conduct that violates local, state, or international laws.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
                                <p>All content included on this site, such as text, graphics, logos, and images, is the property of SS Knitwear or its content suppliers and protected by international copyright laws.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
                                <p>SS Knitwear will not be liable for any damages that arise out of the use of our products or the inability to use the services offered on this website.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Governing Law</h2>
                                <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
