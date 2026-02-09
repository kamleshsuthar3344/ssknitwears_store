import { useState } from 'react';
import Layout from '../../components/layout/Layout'; // Adjust path if needed, assuming distinct folder structure
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/authSlice';
import api from '../../services/api';
import { toast } from 'sonner';

export default function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // New for register
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const endpoint = isLogin ? '/admin/login' : '/admin/register';
        const payload = isLogin ? { email, password } : { email, password, name };

        try {
            const response = await api.post(endpoint, payload);
            dispatch(loginSuccess({
                user: response.data.user,
                token: response.data.token
            }));
            toast.success(`Welcome ${isLogin ? 'back' : ''}, Admin!`);
            navigate('/admin/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Access Denied');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                    <div className="text-center">
                        <h2 className="text-3xl font-serif font-bold text-white">
                            {isLogin ? 'Admin Console' : 'Initialize Admin'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Restricted Access Only
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleAuth}>
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Admin Name</label>
                                <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email Address</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                />
                                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={() => toast.info('This page coming soon')}
                                className="text-sm text-red-400 hover:text-red-300"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Secure Login' : 'Create Admin Account')}
                        </button>
                    </form>

                    <div className="text-center">
                        <button onClick={() => setIsLogin(!isLogin)} className="text-xs text-gray-500 hover:text-gray-300 underline">
                            {isLogin ? 'Initialize First Admin' : 'Back to Login'}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
