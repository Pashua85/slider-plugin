import { View } from '../src/View';

describe('View', () => {
  it('should return a test result', () => {
    let view = new View();
    let result = view.testMethod();
    expect(result).toBe('test result');
  })
});