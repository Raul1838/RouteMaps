import { SyntheticEvent } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";


export const RegisterPage = () => {

    const { startRegisterWithEmailAndPassword } = useAuthStore();
    const dispatch = useDispatch();
    const { displayName, email, password, onInputChange } = useForm({
      displayName: '',
      email: '',
      password: ''
    });

    const onSubmit = ( event: SyntheticEvent ) => {
        event.preventDefault();

        dispatch( startRegisterWithEmailAndPassword({ email, password, displayName }) );
    }

  return (
    <>
        <form onSubmit={ onSubmit }>
            <input className="form-control" type="text" placeholder="Username" value={ displayName } onChange={ onInputChange } />
            <input className="form-control" type="email" placeholder="email" value={ email } onChange={ onInputChange } />
            <input className="form-control" type="password" placeholder="Contraseña" value={ password } onChange={ onInputChange } />
        </form>
    </>
  )
}
