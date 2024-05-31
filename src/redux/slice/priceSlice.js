import { createSlice } from "@reduxjs/toolkit";
import { conversionPrice } from "../../api/data";

const priceSlice = createSlice({
    name: 'price',
    initialState: {
        priceAr: conversionPrice[0],
    },
    reducers: {
        setPrice: (state, payload) => {
            return {
                priceAr:payload.payload,
            }
        },
    }
});

export const { setPrice } = priceSlice.actions;
export default priceSlice.reducer;
