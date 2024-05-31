import { createSlice } from "@reduxjs/toolkit";

const selectCartSlice = createSlice({
    name: 'selectOptionCart',
    initialState: {
        cartId: null,
        isOpen: false,
    },
    reducers: {

        setIsOpenSelectOptions: (state, payload) => {
            return {
                ...state,
                cartId: payload.payload.id,
                isOpen: payload.payload.isOpen
            }
        },
    }
});

export const { setIsOpenSelectOptions } = selectCartSlice.actions;
export default selectCartSlice.reducer;
