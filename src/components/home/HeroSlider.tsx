import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sliderData = [
    {
        id: 1,
        image: '/images/slider/slider1.png',
        title: 'Winter Has Arrived.|Amazing new designs.',
        subtitle: 'FW 18 Collection',
        link: '/shop/women'
    },
    {
        id: 2,
        image: '/images/slider/slider2.png',
        title: 'New Season Trends.|Bold & Beautiful.',
        subtitle: 'Spring 2026',
        link: '/shop'
    },
    {
        id: 3,
        image: '/images/slider/slide3.png',
        title: 'Premium Knitwear.|Crafted for Comfort.',
        subtitle: 'Summer Essentials',
        link: '/shop'
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % sliderData.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    // Typewriter Component
    const TypewriterLine = ({ text, delay = 0 }: { text: string; delay?: number }) => {
        const characters = text.split("");
        return (
            <span className="block italic">
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.05,
                            delay: delay + i * 0.04,
                            ease: "linear"
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </span>
        );
    };

    return (
        <section className="relative h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] w-full bg-[#F9F7F1] overflow-hidden">

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                        if (info.offset.x > 80) prevSlide();
                        else if (info.offset.x < -80) nextSlide();
                    }}
                >
                    <div className="relative w-full h-full max-w-[1920px] mx-auto pointer-events-none">

                        {/* Image Section */}
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

                        {/* Text Section */}
                        <div className="absolute left-0 top-0 h-full w-full md:w-[65%] flex flex-col justify-center px-6 md:pl-20 lg:pl-32 z-10 pointer-events-auto">
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

                                <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-serif font-medium mb-8 md:mb-10 leading-[1.1]">
                                    {sliderData[current].title.split('|').map((line, index) => (
                                        <TypewriterLine
                                            key={index}
                                            text={line}
                                            delay={0.6 + index * 1.5}
                                        />
                                    ))}
                                </h1>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.5 }}
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

            {/* Navigation Dots (Desktop) */}
            <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-20">
                {sliderData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className="group relative flex items-center justify-center w-6 h-6 outline-none"
                    >
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index ? 'bg-black scale-150' : 'bg-black/20 group-hover:bg-black/40'
                            }`}
                        />
                        {current === index && (
                            <motion.div
                                layoutId="active-dot-ring"
                                className="absolute inset-0 border border-black rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Mobile Dots */}
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

