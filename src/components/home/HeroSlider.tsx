import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { sliderData } from '../../data/productData';

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % sliderData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen w-full flex flex-col lg:flex-row bg-[#fbf9f6] overflow-hidden">

            {/* Desktop: Text Section (Left) */}
            {/* Mobile: Text Overlay (Bottom) */}
            <div className="relative z-10 w-full lg:w-[40%] h-full flex flex-col justify-end lg:justify-center px-8 md:px-16 lg:pl-24 lg:pr-0 pb-24 lg:pb-0 pointer-events-none lg:pointer-events-auto lg:order-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        className="max-w-xl pointer-events-auto text-white lg:text-black"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 opacity-90 lg:opacity-100 shadow-black/50 lg:shadow-none drop-shadow-md lg:drop-shadow-none"
                        >
                            {sliderData[current].subtitle}
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] mb-8 shadow-black/50 lg:shadow-none drop-shadow-md lg:drop-shadow-none"
                        >
                            {sliderData[current].title}
                        </motion.h1>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ x: 10 }}
                            className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase border-b-2 pb-1 transition-all w-fit border-white lg:border-black shadow-black/50 lg:shadow-none drop-shadow-md lg:drop-shadow-none"
                        >
                            Discover Now
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                    </motion.div>
                </AnimatePresence>

                {/* Pagination / Dots */}
                {/* Adjusted for Desktop to sit nicely within the text area */}
                <div className="absolute bottom-8 left-8 lg:left-24 lg:bottom-12 flex gap-4 pointer-events-auto z-20">
                    {sliderData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`text-sm font-medium transition-colors ${current === index
                                ? 'text-white lg:text-black border-b border-white lg:border-black'
                                : 'text-white/60 lg:text-gray-400 hover:text-white lg:hover:text-gray-600'
                                }`}
                        >
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop: Image Section (Right) */}
            {/* Mobile: Background Image (Absolute) */}
            <div className="absolute inset-0 lg:static lg:w-[60%] lg:h-full lg:order-2 overflow-hidden z-0 bg-[#fbf9f6] lg:flex lg:items-end lg:justify-start lg:pl-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 lg:relative lg:w-full lg:h-full flex items-end justify-start bg-[#fbf9f6]"
                    >
                        {/* Desktop Image: Object Bottom ensures model stands on ground, H-full fills height */}
                        <img
                            src={sliderData[current].image}
                            alt={sliderData[current].title}
                            className="w-full h-full object-cover object-top lg:w-auto lg:h-full lg:object-contain lg:object-bottom shadow-lg lg:shadow-none"
                        />

                        {/* Mobile Gradient Overlay (Bottom Up) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
}
