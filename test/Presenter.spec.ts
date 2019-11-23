import { Presenter } from '../src/Presenter';
import { Model } from '../src/Model';

describe('Presenter', () => {
  
  let config = { valueOne: 17, valueTwo: 45, isVertical: false };
  let model = new Model();
  let presenter = new Presenter(model, config);

  it('should set up value one in model on initialisation', () => {
    expect(model.state.valueOne).toBe(17); 
    expect(model.state.valueTwo).toBe(45);
  }); 
})