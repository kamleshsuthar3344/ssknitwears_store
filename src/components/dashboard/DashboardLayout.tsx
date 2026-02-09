import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    PlusCircle,
    Home,
    User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Desktop Sidebar State
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!user) return null;

    const isAdmin = user.role === 'admin' || user.role === 'super_admin';
    const isSeller = user.role === 'seller';

    // Navigation Items Definition
    const adminLinks = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Customers', path: '/admin/users', icon: Users },
        // { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    const sellerLinks = [
        { name: 'Dashboard', path: '/seller/dashboard', icon: Home },
        { name: 'My Products', path: '/seller/products', icon: Package },
        { name: 'Orders', path: '/seller/orders', icon: ShoppingCart },
    ];

    const links = isAdmin ? adminLinks : (isSeller ? sellerLinks : []);

    // Mobile Bottom Nav Items (optimized for Seller "Instagram" flow)
    const mobileBottomLinks = isSeller ? [
        { name: 'Home', path: '/seller/dashboard', icon: Home },
        { name: 'Products', path: '/seller/products', icon: Package },
        { name: 'Add', path: '/seller/add-product', icon: PlusCircle, isAction: true }, // Special "Add" button
        { name: 'Orders', path: '/seller/orders', icon: ShoppingCart },
    ] : adminLinks.slice(0, 4); // Show first 4 for admin on mobile

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300`}>
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-serif font-bold text-gray-900">
                        SSK<span className="text-brand-gold">.</span>
                    </h1>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        {isAdmin ? 'Admin Panel' : 'Seller Hub'}
                    </p>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {links.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                    <div className="mt-4 px-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 mb-16 md:mb-0">
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
                <div className="flex justify-around items-center h-16">
                    {mobileBottomLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === link.path
                                ? 'text-black'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {link.isAction ? (
                                <div className="bg-black text-white p-3 rounded-full -mt-8 shadow-lg border-4 border-white">
                                    <link.icon className="w-6 h-6" />
                                </div>
                            ) : (
                                <>
                                    <link.icon className={`w-6 h-6 ${location.pathname === link.path ? 'fill-current' : 'stroke-current'}`} strokeWidth={location.pathname === link.path ? 0 : 2} />
                                    <span className="text-[10px] font-medium">{link.name}</span>
                                </>
                            )}
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
