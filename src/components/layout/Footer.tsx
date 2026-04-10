import { Facebook, Instagram, Mail, MapPin, Phone, Linkedin, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AttributionPill = () => {
    const [copied, setCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("https://jstechsolution.in/");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleCopy}
            className="group relative border border-white/20 rounded-full px-5 py-2 flex items-center justify-center bg-[#1a1a1a]/50 shadow-inner hover:bg-white/5 transition-all outline-none"
        >
            <span className="text-gray-400">Design by&nbsp;</span>
            <span className="text-[#e11d48] font-bold tracking-wide drop-shadow-md">Jstechsolution.in</span>
            <span className="text-gray-400 font-medium tracking-wide"> &nbsp;|&nbsp; KS suthar</span>

            <AnimatePresence>
                {showTooltip && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-2 rounded-lg shadow-xl flex items-center gap-2 whitespace-nowrap pointer-events-none z-50"
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied URL!' : 'Click to copy URL'}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

const FooterSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <div className="py-4 md:py-0">
            <h4 className="font-bold text-[13px] uppercase tracking-widest text-white mb-6">{title}</h4>
            <div className="mt-4 md:mt-0">
                {children}
            </div>
        </div>
    );
};
const footerLinks = {
    quick: [
        { name: 'Home', href: '/' },
        { name: 'Men', href: '/shop/men' },
        { name: 'Women', href: '/shop/women' },
        { name: 'Kids', href: '/shop/kids' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ],
    support: [
        { name: 'Find Our Stores', href: '/find-store' },
        { name: 'Track Order', href: '/track-order' },
        { name: 'Shipping Policy', href: '/shipping-policy' },
        { name: 'Returns & Refunds', href: '/return-policy' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ]
};

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] pt-20 pb-28 md:pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <img
                            src="/images/logo.png"
                            alt="SS Knitwear"
                            className="h-12 w-auto object-contain brightness-0 invert opacity-90"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Crafting premium knitwear for the modern wardrobe. Quality materials, timeless designs, and unmatched comfort for the whole family.
                        </p>
                        <div className="flex gap-3">
                            <motion.a
                                href="https://www.facebook.com/profile.php?id=61575361025645"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors shadow-sm"
                            >
                                <Facebook className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/_ss_knitwears/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors shadow-sm"
                            >
                                <Instagram className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/company/ssknitwears/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors shadow-sm"
                            >
                                <Linkedin className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <FooterSection title="Explore">
                        <ul className="space-y-4">
                            {footerLinks.quick.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </FooterSection>

                    {/* Support */}
                    <FooterSection title="Support">
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </FooterSection>

                    {/* Newsletter / Contact */}
                    <FooterSection title="Stay Connected">
                        <p className="text-sm text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="flex gap-2 mb-6">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-600"
                            />
                            <button className="px-4 py-3 bg-brand-gold text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors">
                                Join
                            </button>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-400">
                            <MapPin className="w-4 h-4 shrink-0 mt-1 text-brand-gold" />
                            <span>C-10, Kashipur Rd, Ahuja Colony, <br />Dashmesh Nagar, Rudrapur, Uttarakhand 263153</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
                            <Mail className="w-4 h-4 shrink-0 text-brand-gold" />
                            <span>ssknitwears14@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
                            <Phone className="w-4 h-4 shrink-0 text-brand-gold" />
                            <span>+91 97597 22200</span>
                        </div>
                    </FooterSection>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
                    <p>&copy; 2026 SS Knitwear. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center items-center gap-6 text-[13px]">
                        {/* Custom Attribution Pill */}
                        <AttributionPill />
                    </div>
                </div>
            </div>
        </footer>
    );
}
