import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = { dateStart: '', dateEnd: '', type: '', price: 0 };

const searchSlice = createSlice({
    name: "search",
    initialState: initialSearchState,
    reducers: {
        setSearchContent(state, action) {
            state.dateStart = action.payload.dateStart
            state.dateEnd = action.payload.dateEnd;
            state.type = action.payload.type;
            state.price = action.payload.price;
        },

    },
});

export default searchSlice