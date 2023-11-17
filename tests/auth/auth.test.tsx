import {AuthController} from "../../src/controller/AuthController";
import {UserModel} from "../../src/interfaces/UserModel";
import {AuthException, AuthExceptionMessages} from "../../src/exceptions/AuthException";

describe('Tests sobre gestión de usuarios en Firebase', () => {

    let authController: AuthController;

    beforeEach(() => authController = AuthController.authController)

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
