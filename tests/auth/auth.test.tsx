import {AuthController, getAuthController} from "../../src/controller/AuthController";
import {UserModel} from "../../src/interfaces/UserModel";
import {AuthException, AuthExceptionMessages} from "../../src/exceptions/AuthException";

describe('Tests sobre gestión de usuarios en Firebase', () => {

    let authController: AuthController;

    beforeEach(() => authController = getAuthController());


    test('HU02 - E1 - Login exitoso', async () => {

        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }

        const user: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);

        expect(user).toBeTruthy();
        expect(user.email).toBe(testUser.email);
        expect(user.displayName).toBeTruthy();
        expect(user.uid).toBeTruthy();
    });

    test('HU02 - E3 - Login fallido con contraseña inválida', async () => {

        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123',
        }

        try {
            await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(error.message).toBe(AuthExceptionMessages.InvalidLogin);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU04 - E1 - borrado exitoso', () => {

        const testUser = {
            email: 'usuario.prueba@test.com',
            password: '123456789',
        }

        authController.loginWithEmailAndPassword( testUser.email, testUser.password );
        authController.deleteUser();

    });

    test('HU04 - E2 - borrado fallido con email inválido', () => {

        try {
            authController.deleteUser();
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(error.message).toBe(AuthExceptionMessages.InvalidDelete);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }

    });

});
