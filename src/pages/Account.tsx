import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/account/Dashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, mockLogin } from '../store/slices/authSlice';
import api from '../services/api';

export default function Account() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.auth);

    const from = location.state?.from?.pathname || '/account';

    useEffect(() => {
        if (isAuthenticated && from !== '/account') {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginSuccessMessage, setLoginSuccessMessage] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [regError, setRegError] = useState('');
    const [regSuccess, setRegSuccessState] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotMessage, setForgotMessage] = useState('');
    const [forgotError, setForgotError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setLoginSuccessMessage('');

        if (!loginEmail || !loginPassword) {
            setLoginError('Please fill in all fields.');
            return;
        }

        try {
            const response = await api.post('/login', {
                email: loginEmail,
                password: loginPassword
            });

            dispatch(loginSuccess({
                user: response.data.user,
                token: response.data.token
            }));

            setLoginSuccessMessage('Login successful! Redirecting...');

            setTimeout(() => {
                if (from && from !== '/account') {
                    navigate(from, { replace: true });
                }
            }, 1000);

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setLoginError('Invalid email or password.');
            } else {
                setLoginError('Login failed. Please try again.');
            }
            console.error('Login error:', error);
        }
    };

    const [regMobile, setRegMobile] = useState(''); // Added state

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegError('');
        setRegSuccessState('');

        if (!firstName || !lastName || !regEmail || !regMobile || !regPassword || !confirmPassword) {
            setRegError('Please fill in all fields.');
            return;
        }

        if (regPassword !== confirmPassword) {
            setRegError('Passwords do not match.');
            return;
        }

        if (!agreeTerms) {
            setRegError('You must agree to the Terms & Conditions and Privacy Policy.');
            return;
        }

        try {
            const response = await api.post('/register', {
                name: `${firstName} ${lastName}`,
                email: regEmail,
                mobile: regMobile, // Sending mobile to API
                password: regPassword,
                password_confirmation: confirmPassword
            });

            dispatch(loginSuccess({
                user: response.data.user,
                token: response.data.token
            }));

            setRegSuccessState('Account created successfully!');

            setTimeout(() => {
                if (from && from !== '/account') {
                    navigate(from, { replace: true });
                }
            }, 1500);

        } catch (error: any) {
            console.error('Register error full object:', error);
            if (error.response) {
                if (error.response.data && error.response.data.errors) {
                    const firstField = Object.keys(error.response.data.errors)[0];
                    const firstErrorMsg = error.response.data.errors[firstField][0];
                    setRegError(`${firstField}: ${firstErrorMsg}`);
                }
                else if (error.response.data && error.response.data.message) {
                    setRegError(error.response.data.message);
                } else {
                    setRegError(`Registration failed: ${error.response.statusText} (${error.response.status})`);
                }
            } else if (error.request) {
                setRegError('No response from server. Check internet connection.');
            } else {
                setRegError(`Registration Error: ${error.message}`);
            }
        }
    };

    const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setForgotError('');
        setForgotMessage('');

        try {
            if (forgotStep === 1) {
                if (!forgotEmail) {
                    setForgotError('Please enter your email or mobile.');
                    return;
                }
                await api.post('/forgot-password', { email: forgotEmail });
                setForgotMessage('OTP sent to your email (Check console/logs).');
                setForgotStep(2);
            }
            else if (forgotStep === 2) {
                if (!otp) {
                    setForgotError('Please enter the OTP.');
                    return;
                }
                await api.post('/verify-otp', { email: forgotEmail, otp });
                setForgotMessage('OTP Verified. Please set a new password.');
                setForgotStep(3);
            }
            else if (forgotStep === 3) {
                if (!newPassword || !newConfirmPassword) {
                    setForgotError('Please fill in required fields.');
                    return;
                }
                if (newPassword !== newConfirmPassword) {
                    setForgotError('Passwords do not match.');
                    return;
                }
                const response = await api.post('/reset-password', {
                    email: forgotEmail,
                    otp,
                    password: newPassword,
                    password_confirmation: newConfirmPassword
                });
                setForgotMessage(response.data.message);

                // Reset flow after success
                setTimeout(() => {
                    setIsForgotPassword(false);
                    setForgotStep(1);
                    setForgotEmail('');
                    setOtp('');
                    setNewPassword('');
                    setNewConfirmPassword('');
                }, 2000);
            }

        } catch (error: any) {
            console.error("Forgot password error", error);
            if (error.response && error.response.data && error.response.data.message) {
                setForgotError(error.response.data.message);
            } else {
                setForgotError('An error occurred. Please try again.');
            }
        }
    };

    if (isAuthenticated) {
        return (
            <Layout>
                <Dashboard />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-serif font-bold text-gray-900">
                            {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Create Account')}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isForgotPassword ? 'Enter your email to receive instructions' : (isLogin ? 'Sign in to access your account' : 'Join us for exclusive offers')}
                        </p>
                    </div>

                    {!isForgotPassword ? (
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
                    ) : (
                        <button
                            onClick={() => setIsForgotPassword(false)}
                            className="text-sm text-gray-500 hover:text-black flex items-center gap-2 mx-auto"
                        >
                            &larr; Back to Login
                        </button>
                    )}

                    <AnimatePresence mode="wait">
                        {isForgotPassword ? (
                            <motion.form
                                key="forgot"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                                onSubmit={handleForgotPassword}
                            >
                                {forgotError && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{forgotError}</div>}
                                {forgotMessage && <div className="text-green-500 text-sm text-center bg-green-50 p-2 rounded">{forgotMessage}</div>}

                                {forgotStep === 1 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email Address or Mobile Number</label>
                                        <input
                                            type="text"
                                            required
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                                            placeholder="Enter your registered email or mobile"
                                        />
                                        <button
                                            type="submit"
                                            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-black hover:bg-brand-gold hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
                                        >
                                            Send OTP
                                        </button>
                                    </div>
                                )}

                                {forgotStep === 2 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                                        <input
                                            type="text"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                                            placeholder="Enter 6-digit OTP"
                                        />
                                        <button
                                            type="submit"
                                            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-black hover:bg-brand-gold hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
                                        >
                                            Verify OTP
                                        </button>
                                    </div>
                                )}

                                {forgotStep === 3 && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                                            <div className="relative mt-1">
                                                <input
                                                    type={showResetPassword ? 'text' : 'password'}
                                                    required
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                    placeholder="Enter new password"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                                    onClick={() => setShowResetPassword(!showResetPassword)}
                                                >
                                                    {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                            <div className="relative mt-1">
                                                <input
                                                    type={showResetConfirmPassword ? 'text' : 'password'}
                                                    required
                                                    value={newConfirmPassword}
                                                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                    placeholder="Confirm new password"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                                    onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                                                >
                                                    {showResetConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="mt-2 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-black hover:bg-brand-gold hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                )}
                            </motion.form>
                        ) : isLogin ? (
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                                onSubmit={handleLogin}
                            >
                                {loginError && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{loginError}</div>}
                                {loginSuccessMessage && <div className="text-green-500 text-sm text-center bg-green-50 p-2 rounded">{loginSuccessMessage}</div>}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative mt-1">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <button
                                            type="button"
                                            onClick={() => setIsForgotPassword(true)}
                                            className="font-medium text-black hover:text-gray-600"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-black hover:bg-brand-gold hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
                                >
                                    Login
                                </button>

                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <p className="text-center text-xs text-gray-400 mb-2">Partner Access</p>
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/seller/login')}
                                            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium hover:bg-gray-200"
                                        >
                                            Seller Portal
                                        </button>
                                        {/* Admin link hidden for general users, or kept discreet */}
                                        {/* <button onClick={() => navigate('/admin/login')} ...>Admin</button> */}
                                    </div>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="register"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                                onSubmit={handleRegister}
                            >
                                {regError && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{regError}</div>}
                                {regSuccess && <div className="text-green-500 text-sm text-center bg-green-50 p-2 rounded">{regSuccess}</div>}

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={regMobile}
                                        onChange={(e) => setRegMobile(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative mt-1">
                                        <input
                                            type={showRegPassword ? 'text' : 'password'}
                                            required
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowRegPassword(!showRegPassword)}
                                        >
                                            {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <div className="relative mt-1">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-medium text-gray-700">
                                            I agree to the Terms & Conditions and Privacy Policy
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                                >
                                    Register
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}
