
import { getCoordenates } from '../../src/helpers/getCoordenates';


jest.mock('../../src/helpers/getCoordenates', () => ({
    getCoordenates: jest.fn(() => [0, 0])
}));


describe('Prueba si se puede hacer un mock de getCoordenates, que es el método que se comunica con open route', () => { 

    test('getCoordenates debe devolver [0, 0]', () => { 
        
        // console.log(getCoordenates('') );
        const coordenates = getCoordenates('');

        expect( coordenates ).toEqual([0, 0]);

    });
    
});
