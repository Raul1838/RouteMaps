import {AuthController, getAuthController} from "../../src/controller/AuthController";
import {AuthException, AuthExceptionMessages} from "../../src/exceptions/AuthException";

describe('Tests sobre gestión de usuarios en Firebase', () => {

    let authController: AuthController;

    beforeEach(() => authController = getAuthController());


    test('HU03 - E1 - logout exitoso', () => {

        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }

        authController.loginWithEmailAndPassword( testUser.email, testUser.password);

        authController.logout();

    });

    test('HU03 - E2 - no se ha iniciado sesión', async () => {

        try {
            await authController.logout();
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
