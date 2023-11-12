
import { createSlice } from '@reduxjs/toolkit';
import { State } from '../../interfaces/AuthState';


const initialState: State = {
    user: {
        uid: '',
        email: '',
        displayName: ''
    }
}

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {

    }
});


// Action creators are generated for each case reducer function
export const { } = AuthSlice.actions;
