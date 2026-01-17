import { Search, ShoppingBag, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <button className="p-2 -ml-2 text-gray-800">
                    <Menu className="w-6 h-6" />
                </button>

                <div className="text-2xl font-serif font-bold tracking-tighter">
                    SS KNITWEARS
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-800">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 -mr-2 text-gray-800 relative">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
