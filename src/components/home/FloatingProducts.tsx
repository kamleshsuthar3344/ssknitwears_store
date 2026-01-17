import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Mock product data - ideally these would be transparent PNGs for better effect
const product1 = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1905&auto=format&fit=crop"; // Clothes
const product2 = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop"; // Winter wear

export default function FloatingProducts() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    return (
        <section ref={containerRef} className="py-20 bg-slate-50 overflow-hidden relative min-h-[80vh]">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-md mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl font-serif font-bold mb-4"
                    >
                        The Art of Knitwear
                    </motion.h2>
                    <p className="text-gray-600">
                        Meticulously crafted pieces that blend traditional techniques with modern design.
                    </p>
                </div>

                <div className="relative h-[400px]">
                    {/* Decorative text behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-bold text-gray-200/50 whitespace-nowrap select-none -z-10">
                        SS KNIT
                    </div>

                    {/* Floating Product 1 (Left) */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute top-0 left-0 w-48 aspect-[3/4] rounded-lg shadow-2xl overflow-hidden rotate-[-6deg]"
                    >
                        <img src={product1} alt="Product 1" className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Floating Product 2 (Right, faster) */}
                    <motion.div
                        style={{ y: y2, rotate }}
                        className="absolute top-10 right-0 w-56 aspect-[3/4] rounded-lg shadow-2xl overflow-hidden rotate-[6deg] z-20"
                    >
                        <img src={product2} alt="Product 2" className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Center Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 text-center z-10"
                    >
                        <h3 className="text-xl font-bold font-serif mb-2">Premium Quality</h3>
                        <p className="text-sm text-gray-500 mb-4">100% Merino Wool</p>
                        <button className="px-6 py-2 bg-black text-white text-sm tracking-wide hover:bg-gray-800 transition-colors">
                            DISCOVER
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
