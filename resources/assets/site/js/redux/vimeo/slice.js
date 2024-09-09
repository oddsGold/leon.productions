import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    initialized: false,
};

const vimeoSlice = createSlice({
    name: 'vimeo',
    initialState,
    reducers: {
        setInitialized: (state) => {
            state.initialized = true;
        }
    },
});

export const { setInitialized } = vimeoSlice.actions;

export default vimeoSlice.reducer;
