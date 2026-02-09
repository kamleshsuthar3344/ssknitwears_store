import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Package, LogOut, User, ChevronDown, ChevronUp, MapPin, Plus, Trash2 } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';

interface OrderItem {
    id: number;
    product: {
        name: string;
        image: string;
    } | null;
    quantity: number;
    price: string;
}

interface Order {
    id: number;
    created_at: string;
    total_amount: string;
    status: string;
    items: OrderItem[];
}

interface Address {
    id: number;
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    type: string;
}

export default function Dashboard() {
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

    // Orders State
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    // Address State
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        type: 'shipping'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersRes, addressesRes] = await Promise.all([
                    api.get('/orders'),
                    api.get('/addresses')
                ]);
                setOrders(ordersRes.data);
                setAddresses(addressesRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoadingOrders(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/account');
    };

    const toggleOrder = (id: number) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                const res = await api.put(`/addresses/${editingId}`, newAddress);
                setAddresses(addresses.map(addr => addr.id === editingId ? res.data : addr));
                toast.success("Address updated successfully");
            } else {
                const res = await api.post('/addresses', newAddress);
                setAddresses([...addresses, res.data]);
                toast.success("Address added successfully");
            }
            setShowAddAddress(false);
            setEditingId(null);
            setNewAddress({ name: '', phone: '', address: '', city: '', state: '', zip: '', type: 'shipping' });
        } catch (error) {
            toast.error("Failed to save address");
        }
    };

    const handleEditAddress = (addr: Address) => {
        setNewAddress({
            name: addr.name,
            phone: addr.phone,
            address: addr.address,
            city: addr.city,
            state: addr.state,
            zip: addr.zip,
            type: addr.type
        });
        setEditingId(addr.id);
        setShowAddAddress(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header / Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-gray-900">Welcome, {user?.name}</h1>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Tabs */}
                    <div className="lg:col-span-1 space-y-2">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${activeTab === 'orders' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Package className="w-5 h-5" />
                            My Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('addresses')}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${activeTab === 'addresses' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <MapPin className="w-5 h-5" />
                            Addresses
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${activeTab === 'profile' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <User className="w-5 h-5" />
                            Profile
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'orders' ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-8 border-b border-gray-100">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <Package className="w-5 h-5 text-brand-gold" />
                                        Order History
                                    </h2>
                                </div>

                                {loadingOrders ? (
                                    <div className="p-12 text-center text-gray-400">Loading orders...</div>
                                ) : orders.length === 0 ? (
                                    <div className="p-12 text-center text-gray-500">
                                        You haven't placed any orders yet.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {orders.map((order) => (
                                            <div key={order.id} className="transition-colors hover:bg-gray-50">
                                                <div
                                                    className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                                                    onClick={() => toggleOrder(order.id)}
                                                >
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                                                        <div>
                                                            <span className="block text-xs text-gray-500 uppercase">Order ID</span>
                                                            <span className="font-medium">#{order.id}</span>
                                                        </div>
                                                        <div>
                                                            <span className="block text-xs text-gray-500 uppercase">Date</span>
                                                            <span className="font-medium text-gray-700">{formatDate(order.created_at)}</span>
                                                        </div>
                                                        <div>
                                                            <span className="block text-xs text-gray-500 uppercase">Total</span>
                                                            <span className="font-bold text-gray-900">₹{order.total_amount}</span>
                                                        </div>
                                                        <div>
                                                            <span className="block text-xs text-gray-500 uppercase">Status</span>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-400">
                                                        {expandedOrder === order.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                    </div>
                                                </div>

                                                {/* Expanded Details */}
                                                {expandedOrder === order.id && (
                                                    <div className="px-6 pb-6 pt-2 bg-gray-50/50">
                                                        <div className="space-y-3">
                                                            {order.items.map((item, idx) => (
                                                                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                                                                    <div className="flex items-center gap-3">
                                                                        {/* Placeholder if product deleted or image missing */}
                                                                        <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                                                                            {item.product?.image && <img src={item.product.image} alt="" className="w-full h-full object-cover" />}
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</p>
                                                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm font-medium">₹{item.price}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : activeTab === 'addresses' ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-brand-gold" />
                                        Saved Addresses
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setShowAddAddress(!showAddAddress);
                                            setEditingId(null);
                                            setNewAddress({ name: '', phone: '', address: '', city: '', state: '', zip: '', type: 'shipping' });
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add New
                                    </button>
                                </div>

                                {showAddAddress && (
                                    <form onSubmit={handleAddAddress} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        <h3 className="font-bold mb-4">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input type="text" placeholder="Full Name" required className="p-3 rounded-lg border border-gray-200" value={newAddress.name} onChange={e => setNewAddress({ ...newAddress, name: e.target.value })} />
                                            <input type="tel" placeholder="Phone Number" required className="p-3 rounded-lg border border-gray-200" value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} />
                                            <input type="text" placeholder="Address Line" required className="p-3 rounded-lg border border-gray-200 md:col-span-2" value={newAddress.address} onChange={e => setNewAddress({ ...newAddress, address: e.target.value })} />
                                            <input type="text" placeholder="City" required className="p-3 rounded-lg border border-gray-200" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} />
                                            <input type="text" placeholder="State/Province" required className="p-3 rounded-lg border border-gray-200" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} />
                                            <input type="text" placeholder="ZIP Code" required className="p-3 rounded-lg border border-gray-200" value={newAddress.zip} onChange={e => setNewAddress({ ...newAddress, zip: e.target.value })} />
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="submit" className="px-6 py-2 bg-brand-gold text-black font-bold rounded-lg hover:bg-yellow-500">{editingId ? 'Update Address' : 'Save Address'}</button>
                                            <button type="button" onClick={() => setShowAddAddress(false)} className="px-6 py-2 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50">Cancel</button>
                                        </div>
                                    </form>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map((addr) => (
                                        <div key={addr.id} className="p-4 rounded-xl border border-gray-200 hover:border-brand-gold transition-colors relative group">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 block">{addr.type}</span>
                                                    <h3 className="font-bold text-gray-900">{addr.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                                                    <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                                                    <p className="text-sm text-gray-600 mt-2">{addr.phone}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleEditAddress(addr)}
                                                    className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <MapPin className="w-4 h-4 ml-1 inline-block" /> <span className="text-xs font-bold">Edit</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {addresses.length === 0 && !showAddAddress && (
                                        <div className="col-span-full text-center py-12 text-gray-400">
                                            No saved addresses.
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                                    <User className="w-5 h-5 text-brand-gold" />
                                    Profile Settings
                                </h2>
                                <ProfileForm user={user} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileForm({ user }: { user: any }) {
    const [name, setName] = useState(user?.name || '');
    const [mobile, setMobile] = useState(user?.mobile || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (newPassword && newPassword !== confirmPassword) {
                toast.error("New passwords do not match");
                setLoading(false);
                return;
            }

            const payload: any = { name, mobile };
            if (currentPassword && newPassword) {
                payload.current_password = currentPassword;
                payload.new_password = newPassword;
                payload.new_password_confirmation = confirmPassword;
            }

            await api.post('/user/profile', payload);
            toast.success("Profile updated successfully");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            console.error("Profile update failed", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to update profile");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                        placeholder="+91 XXXXX XXXXX"
                    />
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">Leave blank if you don't want to change password</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </form>
    );
}
