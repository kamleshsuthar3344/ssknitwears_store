import { useState, useEffect, type ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import Footer from './Footer';

import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
    children: ReactNode;
    hideHeader?: boolean;
    hideBottomNav?: boolean;
}

export default function Layout({ children, hideHeader = false, hideBottomNav = false }: LayoutProps) {
    const location = useLocation();
    const hideShopCTA = ['/cart', '/wishlist'].includes(location.pathname);
    const [isCTAVisible, setIsCTAVisible] = useState(false);

    useEffect(() => {
        const hiddenUntil = localStorage.getItem('ctaHiddenUntil');
        const now = Date.now();

        if (hiddenUntil && now < parseInt(hiddenUntil)) {
            const timeRemaining = parseInt(hiddenUntil) - now;
            const timer = setTimeout(() => {
                setIsCTAVisible(true);
                localStorage.removeItem('ctaHiddenUntil');
            }, timeRemaining);
            return () => clearTimeout(timer);
        } else {
            setIsCTAVisible(true);
        }
    }, []);

    const handleCloseCTA = () => {
        setIsCTAVisible(false);
        const reopenTime = Date.now() + 80000; // 80 seconds
        localStorage.setItem('ctaHiddenUntil', reopenTime.toString());
        setTimeout(() => {
            setIsCTAVisible(true);
            localStorage.removeItem('ctaHiddenUntil');
        }, 80000);
    };

    return (
        <div className="min-h-screen bg-white">
            {!hideHeader && <Header />}

            <main className={`
        ${!hideHeader ? 'pt-16' : ''} 
        ${!hideBottomNav ? 'pb-20' : ''}
        min-h-screen
      `}>
                {children}
            </main>

            {/* Global Shop CTA (Static) */}
            {!hideShopCTA && (
                <div className="py-16 px-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
                    >
                        <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Start Shopping
                    </Link>
                </div>
            )}

            {/* Floating Shop CTA (Popup) */}
            <AnimatePresence>
                {!hideShopCTA && isCTAVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        className="fixed bottom-20 right-2 sm:bottom-24 sm:right-4 z-50 flex flex-col items-end gap-2"
                    >
                        <button
                            onClick={handleCloseCTA}
                            className="bg-white/90 backdrop-blur-sm text-gray-500 p-1 sm:p-1.5 rounded-full hover:bg-white hover:text-red-500 shadow-md border border-gray-100 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <Link
                            to="/shop"
                        >
                            <motion.button
                                animate={{
                                    scale: [1, 1.05, 1],
                                    boxShadow: [
                                        "0 10px 15px -3px rgba(220, 38, 38, 0.3)",
                                        "0 20px 25px -5px rgba(220, 38, 38, 0.5)",
                                        "0 10px 15px -3px rgba(220, 38, 38, 0.3)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="flex items-center gap-1.5 sm:gap-2 bg-red-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-xs sm:text-base shadow-xl border-2 border-white/20"
                            >
                                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                                Start Shopping
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
            {!hideBottomNav && (
                <div className="lg:hidden">
                    <BottomNav />
                </div>
            )}
        </div>
    );
}
