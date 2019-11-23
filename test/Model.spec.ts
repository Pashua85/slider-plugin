import { Model } from '../src/Model';

describe('Model', () => {
  let model = new Model();

  it('should update value one', () => {
    model.updateValueOne(4);
    expect(model.state.valueOne).toBe(4);
  });

  it('should update value two', () => {
    model.updateValueTwo('some value');
    expect(model.state.valueTwo).toBe('some value');
  })
})