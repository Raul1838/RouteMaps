import { FC, createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


/**
 * Clase que mantendrá la consistencia de los datos para toda la aplicación.
 * Donde se quiera utilizar uno de los datos se ha de incluir el siguiente import:
 * import { HomeContextInterface, HomeContext } from "ruta";
 * 
 * Y para empezar a usar los datos :
 
const homeContext: HomeContextInterface | undefined = useContext(HomeContext);
  if (homeContext === undefined) {
    throw new Error("Context not initialized");
  }

  - Para añadir datos que se mantendrán en la aplicación:
        - Añadir el valor y el setter en la interfaz
        - Añadir el hook useState debajo del último creado
        - Añadir como valores el valor y el setter
 */

interface HomeProps {}

export interface HomeContextInterface {
  userUID: string;
  setUserUID(userUID: string): void;
  email: string;
  setEmail(email: string): void;
}

const HomeContext = createContext<HomeContextInterface | undefined>(undefined);

const Home: FC<HomeProps> = (props) => {
  
  const [userUID, setUserUID] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  
  const value = {
    userUID,
    setUserUID,
    email,
    setEmail
  };

  useEffect(() => {
    sessionStorage.setItem("userUID", userUID);
  }, [userUID]);

  useEffect(() => {
    sessionStorage.setItem("email", email);
  }, [email]);

  return (
    <>
      <HomeContext.Provider value={value}>
          <Router>
            <Routes>
              <Route path="/" element={<></>} />
            </Routes>
          </Router>
      </HomeContext.Provider>
    </>
  );
};

export { Home, HomeContext };
