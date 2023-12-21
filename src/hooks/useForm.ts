import React, {useEffect, useState} from 'react';

export interface FormState {
    [key: string]: any;
}

export const useForm = ( initialForm: FormState = {} ) => {

    const [formState, setFormState] = useState<FormState>( initialForm );

    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])


    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onResetForm = () => {
        setFormState( initialForm );
    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }

}
