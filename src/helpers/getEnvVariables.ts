export const getEnvVariables = () => {
    return {
        ...require('dotenv').config()
    };
};