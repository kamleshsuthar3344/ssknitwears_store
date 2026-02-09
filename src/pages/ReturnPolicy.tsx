import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { RotateCcw } from 'lucide-react';
import SEO from '../components/common/SEO';

export default function ReturnPolicy() {
    return (
        <Layout>
            <SEO title="Return, Refund & Cancellation Policy | SS Knitwear" description="Read our policy regarding returns, refunds, and cancellations at SS Knitwear." />
            <div className="pt-32 pb-24 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-8 md:p-20 shadow-sm border border-gray-100 max-w-4xl mx-auto"
                    >
                        <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mb-8">
                            <RotateCcw className="w-8 h-8 text-brand-gold" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-black text-gray-900 mb-8">Return, Refund & Cancellation Policy</h1>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            This Return & Refund Policy is applicable to all purchases made from the official website of <strong>SS Knitwear</strong>. By placing an order on our website, you agree to the terms outlined below.
                        </p>

                        <div className="prose prose-lg text-gray-600 space-y-8 max-w-none">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Return Eligibility</h2>
                                <ol className="list-decimal pl-6 space-y-3">
                                    <li>We accept return requests within <strong>7 (seven) days</strong> from the date of delivery, subject to the conditions below.</li>
                                    <li>The product must be unused, unwashed, unworn, and free from any damage.</li>
                                    <li>All original tags, labels, and packaging must be intact.</li>
                                    <li>Returns are accepted only in cases of:
                                        <ul className="list-disc pl-6 mt-2">
                                            <li>Manufacturing defects</li>
                                            <li>Damaged product received</li>
                                            <li>Incorrect product delivered</li>
                                        </ul>
                                    </li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Non-Returnable & Non-Refundable Items</h2>
                                <p>The following items are not eligible for return or refund:</p>
                                <ol className="list-decimal pl-6 space-y-3">
                                    <li>Products purchased during sales, discounts, or promotional offers</li>
                                    <li>Customized / made-to-order products</li>
                                    <li>Items showing signs of use, washing, alteration, or tampering</li>
                                    <li>Return requests raised after the 7-day period</li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Return Request Process</h2>
                                <p>To initiate a return, customers must contact us within 7 days of delivery via:</p>
                                <p><strong>Email:</strong> <a href="mailto:ssknitwearsonline@gmail.com" className="text-brand-gold hover:underline">ssknitwearsonline@gmail.com</a></p>
                                <p>Please provide:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Order ID</li>
                                    <li>Reason for return</li>
                                    <li>Clear images or videos of the product (if requested)</li>
                                </ul>
                                <p className="mt-4 italic text-sm">* All return requests are subject to verification and approval by SSKNITWEAR.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Return Pickup / Shipping</h2>
                                <p>Once approved, return pickup or self-shipping instructions will be communicated. <strong>SSKNITWEAR</strong> reserves the right to refuse returns that do not meet the policy criteria.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Policy</h2>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>Refunds are initiated only after the returned product passes quality inspection.</li>
                                    <li>Approved refunds will be processed to the original payment method within <strong>7–10 business days</strong>.</li>
                                    <li>Shipping, COD, or handling charges are non-refundable.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Exchange Policy</h2>
                                <p>Exchanges are subject to stock availability. If an exchange is not possible, a refund will be processed as per the refund policy.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cancellation Policy</h2>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>Orders can be cancelled before dispatch only.</li>
                                    <li>Once the order is shipped, cancellation requests will not be accepted.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Policy Updates</h2>
                                <p><strong>SSKNITWEAR</strong> reserves the right to modify or update this policy at any time without prior notice. Changes will be effective immediately upon posting on the website.</p>
                            </section>

                            <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Details</h2>
                                <p className="text-sm uppercase tracking-widest text-brand-gold mb-4 font-bold">[ Available MONDAY to SATURDAY: 10:00 AM to 6:00 PM ]</p>
                                <div className="space-y-4 text-gray-700">
                                    <p><strong>SSKNITWEAR</strong></p>
                                    <p><strong>Email:</strong> <a href="mailto:ssknitwearsonline@gmail.com" className="text-brand-gold hover:underline">ssknitwearsonline@gmail.com</a></p>
                                    <p><strong>Phone:</strong> +91 9759722200</p>
                                    <p><strong>Address:</strong> C-10, Kashipur Rd, Ahuja Colony, Dashmesh Nagar, Rudrapur, Uttarakhand 263153</p>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
