import { Model } from '../src/Model';

describe('Model', () => {
  let model = new Model();

  it('should update value one', () => {
    model.updateValueOne(4);
    expect(model.state.valueOne).toBe(4);
  });
})