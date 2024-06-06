import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartAr: [],
        isOpen: false,
        total: 0,
        qty: 0
    },
    reducers: {

        setIsOpenCart: (state, payload) => {
            return {
                ...state,
                isOpen: payload.payload
            }
        },
        setToTalCart: (state, action) => {
            return {
                ...state,
                total: action.payload.amount,
                qty: action.payload.qty
            }
        }

    }
});

export const { setIsOpenCart, setToTalCart } = cartSlice.actions;
export default cartSlice.reducer;
