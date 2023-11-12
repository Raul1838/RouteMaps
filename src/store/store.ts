import { configureStore } from '@reduxjs/toolkit';
import { mapSlice } from './map/map.slice';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AuthSlice } from './auth/authSlice';

export const store: ToolkitStore = configureStore({
    reducer: {
        map: mapSlice.reducer,
        auth: AuthSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;