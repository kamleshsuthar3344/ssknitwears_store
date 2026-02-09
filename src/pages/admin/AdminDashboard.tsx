import { useEffect, useState } from 'react';

interface Stats {
    total_users: number;
    total_orders: number;
    total_revenue: number;
    pending_orders: number;
    active_sellers: number;
    total_products: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Admin Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <StatsCard
                    title="Total Revenue"
                    value={`₹${stats?.total_revenue.toLocaleString()}`}
                    subtitle="from completed orders"
                    icon="💰"
                />
                <StatsCard
                    title="Total Orders"
                    value={stats?.total_orders.toLocaleString() || '0'}
                    subtitle={`${stats?.pending_orders} pending`}
                    icon="📦"
                />
                <StatsCard
                    title="Active Users"
                    value={stats?.total_users.toLocaleString() || '0'}
                    subtitle={`${stats?.active_sellers} registered sellers`}
                    icon="👥"
                />
                <StatsCard
                    title="Total Products"
                    value={stats?.total_products.toLocaleString() || '0'}
                    subtitle="across all categories"
                    icon="🏷️"
                />
            </div>
        </div>
    );
}

function StatsCard({ title, value, subtitle, icon }: { title: string; value: string; subtitle: string; icon: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
                    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
                </div>
                <div className="text-2xl p-3 bg-gray-50 rounded-xl">{icon}</div>
            </div>
        </div>
    );
}
