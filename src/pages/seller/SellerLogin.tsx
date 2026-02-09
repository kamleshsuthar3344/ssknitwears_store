import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/authSlice';
import api from '../../services/api';
import { toast } from 'sonner';

export default function SellerLogin() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopDesc, setShopDesc] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isForgot, setIsForgot] = useState(false); // Forgot Password Mode

    // OTP State
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/seller/login', { email, password });

            if (response.data.requires_otp) {
                setShowOtp(true);
                toast.success(response.data.message || 'OTP sent to your mobile.');
            } else if (response.data.token) {
                // Should not happen if backend enforces OTP, but good fallback
                dispatch(loginSuccess({
                    user: response.data.user,
                    token: response.data.token
                }));
                toast.success('Welcome back, Seller!');
                navigate('/seller/dashboard');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/seller/verify-otp', { email, otp });
            dispatch(loginSuccess({
                user: response.data.user,
                token: response.data.token
            }));
            toast.success('Login Successful!');
            navigate('/seller/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/seller/register', {
                name,
                email,
                password,
                password_confirmation: password,
                shop_name: shopName,
                shop_description: shopDesc
            });
            dispatch(loginSuccess({
                user: response.data.user,
                token: response.data.token
            }));
            toast.success('Seller Account Created!');
            navigate('/seller/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success('If this email exists, a reset link has been sent.');
            setIsForgot(false);
        }, 1500);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-serif font-bold text-gray-900">
                            {isForgot ? 'Reset Password' : (showOtp ? 'Verify OTP' : (isLogin ? 'Seller Portal' : 'Join as Seller'))}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isForgot ? 'Enter your email to receive instructions' : (showOtp ? 'Enter the OTP sent to your mobile' : (isLogin ? 'Manage your shop and products' : 'Start selling your products today'))}
                        </p>
                    </div>

                    {!isForgot && !showOtp && (
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Register
                            </button>
                        </div>
                    )}

                    {isForgot ? (
                        <form className="space-y-6" onSubmit={handleForgotPassword}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                            <div className="text-center">
                                <button type="button" onClick={() => setIsForgot(false)} className="text-sm text-indigo-600 hover:text-indigo-500">
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    ) : showOtp ? (
                        <form className="space-y-6" onSubmit={handleVerifyOtp}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                                <input
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border rounded-lg text-center tracking-widest text-2xl"
                                    placeholder="------"
                                    maxLength={6}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                            <div className="text-center">
                                <button type="button" onClick={() => setShowOtp(false)} className="text-sm text-indigo-600 hover:text-indigo-500">
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form className="space-y-6" onSubmit={isLogin ? handleLogin : handleRegister}>
                            {!isLogin && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                                        <input type="text" required value={shopName} onChange={e => setShopName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-lg" />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-lg" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative mt-1">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="block w-full px-3 py-2 border rounded-lg"
                                    />
                                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {isLogin && (
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => setIsForgot(true)} className="text-sm text-indigo-600 hover:text-indigo-500">
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                {loading ? 'Processing...' : (isLogin ? 'Login to Dashboard' : 'Create Seller Account')}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    );
}
