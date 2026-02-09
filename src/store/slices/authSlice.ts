import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
}

// Check localStorage for existing session
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

// Safe parse user
let parsedUser = null;
if (storedUser && storedUser !== 'undefined') {
    try {
        parsedUser = JSON.parse(storedUser);
    } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user');
    }
}

const initialState: AuthState = {
    user: parsedUser,
    isAuthenticated: !!storedToken,
    token: storedToken,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        // For temporary "guest" or "mock" login until backend is ready
        mockLogin: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.token = 'mock-token-' + Date.now();
            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('token', state.token);
        },
    },
});

export const { loginSuccess, logout, mockLogin } = authSlice.actions;
export default authSlice.reducer;
