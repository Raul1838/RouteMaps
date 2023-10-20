import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { openRouteApi } from './api/openRouteApi';
import { RoutesMap } from './components/Map';
import { getEnvVariables } from './helpers/getEnvVariables';
import { RootState } from './interfaces/RootState';
import { searchNewPlace } from './store/map/map.slice';


const { VITE_ROUTES_API_KEY } = getEnvVariables();

export const App = () => {

  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { toponim, coordinates: [ longitud, latitud] } = useSelector( ( state: RootState ) => state.map );

  const getCoordenates = async( event: SyntheticEvent ) => {
    
    event.preventDefault();
   
    const { data } = await openRouteApi.get('/geocode/search', {
      params: {
        api_key: VITE_ROUTES_API_KEY,
        text: inputValue,
      }
    });

    const { geometry } = data.features[0];

    // console.log({ geometry });

    const { coordinates } = geometry;

    const [ nuevaLongitud, nuevaLatitud ] = coordinates; //? Las cojo al revés porque vienen en el sistema inglés

    // console.log({ nuevaLongitud, nuevaLatitud });

    dispatch( searchNewPlace({ toponim: inputValue, coordinates: [ nuevaLongitud, nuevaLatitud ] }) ); //? Aquí vuelven a ser ingleses

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  return (
    <>
      <div className="row d-flex">
        <div className="col-4 d-flex flex-column justify-content-center"  style={{ height: '100vh'}}>
          <form onSubmit={ getCoordenates }>
            <div className="input-group">
              <input 
                  type="text" 
                  className='form-control' 
                  placeholder='Inserte topónimo' 
                  value={inputValue} 
                  onChange={handleInputChange}
                />
              <button className='btn btn-primary'>
                Buscar
              </button>
            </div>
          </form>
          <ul className='list-group mt-3'>
            <li className='list-group-item'><b>Toponimo</b> - { toponim }</li>
            <li className='list-group-item'><b>Latitud</b> - { latitud }</li>
            <li className='list-group-item'><b>Longitud</b> - { longitud }</li>            
          </ul>
        </div>
        <div className="col-8">
          <RoutesMap />
        </div>
      </div>
    </>
  )
}
