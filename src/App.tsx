import './App.css';
import {AppRouter} from "./router/AppRouter.tsx";
import {AuthProvider} from './context/AuthContext.tsx';
import {NavigationProvider} from "./context/NavigationContext.tsx";
import {PlacesProvider} from "./context/PlacesContext.tsx";

export const App = () => {

  return (
    <>
      <AuthProvider>
          <NavigationProvider>
              <PlacesProvider>
                    <AppRouter/>
              </PlacesProvider>
          </NavigationProvider>
      </AuthProvider>
    </>
  )
}
