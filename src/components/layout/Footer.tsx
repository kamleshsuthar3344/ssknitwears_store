import { Facebook, Instagram, Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        <footer className="bg-[#1a1a1a] pt-20 pb-10 border-t border-white/5">
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
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Explore</h4>
                        <ul className="space-y-4">
                            {footerLinks.quick.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Stay Connected</h4>
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
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; 2026 SS Knitwear. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-brand-gold transition-colors">Terms</Link>
                        <a href="https://jstechsolution.in/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Design by Kamlesh Suthar</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
