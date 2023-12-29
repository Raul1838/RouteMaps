import {AuthController, getAuthController} from "../../src/controller/AuthController";
import {UserModel} from "../../src/interfaces/UserModel";
import {AuthException, AuthExceptionMessages} from "../../src/exceptions/AuthException";
import {FirebaseAuth} from "../../src/firebase/config";
import { FirebaseService } from "../../src/services/FirebaseService";


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

    beforeEach(() => jest.clearAllMocks());

    test('HU01 - E1 - registro exitoso', async () => {
        jest.spyOn(firebaseService, 'createUserWithEmailAndPassword').mockResolvedValue({
            uid: 'mockUid',
            email: testUser.email,
            displayName: testUser.displayName
        })

        let user: UserModel = await authController.registerUserWithEmailAndPassword(testUser.email, testUser.password, testUser.displayName);
        expect(user).toBeTruthy();
        expect(user.email).toBe(testUser.email);
        expect(user.displayName).toBe(testUser.displayName);
    });

    test('HU01 - E3 - registro fallido con email inválido', async () => {
        jest.spyOn(firebaseService, 'createUserWithEmailAndPassword').mockRejectedValue(new AuthException(AuthExceptionMessages.InvalidRegister));
        
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
        
        jest.spyOn(firebaseService, 'startLoginWithEmailAndPassword').mockResolvedValue({
            uid: 'mockUid',
            email: testUser.email,
            displayName: "testuser"
        })

        const user: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);

        expect(firebaseService.startLoginWithEmailAndPassword).toHaveBeenCalledWith(testUser.email, testUser.password);
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

        jest.spyOn(firebaseService, 'startLoginWithEmailAndPassword').mockRejectedValue(new AuthException(AuthExceptionMessages.InvalidLogin));

        try {
            await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(firebaseService.startLoginWithEmailAndPassword).toHaveBeenCalledTimes(0);
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

        jest.spyOn(firebaseService, 'startLoginWithEmailAndPassword').mockResolvedValue({
            uid: 'mockUid',
            email: testUser.email,
            displayName: ""
        })
        jest.spyOn(firebaseService, 'startLogout').mockResolvedValue();

        await authController.loginWithEmailAndPassword( testUser.email, testUser.password);
        await authController.logout();

        expect(firebaseService.startLogout).toHaveBeenCalled();
    });

    test('HU03 - E2 - no se ha iniciado sesión', async () => {
        jest.spyOn(firebaseService, 'startLogout').mockRejectedValue(new AuthException(AuthExceptionMessages.InvalidLogout));

        try {
            await authController.logout();
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(firebaseService.startLogout).toHaveBeenCalledTimes(1);
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

        jest.spyOn(firebaseService, 'startLoginWithEmailAndPassword').mockResolvedValue({
            uid: 'mockUid',
            email: testUser.email,
            displayName: ""
        });
        jest.spyOn(firebaseService, 'startDeletingUser').mockResolvedValue();

        await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await authController.deleteUser();

        expect(firebaseService.startDeletingUser).toHaveBeenCalled();
    });

    test('HU04 - E2 - borrado fallido con email inválido', async () => {
        jest.spyOn(firebaseService, 'startDeletingUser').mockRejectedValue(new AuthException(AuthExceptionMessages.InvalidDelete));

        try {
            await authController.deleteUser();
            throw new Error();
        } catch (error) {
            if (error instanceof AuthException) {
                expect(firebaseService.startDeletingUser).toHaveBeenCalledTimes(1);
                expect(error.message).toBe(AuthExceptionMessages.InvalidDelete);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });
});
