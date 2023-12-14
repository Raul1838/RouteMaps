import {AuthController, getAuthController} from "../../src/controller/AuthController";
import {UserModel} from "../../src/interfaces/UserModel";
import {AuthException, AuthExceptionMessages} from "../../src/exceptions/AuthException";
import {FirebaseAuth} from "../../src/firebase/config";
import { FirebaseService } from "../../src/firebase/FirebaseService";


describe('Tests sobre gestión de usuarios en Firebase', () => {

    let authController: AuthController;
    let firebaseService: FirebaseService

    const testUser = {
        email: 'usuario.prueba@test.com',
        password: '123456789',
        displayName: 'Usuario Prueba'
    }

    beforeAll(() => {
        firebaseService = new FirebaseService();        
        authController = getAuthController(firebaseService)
    });

    beforeEach(() => {
        firebaseService.createUserWithEmailAndPassword = ((email: string, password: string, displayName: string) => {
            return Promise.resolve({
                uid: 'mockUid',
                email,
                displayName
            });
        });

        firebaseService.startLoginWithEmailAndPassword = ((email: string, password: string) => {
            return Promise.resolve({
                uid: 'mockUid',
                email,
                displayName: 'mockDisplayName'
              });
        });

        firebaseService.startLogout = (() => {
            return Promise.resolve();
        });
        firebaseService.startDeletingUser = (() => {
            return Promise.resolve();
        });
    });

    test('HU01 - E1 - registro exitoso', async () => {        
        let user: UserModel = await authController.registerUserWithEmailAndPassword(testUser.email, testUser.password, testUser.displayName);
        expect(user).toBeTruthy();
        expect(user.email).toBe(testUser.email);
        expect(user.displayName).toBe(testUser.displayName);
    });

    test('HU01 - E3 - registro fallido con email inválido', async () => {
        firebaseService.createUserWithEmailAndPassword = ((email: string, password: string, displayName: string) => {
            throw new AuthException(AuthExceptionMessages.InvalidRegister);
        });
        
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
        firebaseService.startLoginWithEmailAndPassword = ((email: string, password: string) => {
            throw new AuthException(AuthExceptionMessages.InvalidLogin);
        });

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

    test('HU03 - E1 - logout exitoso', async () => {
        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }

        await authController.loginWithEmailAndPassword( testUser.email, testUser.password);
        await authController.logout();
    });

    test('HU03 - E2 - no se ha iniciado sesión', async () => {
        firebaseService.startLogout = (() => {
            throw new AuthException(AuthExceptionMessages.InvalidLogout);
        });

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

    test('HU04 - E1 - borrado exitoso', async () => {
        const testUser = {
            email: 'usuario.prueba@test.com',
            password: '123456789',
        }

        await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await authController.deleteUser();

    });

    test('HU04 - E2 - borrado fallido con email inválido', async () => {
        firebaseService.startDeletingUser = (() => {
            throw new AuthException(AuthExceptionMessages.InvalidDelete);
        });

        try {
            await authController.deleteUser();
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
