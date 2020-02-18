import { Model } from '../src/slider/Model';

describe('Model', () => {
  describe('Update value one', () => {
    test('When method updateValueOne is called with an argument 5, valueOne in state became 5', () => {
      const model = new Model();
      model.updateValueOne(5);
      expect(model.state.valueOne).toBe(5);
    });
  });

  describe('Update value two', () => {
    test('When method updateValueOne is called with an argument "Prince of Persia", valueTwo in state became "Prince of Persia"', () => {
      const model = new Model();
      model.updateValueTwo('Prince of Persia');
      expect(model.state.valueTwo).toBe('Prince of Persia');
    });
  });
})