import { Model } from '../src/slider/Model';

describe('Model', () => {
  let model = new Model();

  it('should update value one', () => {
    model.updateValueOne(4);
    expect(model.state.valueOne).toBe(4);
  });

  it('should update value two', () => {
    model.updateValueTwo(5);
    expect(model.state.valueTwo).toBe(5);
  });
})