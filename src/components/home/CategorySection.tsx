import { motion } from 'framer-motion';
import { categoryData } from '../../data/productData';

export default function CategorySection() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <div className="flex items-end justify-between mb-10 px-2">
                    <div>
                        <span className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2 block">Our Collections</span>
                        <h2 className="text-4xl font-serif font-bold text-gray-900">Discover Styles</h2>
                    </div>
                </div>

                {/* Responsive Grid: 1 col on mobile, 3 cols on tablet/desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categoryData.map((cat, idx) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.6 }}
                            className="relative group overflow-hidden rounded-3xl h-[400px] md:h-[500px] shadow-lg cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder while loading */}
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-5xl font-serif font-bold tracking-tight mb-3 uppercase">{cat.title}</h3>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <div className="h-[1px] w-8 bg-white" />
                                    <p className="text-sm font-medium tracking-widest uppercase">{cat.action}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
