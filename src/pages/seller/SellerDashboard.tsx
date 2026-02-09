import { useEffect, useState } from 'react';

interface SellerStats {
    total_products: number;
    total_sales: number;
    total_orders: number;
}

export default function SellerDashboard() {
    const [stats, setStats] = useState<SellerStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/seller/stats', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch seller stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Mobile-friendly stats */}
                <div className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-2xl shadow-sm border border-orange-100">
                    <h3 className="text-orange-600 text-xs font-bold uppercase tracking-wider">Sales</h3>
                    <p className="text-2xl font-black mt-1">₹{stats?.total_sales.toLocaleString() || '0'}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-2xl shadow-sm border border-blue-100">
                    <h3 className="text-blue-600 text-xs font-bold uppercase tracking-wider">Orders</h3>
                    <p className="text-2xl font-black mt-1">{stats?.total_orders || '0'}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-2xl shadow-sm border border-green-100 col-span-2 lg:col-span-1">
                    <h3 className="text-green-600 text-xs font-bold uppercase tracking-wider">Products</h3>
                    <p className="text-2xl font-black mt-1">{stats?.total_products || '0'}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Recent Sales</h3>
                    <button className="text-xs text-orange-600 font-bold hover:underline">View All</button>
                </div>
                <p className="text-gray-400 text-sm italic">No recent sales found for your shop.</p>
            </div>
        </div>
    );
}
