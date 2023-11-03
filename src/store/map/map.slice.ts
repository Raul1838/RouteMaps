import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        toponim: '',
        coordinates: [], 
    },
    reducers: {
        searchNewPlace( state, { payload } ) {
            state.toponim = payload.toponim;
            state.coordinates = payload.coordinates;
        }
    }
});


// Action creators are generated for each case reducer function
export const { searchNewPlace } = mapSlice.actions;
