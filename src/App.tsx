import './App.css';
import {HomeContext} from './Home.tsx';
import {AuthContext, AuthProvider} from './context/AuthContext.tsx';
import {AppRouter} from "./router/AppRouter.tsx";
import {useContext} from "react";


export const App = () => {

  const homeContext = useContext(HomeContext);
  const authContext = useContext(AuthContext);

  return (
    <>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </>
  )
}
