import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/layout/Layout';
import { clearCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export default function Checkout() {
    const { items, totalAmount } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Check Auth on Mount & Verify Token
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please login to place an order");
                navigate('/account?redirect=checkout');
                return;
            }

            try {
                // Verify if token is actually valid
                await api.get('/user');
            } catch (error) {
                // If invalid, clear auth and redirect
                console.error("Token invalid:", error);
                localStorage.removeItem('token');
                // dispatch(logout()); // If you have a logout action
                toast.error("Session expired. Please login again.");
                navigate('/account?redirect=checkout');
            }
        };

        checkAuth();
    }, [navigate]);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const parsePrice = (priceStr: string) => {
        return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login first");
            navigate('/account?redirect=checkout');
            return;
        }

        if (items.length === 0) {
            toast.error("Your cart is empty");
            navigate('/shop/men');
            return;
        }

        setIsProcessing(true);

        try {
            // Construct Payload match OrderController expects
            const payload = {
                total_amount: totalAmount,
                payment_method: paymentMethod,
                shipping_address: formData,
                items: items.map(item => ({
                    product_id: item.id,
                    variant_id: item.variantId,
                    size: item.selectedSize,
                    color: item.selectedColor,
                    quantity: item.quantity,
                    price: parsePrice(item.price)
                }))
            };

            const response = await api.post('/orders', payload);

            if (response.status === 201) {
                toast.success("Order placed successfully!");
                dispatch(clearCart());
                navigate('/account'); // Redirect to orders page/account
            }

        } catch (error: any) {
            console.error("Checkout Error:", error);
            const msg = error.response?.data?.message || "Failed to place order";
            toast.error(msg);
        } finally {
            setIsProcessing(false);
        }
    };

    // If no items, we redirect, but component might render briefly
    if (items.length === 0) {
        return null;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-serif font-bold mb-8 text-center text-gray-900">Checkout</h1>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">

                        {/* LEFT COLUMN: DETAILS */}
                        <div className="lg:col-span-7 space-y-8">

                            {/* Shipping Address */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-brand-gold" />
                                    Shipping Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Phone Details</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            placeholder="House No, Street, Landmark"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            placeholder="Mumbai"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            required
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            placeholder="Maharashtra"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Zip Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            required
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            placeholder="400001"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-brand-gold" />
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-black bg-black/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-black focus:ring-black"
                                        />
                                        <div className="flex-1">
                                            <span className="font-bold text-gray-900 block">Cash on Delivery</span>
                                            <span className="text-sm text-gray-500">Pay when you receive your order</span>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-not-allowed opacity-60 ${paymentMethod === 'online' ? 'border-black bg-black/5' : 'border-gray-200'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="online"
                                            disabled
                                            className="w-5 h-5 text-black focus:ring-black"
                                        />
                                        <div className="flex-1">
                                            <span className="font-bold text-gray-900 block">Online Payment (Coming Soon)</span>
                                            <span className="text-sm text-gray-500">UPI, Credit/Debit Card, Net Banking</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: SUMMARY */}
                        <div className="lg:col-span-5">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center">
                                            <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{item.name}</h4>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-sm">{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="border-t border-dashed border-gray-200 my-4" />
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full mt-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            Place Order
                                            <CheckCircle2 className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-gray-400 mt-4">
                                    By placing an order, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    );
}
