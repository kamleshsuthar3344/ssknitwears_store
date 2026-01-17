import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    isMenuOpen: boolean;
    isCartOpen: boolean;
}

const initialState: UIState = {
    isMenuOpen: false,
    isCartOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const { toggleMenu, toggleCart } = uiSlice.actions;
export default uiSlice.reducer;
