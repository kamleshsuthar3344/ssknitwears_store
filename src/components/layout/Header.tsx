import { Search, ShoppingBag, Menu, Heart, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Men', path: '/shop/men' },
    { name: 'Women', path: '/shop/women' },
    { name: 'Kids', path: '/shop/kids' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'Contact Us', path: '/contact' },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const { items: cartItems } = useAppSelector(state => state.cart);
    const { items: wishlistItems } = useAppSelector(state => state.wishlist);

    // Mock user state (In a real app, this would come from Redux auth slice)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user info exists in localStorage
        const user = localStorage.getItem('user_email');
        if (user) setIsLoggedIn(true);
    }, []);

    // Dynamic Header Background on Scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            setIsSearchOpen(false);
        }
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isMobileMenuOpen
                    ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100 py-0'
                    : 'bg-transparent py-2'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-20' : 'h-24'}`}>
                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <img
                                src="/images/logo.png"
                                alt="SS Knitwears"
                                className="h-16 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <nav className="hidden lg:flex flex-1 items-center justify-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm font-bold tracking-widest text-gray-600 hover:text-black transition-colors uppercase relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right: Icons (Search, Wishlist, Cart) & Mobile Menu */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 -ml-2 text-gray-800 hover:bg-black/5 hover:text-black rounded-full transition-all"
                        >
                            <Search className="w-5 h-5" strokeWidth={1.5} />
                        </button>

                        <Link
                            to="/wishlist"
                            className="hidden sm:block p-2 text-gray-800 hover:bg-black/5 hover:text-black rounded-full transition-all relative group"
                        >
                            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                            )}
                        </Link>

                        <Link
                            to="/cart"
                            className="p-2 text-gray-800 hover:bg-black/5 hover:text-black rounded-full transition-all relative group"
                        >
                            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            {cartItems.length > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full shadow-lg">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        {/* Account Icon */}
                        <Link
                            to="/account"
                            className="p-2 text-gray-800 hover:bg-black/5 hover:text-black rounded-full transition-all relative group"
                            title={isLoggedIn ? 'My Account' : 'Login / Signup'}
                        >
                            <User className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            {isLoggedIn && (
                                <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white" />
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className={`lg:hidden p-2 rounded-full transition-all ${isMobileMenuOpen ? 'bg-black text-white' : 'text-gray-800 hover:bg-black/5'}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Drawer (Glassmorphism) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden"
                        />
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 right-0 bg-white z-[49] pt-28 pb-12 px-6 lg:hidden shadow-2xl border-b border-gray-100"
                        >
                            <nav className="flex flex-col items-center gap-6">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={link.name}
                                        className="w-full text-center"
                                    >
                                        <Link
                                            to={link.path}
                                            className="block text-xl font-serif font-bold py-2 text-gray-900 hover:text-indigo-600 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                    className="w-full pt-4"
                                >
                                    <Link
                                        to="/account"
                                        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User className="w-5 h-5" />
                                        {isLoggedIn ? 'My Account' : 'Login / Signup'}
                                    </Link>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Search Overlay (Glassmorphism) */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col"
                    >
                        <div className="container mx-auto px-6 h-20 flex items-center gap-4">
                            <Search className="w-6 h-6 text-gray-400" />
                            <form onSubmit={handleSearch} className="flex-1">
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search for products..."
                                    className="w-full text-2xl font-serif bg-transparent outline-none placeholder:text-gray-300 text-black"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X className="w-8 h-8 font-light" />
                            </button>
                        </div>
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full" />
                        <div className="flex-1 flex items-center justify-center text-gray-400 font-light text-lg">
                            Type to discover...
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
