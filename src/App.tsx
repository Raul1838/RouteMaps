import './App.css';
import {AppRouter} from "./router/AppRouter.tsx";
import {AuthProvider} from './context/AuthContext.tsx';

export const App = () => {

  return (
    <>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </>
  )
}
