import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { items, totalAmount } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    if (items.length === 0) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                        Oops no product in Cart, Cart is Empty
                    </h2>
                    <Link to="/" className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        Start Shopping
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1">
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="text-lg font-bold">{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
                            <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="h-[1px] bg-gray-200" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>₹{totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-black/10">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
