import {useForm} from '../hooks/useForm.ts'
import React, {SyntheticEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FormProps} from "../interfaces/FormProps.ts";

interface Errors {
    [key: string]: string | null;
}


export const SmartForm: React.FC<FormProps> = ({ formData, formFields, additionalFormLink,
                                                   onSubmit, submitButtonLabel, validations}) => {
    const { formState, onInputChange } = useForm( formData );
    const [dirty, setDirty] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        let newErrors: Errors = {};
        for (let validationsKey in validations) {
            const errorFunction = validations[validationsKey];
            const errorMessage = errorFunction(formState[validationsKey]);
            if (errorMessage) {
                newErrors = {
                    ...newErrors,
                    [validationsKey]: errorMessage
                }
            }
        }
        setErrors(newErrors);
    }, [formState]);

    const handleOnSubmit = ( event: SyntheticEvent ) => {
        event.preventDefault();
        setDirty(true);
        if (Object.keys(errors).length > 0) return;
        onSubmit(formState);
    }

    return(
        <>
            <form onSubmit={ handleOnSubmit }>
                {formFields.map((field) => (
                    <div className="form-group" key={field.id} style={{ marginBottom: '20px' }}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input
                            className="form-control"
                            id={ field.id }
                            type={ field.type }
                            name={ field.id }
                            value={ formState[field.id] }
                            onChange={ onInputChange }
                            placeholder={ field.placeholder || '' }
                            required={ true }
                        />
                        {
                            dirty && errors[field.id] ? <small className="text-danger">{ errors[field.id] }</small> : null
                        }
                    </div>
                ))}
                <div className="row d-flex align-items-center" style={{ margin: "40px 2px" }}>
                    <button type="submit" className="btn btn-primary col-6">{ submitButtonLabel }</button>
                    {
                        additionalFormLink &&
                        <p className="col-6 m-0">
                            { additionalFormLink.name }
                            <Link to={ additionalFormLink.url } className="text-nowrap" style={{ marginLeft: "10px" }}>
                                { additionalFormLink.clickable }
                            </Link>
                        </p>
                    }
                </div>

            </form>
        </>
    )
}
