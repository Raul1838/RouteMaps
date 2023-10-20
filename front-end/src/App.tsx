import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { RoutesMap } from './components/Map';
import { getCoordenates } from './helpers/getCoordenates';
import { Coords } from './interfaces/Coords';
import { RootState } from './interfaces/RootState';
import { searchNewPlace } from './store/map/map.slice';


export const App = () => {

  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { toponim, coordinates: [ longitud, latitud] } = useSelector( ( state: RootState ) => state.map );

  const onSubmit = async( event: SyntheticEvent ) => {
    
    event.preventDefault();
   
    const coordinates: Coords = await getCoordenates( inputValue );

    dispatch( searchNewPlace({ toponim: inputValue, coordinates }) );

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  return (
    <>
      <div className="row d-flex">
        <div className="col-4 d-flex flex-column justify-content-center"  style={{ height: '100vh'}}>
          <form onSubmit={ onSubmit }>
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
