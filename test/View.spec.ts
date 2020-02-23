import { View } from '../src/slider/View';

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
    });

    test('When View is created with scaleStep=2 and range=20, it should set up marksAmount to 9 and add 9 marks to slider', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 3,
        isVertical: false,
        step: 1,
        values: emptyArray,
        scaleStep: 2,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const scaleMarks = container.querySelectorAll('.slider__mark');
  
      expect(view.marksAmount).toBe(9);
      expect(scaleMarks.length).toBe(9);
    });
  
    test('When View is created for horizontal slider with scale, it should render marks with "horizontal" class', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 3,
        isVertical: false,
        step: 1,
        values: emptyArray,
        scaleStep: 2,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      new View(container, params);
      const scaleMarks = Array.from(container.querySelectorAll('.slider__mark'));
      const horizontalMarks = scaleMarks.filter(mark => mark.classList.contains('slider__mark--horizontal'));
      const verticalMarks = scaleMarks.filter(mark => mark.classList.contains('slider__mark--vertical'));
      
      expect(horizontalMarks.length).toBe(9);
      expect(verticalMarks.length).toBe(0);
    });
  
    test('When View is created for vertical slider with scale, it should render marks with "vertical" class', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 3,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 2,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      new View(container, params);
      const scaleMarks = Array.from(container.querySelectorAll('.slider__mark'));
      const horizontalMarks = scaleMarks.filter(mark => mark.classList.contains('slider__mark--horizontal'));
      const verticalMarks = scaleMarks.filter(mark => mark.classList.contains('slider__mark--vertical'));
      
      expect(horizontalMarks.length).toBe(0);
      expect(verticalMarks.length).toBe(9);
    });
  });

  describe('Update params', () => {
    test('When View.updateParams is called with new values, it should changed this values is its params', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 3,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 2,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const newParams = {
        minValue: 0,
        maxValue: 20,
        valueOne: 'b',
        valueTwo: 'f',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'f', 'g'],
        scaleStep: 2,
        isValueAlwaysShown: true,
        isValueOnHoverShown: false
      }
      const view = new View(container, params);
      expect(view.params).toEqual(params);
      view.updateParams(newParams);
      expect(view.params).toEqual(newParams);
    });

    test('When View created with min 0 and max 30 is updated with new params with min -10 and max 40, it should change its range from 30 to 50', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 2,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const newParams = {
        minValue: -10,
        maxValue: 40,
        valueOne: 3,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 2,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      expect(view.range).toBe(30);
      view.updateParams(newParams);
      expect(view.range).toBe(50);
    });

    test('When View created with min 0, max 30 and no scaleStep is updated with new params with scaleStep 5, it should changed marksAmount to 5', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const newParams = {
          minValue: 0,
          maxValue: 30,
          valueOne: 3,
          isVertical: true,
          step: 1,
          values: emptyArray,
          scaleStep: 5,
          isValueAlwaysShown: false,
          isValueOnHoverShown: true
      };
      const view = new View(container, params);
      expect(view.marksAmount).toBe(undefined);
      view.updateParams(newParams);
      expect(view.marksAmount).toBe(5);
    });

    test('When View updated its params(with new scaleStep), setUpIsWithStrings, setUpRange and setMarksAmount should be called', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const newParams = {
          minValue: 0,
          maxValue: 30,
          valueOne: 3,
          isVertical: true,
          step: 1,
          values: emptyArray,
          scaleStep: 5,
          isValueAlwaysShown: false,
          isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const spyStings = jest.spyOn(view, 'setUpIsWithStrings');
      const spyRange = jest.spyOn(view, 'setUpRange');
      const spyMarks = jest.spyOn(view, 'setUpMarksAmount');
      view.updateParams(newParams);
      expect(spyStings).toHaveBeenCalled();
      expect(spyRange).toHaveBeenCalled();
      expect(spyMarks).toHaveBeenCalled();
    });
  });

  describe('Reboting the view', () => {
    test('When View was created with two thumbs and scale, updated with params with one value and no scaleStep, and was rebooted - then it should not have second thumb, interval bar or scale', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        valueTwo: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 5,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const newParams = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      let secondThumb = container.querySelector('.slider__thumb--two');
      let scaleMarks = container.querySelectorAll('.slider__mark');
      let intervalBar = container.querySelector('.slider__interval');
      expect(secondThumb).not.toBe(null);
      expect(scaleMarks.length).toBe(5);
      expect(intervalBar).not.toBe(null);

      view.updateParams(newParams);
      view.rebootSliderView();
      secondThumb = container.querySelector('.slider__thumb--two');
      scaleMarks = container.querySelectorAll('.slider__mark');
      intervalBar = container.querySelector('.slider__interval');
      expect(secondThumb).toBe(null);
      expect(scaleMarks.length).toBe(0);
      expect(intervalBar).toBe(null);
    });
  });

  describe('User interaction', () => {
    test('When user starts clicking thumb one, an approptiate handler should be called for this event', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        valueTwo: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 5,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const thumbOne: HTMLElement = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(view, 'onThumbOneMouseDown');
      const mouseDownEvent = new MouseEvent('mousedown');
      thumbOne.dispatchEvent(mouseDownEvent);
      expect(spy).toHaveBeenCalled();
    });

    test('When user starts clicking thumb two, an approptiate handler should be called for this event', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        valueTwo: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 5,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const thumbTwo: HTMLElement = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(view, 'onThumbTwoMouseDown');
      const mouseDownEvent = new MouseEvent('mousedown');
      thumbTwo.dispatchEvent(mouseDownEvent);
      expect(spy).toHaveBeenCalled();
    });

    test('When user starts touch thumb one, an approptiate handler should be called for this event', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        valueTwo: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 5,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const thumbOne: HTMLElement = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(view, 'onThumbOneTouchStart');
      const touchStartEvent = new TouchEvent('touchstart');
      thumbOne.dispatchEvent(touchStartEvent);
      expect(spy).toHaveBeenCalled();
    });

    test('When user starts touch thumb two, an approptiate handler should be called for this event', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 3,
        valueTwo: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        scaleStep: 5,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const thumbTwo: HTMLElement = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(view, 'onThumbTwoTouchStart');
      const touchStartEvent = new TouchEvent('touchstart');
      thumbTwo.dispatchEvent(touchStartEvent);
      expect(spy).toHaveBeenCalled();
    });
  });
});