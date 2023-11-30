import {AuthController, getAuthController} from "../../src/controller/AuthController";
import {UserModel} from "../../src/interfaces/UserModel";
import {AuthException, AuthExceptionMessages} from "../../src/exceptions/AuthException";

describe('Tests sobre gestión de usuarios en Firebase', () => {

    let authController: AuthController;

    const testUser = {
        email: 'usuario.prueba@test.com',
        password: '123456789',
        displayName: 'Usuario Prueba'
    }

    beforeEach(() => authController = getAuthController() );

    test('HU01 - E1 - registro exitoso', async () => {

        let user: UserModel = await authController.registerUserWithEmailAndPassword(testUser.email, testUser.password, testUser.displayName);
        expect(user).toBeTruthy();
        expect(user.email).toBe(testUser.email);
        expect(user.displayName).toBe(testUser.displayName);
    });

    test('HU01 - E3 - registro fallido con email inválido', async () => {

        try {
            await authController.registerUserWithEmailAndPassword(testUser.email, testUser.password, testUser.displayName);
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(error.message).toBe(AuthExceptionMessages.InvalidRegister);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }

    });


});
