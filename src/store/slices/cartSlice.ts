import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: number;
    name: string;
    price: string; // e.g., "₹715.00"
    image: string;
    category: string;
    quantity: number;
    variantId?: number;
    selectedSize?: string;
    selectedColor?: string;
}

interface CartState {
    items: CartItem[];
    totalAmount: number;
}

// Helper to parse price string to number
const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
};

const loadState = (): CartState => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return { items: [], totalAmount: 0 };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { items: [], totalAmount: 0 };
    }
};

const initialState: CartState = loadState();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalAmount = state.items.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalAmount = state.items.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                if (action.payload.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== action.payload.id);
                } else {
                    item.quantity = action.payload.quantity;
                }
            }
            state.totalAmount = state.items.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
