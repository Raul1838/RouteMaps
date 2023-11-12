
import { State } from '../../src/interfaces/AuthState';
import { AuthSlice } from '../../src/store/auth/authSlice';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { store } from '../../src/store/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RegisterPage } from '../../src/auth/pages/RegisterPage';


describe('Tests sobre getión de usuarios en Firebase', () => { 

   
    test('HU01 - E1 - registro exitoso', async() => {

        const initialState: State = {
            user: {
                uid: '',
                email: '',
                displayName: ''
            }
        }

        const testUser = {
            email: 'usuario.prueba@google.com',
            password: '123456789',
            displayName: 'Usuario de Prueba'
        }

        // render(
        //     <Provider store={store}>
        //         <RegisterPage />
        //     </Provider>
        // );

        const { startRegisterWithEmailAndPassword } = useAuthStore();

        const { user } = AuthSlice.reducer( initialState, { type: undefined } );
       
        await startRegisterWithEmailAndPassword( testUser );

        expect( user ).toBeTruthy();
        expect( user.email ).toBe( testUser.email );
        expect( user.displayName ).toBe( testUser.displayName );


    });
    
});
