import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const favoriteSlice = createSlice({
    name: 'fav',
    initialState: {
        favAr: [],
        isOpen: false,
    },
    reducers: {
        setFavList: (state, payload) => {
            return {
                ...state,
                favAr: [...payload.payload]
            }
        },
        setIsOpenFav: (state, payload) => {
            return {
                ...state,
                isOpen: payload.payload
            }
        },
        byToFav: (state, action) => {
            const favNew = cloneDeep(state.favAr);
            const index = favNew.findIndex((obj) => obj.id === action.payload.id);
            if (index === -1) {
                return {
                    ...state,
                    favAr: [...state.favAr, { ...action.payload }]
                };
            } else {
                favNew.splice(index, 1);
                return {
                    ...state,
                    favAr: favNew
                };
            }

        },
        DeleteFav: (state, action) => {
            const favNew = cloneDeep(state.favAr);

            const index = favNew.findIndex((obj) => obj.id === action.payload);

            if (index !== -1) {
                favNew.splice(index, 1);
            }

            return {
                ...state,
                favAr: favNew
            };
        }
    }
});

export const { byToFav, DeleteFav, setFavList, setIsOpenFav } = favoriteSlice.actions;
export default favoriteSlice.reducer;
