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
        toggleAbout: (state) => {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { showAbout, hideAbout, toggleAbout } = aboutSlice.actions;
export default aboutSlice.reducer;
