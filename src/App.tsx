import './App.css';
import { RegisterPage } from './auth/pages/RegisterPage';
import { Buscador } from './components/Buscador';
import { RoutesMap } from './components/Map';


export const App = () => {

    return (
    <>
      <div className="row d-flex">
        <div className="col-4 d-flex flex-column justify-content-center"  style={{ height: '100vh'}}>
          <Buscador />
        </div>
        <div className="col-8">
          <RoutesMap />
        </div>
      </div>
      {/* <RegisterPage /> */}
    </>
  )
}
