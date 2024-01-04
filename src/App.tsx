import './App.css';
import {AppRouter} from "./router/AppRouter.tsx";
import {AuthProvider} from './context/AuthContext.tsx';
import {NavigationProvider} from "./context/NavigationContext.tsx";
import {PlacesProvider} from "./context/PlacesContext.tsx";
import {PathwayProvider} from "./context/PathwayContext.tsx";

export const App = () => {

  return (
    <>
      <AuthProvider>
          <NavigationProvider>
              <PlacesProvider>
                  <PathwayProvider>
                        <AppRouter/>
                  </PathwayProvider>
              </PlacesProvider>
          </NavigationProvider>
      </AuthProvider>
    </>
  )
}
