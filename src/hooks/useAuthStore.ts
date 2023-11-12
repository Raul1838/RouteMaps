
export const useAuthStore = () => {


    const startRegisterWithEmailAndPassword = ({ email, password, displayName }) => {
        console.log({ email, password, displayName });
    }

    return {
        //* Propiedades

        //* Métodos
        startRegisterWithEmailAndPassword
    }

}
