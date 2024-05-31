import { configureStore,combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import orderSlice from "./slice/orderSlice";
import priceSlice from "./slice/priceSlice";
import favouriteSlice from "./slice/favouriteSlice";
import selectCartSlice from "./slice/selectCartSlice";


const reducer = combineReducers({
    cart: cartSlice,
    checkout:orderSlice,
    price:priceSlice,
    favourite:favouriteSlice,
    selectCart:selectCartSlice
})
const store = configureStore({
    reducer,
}) 
export default store