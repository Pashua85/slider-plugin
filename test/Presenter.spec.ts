import { Presenter } from '../src/Presenter';
import { Model } from '../src/Model';

describe('Presenter', () => {
  it('should set up value one in model on initialisation', () => {
    let config = { valueOne: 17 };
    let model = new Model();
    let presenter = new Presenter(model, config);
    expect(model.state.valueOne).toBe(17); 
  }); 
})