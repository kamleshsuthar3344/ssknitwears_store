import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sliderData } from '../../data/productData';

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % sliderData.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] w-full bg-[#F9F7F1] overflow-hidden">

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative w-full h-full max-w-[1920px] mx-auto">

                        {/* 
                            Image Section 
                            - Mobile: 70% width aligned right (leaves 30% left gap for text start). Object-left.
                            - Desktop: Takes right 55%.
                        */}
                        <div className="absolute right-0 top-0 bottom-0 w-[70%] md:w-[60%] lg:w-[60%] h-full z-0">
                            <motion.img
                                src={sliderData[current].image}
                                alt={sliderData[current].title}
                                className="w-full h-full object-cover object-left md:object-contain md:object-[50%_100%] lg:object-[30%_100%]"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>

                        {/* 
                            Text Section 
                            - Mobile: Left aligned, taking full width (layered over background).
                            - Desktop: Left aligned, taking 45% width.
                        */}
                        <div className="absolute left-0 top-0 h-full w-full md:w-[65%] flex flex-col justify-center px-6 md:pl-20 lg:pl-32 z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <motion.p
                                    className="text-black text-xs md:text-sm font-sans font-medium mb-4 tracking-[0.05em]"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {sliderData[current].subtitle}
                                </motion.p>

                                <motion.h1
                                    className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-serif font-medium mb-8 md:mb-10 leading-[1.1]"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {typeof sliderData[current].title === 'string' ? (
                                        sliderData[current].title.split('|').map((line, index) => (
                                            <span key={index} className="block">
                                                {line}
                                            </span>
                                        ))
                                    ) : (
                                        sliderData[current].title
                                    )}
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Link
                                        to={sliderData[current].link}
                                        className="inline-flex items-center gap-2 text-black border-b border-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors duration-300 text-xs md:text-sm font-bold uppercase tracking-wider group"
                                    >
                                        Discover Now
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Vertical Navigation (Desktop) */}
            <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 z-20">
                {sliderData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className="group flex items-center justify-end gap-3 outline-none"
                    >
                        <span className={`text-xs font-sans font-medium transition-colors duration-300 ${current === index ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'
                            }`}>
                            {index + 1}
                        </span>

                        <div className="relative w-8 h-[2px] flex items-center">
                            {current === index && (
                                <motion.div
                                    layoutId="active-nav-line"
                                    className="h-[2px] bg-black w-8 absolute right-0"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {current !== index && (
                                <div className="h-[2px] bg-transparent w-8" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Mobile Dots (Bottom-Left aligned or Center) */}
            <div className="absolute bottom-6 left-6 flex gap-3 md:hidden z-20">
                {sliderData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index ? 'bg-black scale-125' : 'bg-black/20'
                            }`}
                    />
                ))}
            </div>

        </section>
    );
}
