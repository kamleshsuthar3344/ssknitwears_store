import { Home, Grid, Heart, User, ShoppingBag } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid, label: 'Categories', path: '/category' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: User, label: 'Account', path: '/account' },
];

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                flex flex-col items-center justify-center w-full h-full space-y-1
                ${isActive ? 'text-black' : 'text-gray-400'}
              `}
                        >
                            <Icon className="w-6 h-6" strokeWidth={1.5} />
                            <span className="text-[10px] uppercase tracking-wide font-medium">{item.label}</span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
