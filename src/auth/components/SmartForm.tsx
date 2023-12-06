import {useForm} from '../../hooks/useForm.ts'
import React, {SyntheticEvent, useState} from "react";
import {Link} from "react-router-dom";
import {FormProps} from "../../interfaces/FormProps.ts";


export const SmartForm: React.FC<FormProps> = ({ formData, formFields, additionalFormLink,
                                               onSubmit, submitButtonLabel}) => {
    const { formState, onInputChange } = useForm( formData );
    const [dirty, setDirty] = useState(false);

    const handleOnSubmit = ( event: SyntheticEvent ) => {
        event.preventDefault();
        setDirty(true);
        if (formState.password.length < 6) return;
        onSubmit(formState);
    }

    return(
        <>
            <form onSubmit={ handleOnSubmit }>
                {formFields.map((field) => (
                    <div className="form-group" key={field.id}>
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
                            field.id === 'password' && formState[field.id].length < 6 && dirty ? <small className="text-danger">Debe tener al menos 6 carácteres</small> : null
                        }
                    </div>
                ))}
                <div className="row" style={{ marginTop: 20 }}>
                    <button type="submit" className="btn btn-primary col-6">{ submitButtonLabel }</button>
                    {
                        additionalFormLink &&  <p className="col-6">{ additionalFormLink.name }<Link to={ additionalFormLink.url }>{ additionalFormLink.clickable }</Link></p>
                    }
                </div>

            </form>
        </>
    )
}
