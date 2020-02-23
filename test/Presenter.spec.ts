import { Presenter } from '../src/slider/Presenter';
import { View } from '../src/slider/View';
import { Model } from '../src/slider/Model';


describe('Presenter', () => {

  const container = document.createElement('div');
  container.classList.add('slider-container');
  document.body.appendChild(container);
  
  const emptyArray: string[] = [];

  beforeEach(() => {
    container.innerHTML = '';
  });

  test('first test', () => {
    const params = {
      minValue: 0,
      maxValue: 10,
      valueOne: 3,
      isVertical: false,
      step: 1,
      values: emptyArray,
      scaleStep: 1,
      isValueAlwaysShown: false,
      isValueOnHoverShown: true
    };
    const view = new View(container, params);
    const presenter = new Presenter(new Model(), view, params)
    expect(true).toBe(true);
  })
});