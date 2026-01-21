import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
    originalPrice?: string;
}

interface WishlistState {
    items: WishlistItem[];
}

const loadState = (): WishlistState => {
    try {
        const serializedState = localStorage.getItem('wishlist');
        if (serializedState === null) {
            return { items: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { items: [] };
    }
};

const initialState: WishlistState = loadState();

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const exists = state.items.some(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
                localStorage.setItem('wishlist', JSON.stringify(state));
            }
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state));
        },
        toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('wishlist', JSON.stringify(state));
        }
    },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
