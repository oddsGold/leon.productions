import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
};

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        showAbout: (state) => {
            state.isVisible = true;
        },
        hideAbout: (state) => {
            state.isVisible = false;
        },
    },
});

export const { showAbout, hideAbout } = aboutSlice.actions;
export default aboutSlice.reducer;
