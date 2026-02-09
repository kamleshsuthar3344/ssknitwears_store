
import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    shipping_address: {
        name: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zip: string;
    };
    items: {
        id: number;
        product: {
            name: string;
            image: string;
        };
        quantity: number;
        price: number;
    }[];
}

const SellerOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/seller/orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: number, status: string) => {
        try {
            const response = await fetch(`/api/seller/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                toast.success(`Order marked as ${status}`);
                fetchOrders();
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Failed to update status:', error);
            toast.error('Failed to update status');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                <p className="text-sm text-gray-500">Manage your customer orders</p>
            </div>

            <div className="space-y-4">
                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                        No orders found.
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg font-semibold text-gray-900">Order #{order.id}</span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(order.created_at).toLocaleDateString()} • {order.user.name}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => updateStatus(order.id, 'processing')}
                                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Accept Order
                                        </button>
                                    )}
                                    {order.status === 'processing' && (
                                        <button
                                            onClick={() => updateStatus(order.id, 'shipped')}
                                            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                                        >
                                            <Package className="w-4 h-4 mr-2" />
                                            Mark Shipped
                                        </button>
                                    )}
                                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                                        <button
                                            onClick={() => updateStatus(order.id, 'cancelled')}
                                            className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50/50">
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    {/* Fallback image if item.product.image is actually an object or invalid */}
                                                    <img
                                                        src={typeof item.product.image === 'string' ? item.product.image : '/placeholder.jpg'}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">₹{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between items-center">
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p className="font-medium text-gray-900">Shipping Details:</p>
                                        <p className="font-semibold">{order.shipping_address?.name}</p>
                                        <p>{order.shipping_address?.address}, {order.shipping_address?.city}</p>
                                        <p>{order.shipping_address?.state} - {order.shipping_address?.zip}</p>
                                        <p className="text-gray-900">Phone: {order.shipping_address?.phone}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="text-xl font-bold text-gray-900">₹{order.total_amount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SellerOrders;
