import { View } from '../src/slider/View';
import { Value } from '../src/slider/Model';

describe( 'View', () => {
  
  const container = document.createElement('div');
  container.classList.add('slider-container');
  document.body.appendChild(container);
  
  const emptyArray: string[] = [];

  beforeEach(() => {
    container.innerHTML = '';
  });

  describe('Creating elements for slider', () => {
    test('When View is created with one value in params, it should render slider with one thumb', () => {
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
      new View(container, params);
      const sliderElement = container.querySelector('.slider');
      const thumbOne = sliderElement.querySelector('.slider__thumb--one');
      const thumbTwo = sliderElement.querySelector('.slider__thumb--two');
      const intervalBar = sliderElement.querySelector('.slider__interval');

      expect(sliderElement).not.toBe(null);
      expect(thumbOne).not.toBe(null);
      expect(thumbTwo).toBe(null);
      expect(intervalBar).toBe(null);
    });

    test('When View is created with two values in params, it should render slider with two thumbs and interval bar', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 3,
        valueTwo: 7,
        isVertical: false,
        step: 1,
        values: emptyArray,
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      new View(container, params);
      const sliderElement = container.querySelector('.slider');
      const thumbOne = sliderElement.querySelector('.slider__thumb--one');
      const thumbTwo = sliderElement.querySelector('.slider__thumb--two');
      const intervalBar = sliderElement.querySelector('.slider__interval');

      expect(sliderElement).not.toBe(null);
      expect(thumbOne).not.toBe(null);
      expect(thumbTwo).not.toBe(null);
      expect(intervalBar).not.toBe(null);
    });

    test('When View is created for vertical slider, it should render slider, thumbs, labels and interval bar with "vertical" classes', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 3,
        valueTwo: 7,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      new View(container, params);
      const sliderElement = container.querySelector('.slider');
      const thumbOne = container.querySelector('.slider__thumb--one');
      const thumbTwo = container.querySelector('.slider__thumb--two');
      const labelOne = container.querySelector('.slider__thumb--one .slider__label');
      const labelTwo = container.querySelector('.slider__thumb--two .slider__label');
      const intervalBar = sliderElement.querySelector('.slider__interval');

      expect(sliderElement.classList).toContain('slider--vertical');
      expect(sliderElement.classList).not.toContain('slider--horizontal');
      expect(thumbOne.classList).toContain('slider__thumb--vertical');
      expect(thumbOne.classList).not.toContain('slider__thumb--horizontal');
      expect(thumbTwo.classList).toContain('slider__thumb--vertical');
      expect(thumbTwo.classList).not.toContain('slider__thumb--horizontal');
      expect(labelOne.classList).toContain('slider__label--vertical');
      expect(labelOne.classList).not.toContain('slider__label--horizontal');
      expect(labelTwo.classList).toContain('slider__label--vertical');
      expect(labelTwo.classList).not.toContain('slider__label--horizontal');
      expect(intervalBar.classList).toContain('slider__interval--vertical');
      expect(intervalBar.classList).not.toContain('slider__interval--horizontal');
    });

    test('When View is created for horizontal slider, it should render slider, thumbs, labels and interval bar with "horizontal" classes', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 3,
        valueTwo: 7,
        isVertical: false,
        step: 1,
        values: emptyArray,
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      new View(container, params);
      const sliderElement = container.querySelector('.slider');
      const thumbOne = container.querySelector('.slider__thumb--one');
      const thumbTwo = container.querySelector('.slider__thumb--two');
      const labelOne = container.querySelector('.slider__thumb--one .slider__label');
      const labelTwo = container.querySelector('.slider__thumb--two .slider__label');
      const intervalBar = sliderElement.querySelector('.slider__interval');

      expect(sliderElement.classList).not.toContain('slider--vertical');
      expect(sliderElement.classList).toContain('slider--horizontal');
      expect(thumbOne.classList).not.toContain('slider__thumb--vertical');
      expect(thumbOne.classList).toContain('slider__thumb--horizontal');
      expect(thumbTwo.classList).not.toContain('slider__thumb--vertical');
      expect(thumbTwo.classList).toContain('slider__thumb--horizontal');
      expect(labelOne.classList).not.toContain('slider__label--vertical');
      expect(labelOne.classList).toContain('slider__label--horizontal');
      expect(labelTwo.classList).not.toContain('slider__label--vertical');
      expect(labelTwo.classList).toContain('slider__label--horizontal');
      expect(intervalBar.classList).not.toContain('slider__interval--vertical');
      expect(intervalBar.classList).toContain('slider__interval--horizontal');
    });
  });

  describe('Setting up isWithStings property', () => {
    test('When View is created with empty array as values in params, it should set up isWithStrings property to false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 3,
        valueTwo: 7,
        isVertical: false,
        step: 1,
        values: emptyArray,
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      expect(view.isWithStrings).toBe(false);
    });

    test('When View is created with array of strings as values in params, it should set up isWithStrings property to true', () => {
      const params = {
        minValue: 1,
        maxValue: 10,
        valueOne: 'a',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      expect(view.isWithStrings).toBe(true);
    }); 
  });

  describe('Setting up range property', () => {
    test('When View is created working with numbers and min is equal 5 and max is equal 25, range should set up to 20', () => {
      const params = {
        minValue: 5,
        maxValue: 25,
        valueOne: 10,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      expect(view.range).toBe(20);
    });

    test('When View is created working with values ["a", "b", "c", "d", "e", "f", "g"], range should set up to 6', () => {
      const params = {
        minValue: 5,
        maxValue: 25,
        valueOne: "d",
        isVertical: false,
        step: 1,
        values: ["a", "b", "c", "d", "e", "f", "g"],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      expect(view.range).toBe(6);
    });
  });

  describe('Rendering scale', () => {
    test('When View is created with no scaleStep params, it should not rendering scale marks', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 3,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      new View(container, params);
      const scaleMarks = container.querySelectorAll('.slider__mark');
      expect(scaleMarks.length).toBe(0);
    })
  });
});