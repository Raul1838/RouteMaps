import { configureStore } from '@reduxjs/toolkit';
import { mapSlice } from './map/map.slice';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export const store: ToolkitStore = configureStore({
    reducer: {
        map: mapSlice.reducer,
    },
});
