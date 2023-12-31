import './App.css';
import {AppRouter} from "./router/AppRouter.tsx";
import {AuthProvider} from './context/AuthContext.tsx';
import {NavigationProvider} from "./context/NavigationContext.tsx";

export const App = () => {

  return (
    <>
      <AuthProvider>
          <NavigationProvider>
              <AppRouter/>
          </NavigationProvider>
      </AuthProvider>
    </>
  )
}
