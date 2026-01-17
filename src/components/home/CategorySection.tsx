import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        title: 'Women',
        subtitle: 'Winter Elegance',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop',
        size: 'large', // Spans full width or large
    },
    {
        id: 2,
        title: 'Men',
        subtitle: 'Classic Knits',
        image: 'https://images.unsplash.com/photo-1488161628813-99bbb5193118?q=80&w=2072&auto=format&fit=crop',
        size: 'medium',
    },
    {
        id: 3,
        title: 'Kids',
        subtitle: 'Little Comforts',
        image: 'https://images.unsplash.com/photo-1519238263496-61437aeb9273?q=80&w=2070&auto=format&fit=crop',
        size: 'medium',
    },
];

export default function CategorySection() {
    return (
        <section className="py-12 px-4 bg-white">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Collections</h2>
                    <p className="text-gray-500 mt-2">Curated for the season</p>
                </div>
                <button className="text-sm font-semibold border-b border-black pb-1">VIEW ALL</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative group overflow-hidden rounded-2xl ${cat.size === 'large' ? 'col-span-2 h-[300px]' : 'col-span-1 h-[250px]'
                            }`}
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-2xl font-serif font-bold">{cat.title}</h3>
                            <p className="text-sm opacity-90">{cat.subtitle}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
