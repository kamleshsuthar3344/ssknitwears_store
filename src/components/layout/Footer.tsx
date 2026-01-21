import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const footerLinks = {
    quick: [
        { name: 'Home', href: '/' },
        { name: 'Men', href: '/shop/men' },
        { name: 'Women', href: '/shop/women' },
        { name: 'Kids', href: '/shop/kids' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ],
    support: [
        { name: 'Track Order', href: '/track-order' },
        { name: 'Shipping Policy', href: '/shipping-policy' },
        { name: 'Returns & Refunds', href: '/return-policy' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ]
};

export default function Footer() {
    return (
        <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <img
                            src="/images/logo.png"
                            alt="SS Knitwears"
                            className="h-12 w-auto object-contain"
                        />
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            Crafting premium knitwear for the modern wardrobe. Quality materials, timeless designs, and unmatched comfort for the whole family.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -3 }}
                                    className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors shadow-sm"
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {footerLinks.quick.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-gray-500 hover:text-black transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-gray-500 hover:text-black transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Stay Connected</h4>
                        <p className="text-sm text-gray-500 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="flex gap-2 mb-6">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                            />
                            <button className="px-4 py-3 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors">
                                Join
                            </button>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 shrink-0 mt-1" />
                            <span>C 10 Ahuja Colony, Kashipur Road, <br />Rudrapur 263153</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                            <Mail className="w-4 h-4 shrink-0" />
                            <span>ssknitwears14@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span>+91 97597 22200</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                    <p>&copy; 2026 SS Knitwears. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-gray-600">Privacy</Link>
                        <Link to="/terms" className="hover:text-gray-600">Terms</Link>
                        <a href="#" className="hover:text-gray-600">Design by Kamlesh Suthar</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
