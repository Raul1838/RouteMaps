import {AuthController} from "../../src/controller/AuthController";
import {UserModel} from "../../src/interfaces/UserModel";
import {AuthException, AuthExceptionMessages} from "../../src/exceptions/AuthException";

describe('Tests sobre gestión de usuarios en Firebase', () => {

    let authController: AuthController;

    beforeEach(() => authController = AuthController.authController)

    test('HU01 - E1 - registro exitoso', () => {

        const testUser = {
            email: 'usuario.prueba@test.com',
            password: '123456789',
            displayName: 'Usuario Prueba'
        }

        const user: UserModel = authController.registerUserWithEmailAndPassword( testUser );

        expect(user).toBeTruthy();
        expect(user.email).toBe(testUser.email);
        expect(user.displayName).toBe(testUser.displayName);
    });

    test('HU01 - E3 - registro fallido con email inválido', () => {

        const testUser = {
            email: 'usuario.pruebatest.com',
            password: '123456789',
            displayName: 'Usuario Prueba'
        }

        try {
            authController.registerUserWithEmailAndPassword( testUser );
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(error.message).toBe(AuthExceptionMessages.InvalidRegister);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }

    });

    test('HU02 - E1 - Login exitoso', () => {

        const testUser = {
            email: 'usuario.prueba@test.com',
            password: '123456789',
        }

        const user: UserModel = authController.loginWithEmailAndPassword( testUser );

        expect(user).toBeTruthy();
        expect(user.email).toBe(testUser.email);
        expect(user.displayName).toBeTruthy();
        expect(user.uid).toBeTruthy();
    });

    test('HU02 - E3 - Login fallido con contraseña inválida', () => {

        const testUser = {
            email: 'usuario.prueba@test.com',
            password: '123456789',
        }

        try {
            authController.loginWithEmailAndPassword( testUser );
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(error.message).toBe(AuthExceptionMessages.InvalidLogin);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });


});
