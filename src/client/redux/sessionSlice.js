import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartProducts: [],
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        addTotalToSession: (state, action) => {
            console.log("Action Payload", action.payload);
        }
    }
})

export const { addTotalToSession } = sessionSlice.actions;
export default sessionSlice.reducer;