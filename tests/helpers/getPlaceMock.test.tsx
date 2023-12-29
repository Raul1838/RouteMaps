
import { getPlace } from '../../src/helpers/getPlace';


jest.mock('../../src/helpers/getPlace', () => ({
    getPlace: jest.fn(() => ({
        Nombre: "",
        Longitud: 0,
        Latitud: 0,
        Favorito: false
    }))
}));


describe('Prueba si se puede hacer un mock de getPlace, que es el método que se comunica con open route', () => { 

    test('getPlace debe devolver { Nombre: "", Longitud: 0, Latitud: 0, Favorito: false}', () => { 
        
        const place = getPlace({lon: 0, lat: 0});

        expect( place ).toEqual({
            Nombre: "",
            Longitud: 0,
            Latitud: 0,
            Favorito: false
        });

    });
    
});
