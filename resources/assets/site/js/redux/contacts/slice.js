import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
});

export default contactsSlice.reducer;
