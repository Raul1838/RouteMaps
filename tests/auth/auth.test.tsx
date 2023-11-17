import {AuthController} from "../../src/controller/AuthController";
import {AuthException, AuthExceptionMessages} from "../../src/exceptions/AuthException";

describe('Tests sobre gestión de usuarios en Firebase', () => {

    let authController: AuthController;

    beforeEach(() => authController = AuthController.authController)


    test('HU03 - E1 - logout exitoso', () => {

        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }

        authController.loginWithEmailAndPassword( testUser.email, testUser.password);

        authController.logout();

    });

    test('HU03 - E2 - registro fallido con email inválido', () => {

        try {
            authController.logout();
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(error.message).toBe(AuthExceptionMessages.InvalidLogout);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }

    });


});
