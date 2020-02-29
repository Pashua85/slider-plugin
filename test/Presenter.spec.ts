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

  describe('Setting up shift', () => {
    test('When presenter is created working with numbers and with min value -20 in params, it should set up shift to -20', () => {
      const params = {
        minValue: -20,
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
      expect(presenter.shift).toBe(-20);
    });

    test('When presenter is created working with strings and with min value 35 in params, it should set up shift to 0', () => {
      const params = {
        minValue: 35,
        maxValue: 60,
        valueOne: 3,
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c'],
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params)
      expect(presenter.shift).toBe(0);
    });
  });

  describe('Setting up isWithStrings value', () => {
    test('When presenter is created working with numbers(empty array in params for key "values"), it should set up isWithStrings to false', () => {
      const params = {
        minValue: -20,
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
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.isWithStrings).toBe(false);
    });

    test('When presenter is created working with strings(array of strings in params for key "values"), it should set up isWithStrings to true', () => {
      const params = {
        minValue: -20,
        maxValue: 10,
        valueOne: 3,
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd'],
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.isWithStrings).toBe(true);
    });
  });

  describe('Setting up range', () => {
    test('When presenter is created working with numbers and min 4 an max 20, it should set up range to 16', () => {
      const params = {
        minValue: 4,
        maxValue: 20,
        valueOne: 7,
        isVertical: false,
        step: 1,
        values: emptyArray,
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.range).toBe(16);
    });

    test('When presenter is created for working with strings with ["a", "b", "c", "d", "e"] in params, it should set up range to 4', () => {
      const params = {
        minValue: 4,
        maxValue: 20,
        valueOne: 7,
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.range).toBe(4);
    });
  });

  describe('Setting up fraction chars', () => {
    test('When presenter is created with 0.25 step in params, it shold set up fractionChars to 2', () => {
      const params = {
        minValue: 4,
        maxValue: 20,
        valueOne: 7,
        isVertical: false,
        step: 0.25,
        values: emptyArray,
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.fractionChars).toBe(2);
    });


    test('When presenter is created with 2 step in params, it shold set up fractionChars to 0', () => {
      const params = {
        minValue: 4,
        maxValue: 20,
        valueOne: 7,
        isVertical: false,
        step: 2,
        values: emptyArray,
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.fractionChars).toBe(0);
    });
  });

  describe('Updating values', () => {
    test('When in a presenter working with numbers updateValueOne is called with argument 20, valueOne in its model state should be changed to 20', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 7,
        isVertical: false,
        step: 2,
        values: emptyArray,
        scaleStep: 1,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.model.state.valueOne).toBe(7);
      presenter.updateValueOne(20);
      expect(presenter.model.state.valueOne).toBe(20);
    });
    
    test('When in a presenter working with stings ["a", "b", "c", "d"] updateValueTwo is called with argument "c", valueTwo in its model state should be change to "b"', () => {
      const params = {
        minValue: 0,
        maxValue: 30,
        valueOne: 'b',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.model.state.valueTwo).toBe(undefined);
      presenter.updateValueTwo('c');
      expect(presenter.model.state.valueTwo).toBe('c');
    });
  });

  describe('Validate value one', () => {
    test('When validateValueOne is called with argument 5 in the presenter with numbers, min 0, max 10 and valueTwo 6; it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 3,
        valueTwo: 6,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne(5);
      expect(isValid).toBe(true);
    });

    test('When validateValueOne is called with argument 5 in the presenter with numbers, min 0, max 10 and valueTwo 4; it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 3,
        valueTwo: 4,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne(5);
      expect(isValid).toBe(false);
    });

    test('When validateValueOne is called with argument 0 in the presenter with numbers, min 2 and max 10, it should return false', () => {
      const params = {
        minValue: 2,
        maxValue: 10,
        valueOne: 3,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne(0);
      expect(isValid).toBe(false);
    });

    test('When validateValueOne is called with argument 15 in the presenter with numbers, min 0, max 10; it should return false', () => {
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
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne(15);
      expect(isValid).toBe(false);
    });

    test('When validateValueOne is called with argument 10 in the presenter with numbers, min 0, max 10 and valueTwo 10; it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 3,
        valueTwo: 6,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne(5);
      expect(isValid).toBe(true);
    });

    test('When validateValueOne is called with argument "a" in the presenter with strings ["a", "b", "c", "d", "e"], and valueTwo "d"; it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'b',
        valueTwo: 'd',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne('a');
      expect(isValid).toBe(true);
    });

    test('When validateValueOne is called with argument "e" in the presenter with strings ["a", "b", "c", "d", "e"], and valueTwo "d", it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'b',
        valueTwo: 'd',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne('e');
      expect(isValid).toBe(false);
    });

    test('When validateValueOne is called with argument "z" in the presenter with strings ["a", "b", "c", "d", "e"], it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'b',
        valueTwo: 'd',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne('z');
      expect(isValid).toBe(false);
    });

    test('When validateValueOne is called with argument "d" in the presenter with strings ["a", "b", "c", "d", "e"], and valueTwo "d"; it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'b',
        valueTwo: 'd',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueOne('d');
      expect(isValid).toBe(true);
    });
  });

  describe('Validate value two', () => {
    test('When validateValueTwo is called with argument 10 in the presenter with numbers, min 0, max 10 and valueOne 4, it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 4,
        valueTwo: 6,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueTwo(10);
      expect(isValid).toBe(true);
    });

    test('When validateValueTwo is called with argument 4 in the presenter with numbers, min 0, max 10 and valueOne 4, it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 4,
        valueTwo: 6,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueTwo(4);
      expect(isValid).toBe(true);
    });

    test('When validateValueTwo is called with argument 3 in the presenter with numbers, min 0, max 10 and valueOne 4, it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 4,
        valueTwo: 6,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueTwo(3);
      expect(isValid).toBe(false);
    });

    test('When validateValueTwo is called with argument 15 in the presenter with numbers, min 0, max 10 and valueOne 4, it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 4,
        valueTwo: 6,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueTwo(15);
      expect(isValid).toBe(false);
    });

    test('When validateValueTwo is called with argument "e" in the presenter with strings ["a", "b", "c", "d", "e"] and valueOne "c", it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'c',
        valueTwo: 'd',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueTwo('e');
      expect(isValid).toBe(true);
    });

    test('When validateValueTwo is called with argument "c" in the presenter with strings ["a", "b", "c", "d", "e"] and valueOne "c", it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'c',
        valueTwo: 'd',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueTwo('c');
      expect(isValid).toBe(true);
    });

    test('When validateValueTwo is called with argument "b" in the presenter with strings ["a", "b", "c", "d", "e"] and valueOne "c", it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'c',
        valueTwo: 'd',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueTwo('b');
      expect(isValid).toBe(false);
    });

    test('When validateValueTwo is called with argument "y" in the presenter with strings ["a", "b", "c", "d", "e"] and valueOne "c", it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'c',
        valueTwo: 'd',
        isVertical: false,
        step: 1,
        values: ['a', 'b', 'c', 'd', 'e'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateValueTwo('y');
      expect(isValid).toBe(false);
    });
  });

  describe('On value one change', () => {
    test('When value one is updated in the model of slider, renderThumbOne should be called in its view', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const spy = jest.spyOn(presenter.view, 'renderThumbOne');
      presenter.updateValueOne(5);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('On value two change', () => {
    test('When value two is updated in the model of slider, renderThumbTwo should be called in its view', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 6,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const spy = jest.spyOn(presenter.view, 'renderThumbTwo');
      presenter.updateValueTwo(7);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Make value string', () => {
    test('When makeValueString is called with argument 13 in the presenter working with numbers and with step 0.25, it should return "13.00"', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        isVertical: false,
        step: 0.25,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const result = presenter.makeValueString(13);
      expect(result).toBe('13.00');
    });

    test('When makeValueString is called with argument 13 in the presenter working with numbers and with step 1, it should return "13"', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const result = presenter.makeValueString(13);
      expect(result).toBe('13');
    });

    test('When makeValueString is called with argument "John Doe" in the presenter working with strings, it should return "John Doe"', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 'Peter Griffin',
        isVertical: false,
        step: 1,
        values: ['Peter Griffin', 'John Doe', 'Tcheburashka'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const result = presenter.makeValueString('John Doe');
      expect(result).toBe('John Doe');
    });
  });

  describe('Mouse down on thumb one', () => {
    test('When user press mouse down on the thumb one, this thumb gets class "slider__thumb--top and only this thumb', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      new Presenter(new Model(), view, params);
      const thumbOne = container.querySelector('.slider__thumb--one');
      const thumbTwo = container.querySelector('.slider__thumb--two');
      thumbTwo.classList.add('slider__thumb--top');
      expect(thumbTwo.classList).toContain('slider__thumb--top');
      const mouseDownEvent = new MouseEvent('mousedown');
      thumbOne.dispatchEvent(mouseDownEvent);
      expect(thumbTwo.classList).not.toContain('slider__thumb--top');
      expect(thumbOne.classList).toContain('slider__thumb--top');
    })
  });

  describe('Mouse down on thumb two', () => {
    test('When user press mouse down on the thumb two, this thumb gets class "slider__thumb--top and only this thumb', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      new Presenter(new Model(), view, params);
      const thumbOne = container.querySelector('.slider__thumb--one');
      const thumbTwo = container.querySelector('.slider__thumb--two');
      thumbOne.classList.add('slider__thumb--top');
      expect(thumbOne.classList).toContain('slider__thumb--top');
      const mouseDownEvent = new MouseEvent('mousedown');
      thumbTwo.dispatchEvent(mouseDownEvent);
      expect(thumbOne.classList).not.toContain('slider__thumb--top');
      expect(thumbTwo.classList).toContain('slider__thumb--top');
    });
  });

  describe('Touch start on thumb one', () => {
    test('When user touched the thumb one, this thumb gets classes "slider__thumb--top" and "slider__thumb--touched"', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      new Presenter(new Model(), view, params);
      const thumbOne = container.querySelector('.slider__thumb--one');
      const thumbTwo = container.querySelector('.slider__thumb--two');
      thumbTwo.classList.add('slider__thumb--top');
      expect(thumbTwo.classList).toContain('slider__thumb--top');
      expect(thumbOne.classList).not.toContain('slider__thumb--touched');
      const touchStartEvent = new TouchEvent('touchstart');
      thumbOne.dispatchEvent(touchStartEvent);
      expect(thumbTwo.classList).not.toContain('slider__thumb--top');
      expect(thumbOne.classList).toContain('slider__thumb--top');
      expect(thumbOne.classList).toContain('slider__thumb--touched');
    });
  });

  describe('Touch start on thumb two', () => {
    test('When user touched the thumb two, this thumb gets classes "slider__thumb--top" and "slider__thumb--touched"', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      new Presenter(new Model(), view, params);
      const thumbOne = container.querySelector('.slider__thumb--one');
      const thumbTwo = container.querySelector('.slider__thumb--two');
      thumbOne.classList.add('slider__thumb--top');
      expect(thumbOne.classList).toContain('slider__thumb--top');
      expect(thumbTwo.classList).not.toContain('slider__thumb--touched');
      const touchStartEvent = new TouchEvent('touchstart');
      thumbTwo.dispatchEvent(touchStartEvent);
      expect(thumbOne.classList).not.toContain('slider__thumb--top');
      expect(thumbTwo.classList).toContain('slider__thumb--top');
      expect(thumbTwo.classList).toContain('slider__thumb--touched');
    });
  });

  describe('Round to step', () => {
    test('When roundToStep is called with argument 13.456789 in the presenter with step 0.5 in params, it should return 13.5', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 14,
        isVertical: false,
        step: 0.5,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const result = presenter.roundToStep(13.456789, presenter.params.step);
      expect(result).toBe(13.5);
    });

    test('When roundToStep is called with argument 13.456789 in the presenter with step 1 in params, it should return 13', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 14,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const result = presenter.roundToStep(13.456789, presenter.params.step);
      expect(result).toBe(13);
    });
  });

  describe('Horizontal move on thumb one', () => {
    
    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('When user press down mouse on the thumb one in the horizontal slider and move mouse horizontally with clientX=300 in event, handleHorizontalMoveOne should be called with argument 300', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      document.body.appendChild(container);
      const thumbOne = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(presenter, 'handleHorizontalMoveOne');
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 300 });
      thumbOne.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledWith(300);
    });

    test('When user touches the thumb one in the horizontal slider and move finger horizontally with clientX=300 in event, handleHorizontalMoveOne should be called with argument 300', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const thumbOne: HTMLElement = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(presenter, 'handleHorizontalMoveOne');
      const touchStartEvent = new TouchEvent('touchstart');
      const touchMoveEvent = new TouchEvent('touchmove', { 
        touches: [ { 
          altitudeAngle: 50, 
          azimuthAngle: 50, 
          clientX: 300, 
          clientY: 50, 
          force: 50, 
          identifier: 50, 
          pageX: 50, 
          pageY: 50, 
          radiusX: 50, 
          radiusY: 50, 
          rotationAngle: 50, 
          screenX: 50, 
          screenY: 50, 
          target: thumbOne,
          touchType: 'direct'
        }] 
      });
      thumbOne.dispatchEvent(touchStartEvent);
      thumbOne.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledWith(300);
    });

    test('When user moving thumb one horizontally with mouse down and then mouse is up, handleHorizontalMoveOne should stop to be called', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      document.body.appendChild(container);
      const thumbOne = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(presenter, 'handleHorizontalMoveOne');
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseMoveEvent = new MouseEvent('mousemove');
      const mouseUpEvent = new MouseEvent('mouseup');
      thumbOne.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);

      document.dispatchEvent(mouseUpEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('When user moving thumb one horizontally with touch and then thouch is ended, handleHorizontalMoveOne should stop to be called', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const thumbOne: HTMLElement = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(presenter, 'handleHorizontalMoveOne');
      const touchStartEvent = new TouchEvent('touchstart');
      const touchMoveEvent = new TouchEvent('touchmove', { 
        touches: [ { 
          altitudeAngle: 50, 
          azimuthAngle: 50, 
          clientX: 300, 
          clientY: 50, 
          force: 50, 
          identifier: 50, 
          pageX: 50, 
          pageY: 50, 
          radiusX: 50, 
          radiusY: 50, 
          rotationAngle: 50, 
          screenX: 50, 
          screenY: 50, 
          target: thumbOne,
          touchType: 'direct'
        }] 
      });
      const touchEndEvent = new TouchEvent('touchend');
      thumbOne.dispatchEvent(touchStartEvent);
      thumbOne.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);

      thumbOne.dispatchEvent(touchEndEvent);
      thumbOne.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Horizontal move on thumb two', () => {

    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('When user press down mouse on the thumb two in the horizontal slider and move mouse horizontally with clientX=300 in event, handleHorizontalMoveTwo should be called with argument 300', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      document.body.appendChild(container);
      const thumbTwo = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(presenter, 'handleHorizontalMoveTwo');
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 300 });
      thumbTwo.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledWith(300);
    });    

    test('When user touches the thumb two in the horizontal slider and move finger horizontally with clientX=300 in event, handleHorizontalMoveTwo should be called with argument 300', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const thumbTwo: HTMLElement = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(presenter, 'handleHorizontalMoveTwo');
      const touchStartEvent = new TouchEvent('touchstart');
      const touchMoveEvent = new TouchEvent('touchmove', { 
        touches: [ { 
          altitudeAngle: 50, 
          azimuthAngle: 50, 
          clientX: 300, 
          clientY: 50, 
          force: 50, 
          identifier: 50, 
          pageX: 50, 
          pageY: 50, 
          radiusX: 50, 
          radiusY: 50, 
          rotationAngle: 50, 
          screenX: 50, 
          screenY: 50, 
          target: thumbTwo,
          touchType: 'direct'
        }] 
      });
      thumbTwo.dispatchEvent(touchStartEvent);
      thumbTwo.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledWith(300);
    });

    test('When user moving thumb two horizontaly with mouse down and then mouse is up, handleHorizontalMoveTwo should stop to be called', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      document.body.appendChild(container);
      const thumbTwo = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(presenter, 'handleHorizontalMoveTwo');
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseMoveEvent = new MouseEvent('mousemove');
      const mouseUpEvent = new MouseEvent('mouseup');
      thumbTwo.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);

      document.dispatchEvent(mouseUpEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('When user moving thumb two horizontaly with touch and then thouch is ended, handleHorizontalMoveTwo should stop to be called', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const thumbTwo: HTMLElement = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(presenter, 'handleHorizontalMoveTwo');
      const touchStartEvent = new TouchEvent('touchstart');
      const touchMoveEvent = new TouchEvent('touchmove', { 
        touches: [ { 
          altitudeAngle: 50, 
          azimuthAngle: 50, 
          clientX: 300, 
          clientY: 50, 
          force: 50, 
          identifier: 50, 
          pageX: 50, 
          pageY: 50, 
          radiusX: 50, 
          radiusY: 50, 
          rotationAngle: 50, 
          screenX: 50, 
          screenY: 50, 
          target: thumbTwo,
          touchType: 'direct'
        }] 
      });
      const touchEndEvent = new TouchEvent('touchend');
      thumbTwo.dispatchEvent(touchStartEvent);
      thumbTwo.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);

      thumbTwo.dispatchEvent(touchEndEvent);
      thumbTwo.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Vertical move on thumb one', () => {

    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('When user press down mouse on the thumb one in the vertical slider and move mouse vertically with clientY=300 in event, handleVerticalMoveOne should be called with argument 300', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      document.body.appendChild(container);
      const thumbOne = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(presenter, 'handleVerticalMoveOne');
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseMoveEvent = new MouseEvent('mousemove', { clientY: 300 });
      thumbOne.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledWith(300);
    });

    test('When user touches the thumb one in the vertical slider and move finger vertically with clientY=300 in event, handleVerticalMoveOne should be called with argument 300', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const thumbOne: HTMLElement = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(presenter, 'handleVerticalMoveOne');
      const touchStartEvent = new TouchEvent('touchstart');
      const touchMoveEvent = new TouchEvent('touchmove', { 
        touches: [ { 
          altitudeAngle: 50, 
          azimuthAngle: 50, 
          clientX: 50, 
          clientY: 300, 
          force: 50, 
          identifier: 50, 
          pageX: 50, 
          pageY: 50, 
          radiusX: 50, 
          radiusY: 50, 
          rotationAngle: 50, 
          screenX: 50, 
          screenY: 50, 
          target: thumbOne,
          touchType: 'direct'
        }] 
      });
      thumbOne.dispatchEvent(touchStartEvent);
      thumbOne.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledWith(300);
    });

    test('When user moving thumb one vertically with mouse down and then mouse is up, handleVerticalMoveOne should stop to be called', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      document.body.appendChild(container);
      const thumbOne = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(presenter, 'handleVerticalMoveOne');
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseMoveEvent = new MouseEvent('mousemove');
      const mouseUpEvent = new MouseEvent('mouseup');
      thumbOne.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);

      document.dispatchEvent(mouseUpEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('When user moving thumb one vertically with touch and then thouch is ended, handleVerticalMoveOne should stop to be called', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const thumbOne: HTMLElement = container.querySelector('.slider__thumb--one');
      const spy = jest.spyOn(presenter, 'handleVerticalMoveOne');
      const touchStartEvent = new TouchEvent('touchstart');
      const touchMoveEvent = new TouchEvent('touchmove', { 
        touches: [ { 
          altitudeAngle: 50, 
          azimuthAngle: 50, 
          clientX: 300, 
          clientY: 50, 
          force: 50, 
          identifier: 50, 
          pageX: 50, 
          pageY: 50, 
          radiusX: 50, 
          radiusY: 50, 
          rotationAngle: 50, 
          screenX: 50, 
          screenY: 50, 
          target: thumbOne,
          touchType: 'direct'
        }] 
      });
      const touchEndEvent = new TouchEvent('touchend');
      thumbOne.dispatchEvent(touchStartEvent);
      thumbOne.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);

      thumbOne.dispatchEvent(touchEndEvent);
      thumbOne.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Vertical move on thumb two', () => {
    
    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('When user press down mouse on the thumb two in the vertical slider and move mouse vertically with clientY=300 in event, handleVerticalMoveTwo should be called with argument 300', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      document.body.appendChild(container);
      const thumbTwo = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(presenter, 'handleVerticalMoveTwo');
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseMoveEvent = new MouseEvent('mousemove', { clientY: 300 });
      thumbTwo.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledWith(300);
    });

    test('When user touches the thumb two in the vertical slider and move finger vertically with clientY=300 in event, handleVerticalMoveTwo should be called with argument 300', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const thumbTwo: HTMLElement = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(presenter, 'handleVerticalMoveTwo');
      const touchStartEvent = new TouchEvent('touchstart');
      const touchMoveEvent = new TouchEvent('touchmove', { 
        touches: [ { 
          altitudeAngle: 50, 
          azimuthAngle: 50, 
          clientX: 50, 
          clientY: 300, 
          force: 50, 
          identifier: 50, 
          pageX: 50, 
          pageY: 50, 
          radiusX: 50, 
          radiusY: 50, 
          rotationAngle: 50, 
          screenX: 50, 
          screenY: 50, 
          target: thumbTwo,
          touchType: 'direct'
        }] 
      });
      thumbTwo.dispatchEvent(touchStartEvent);
      thumbTwo.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledWith(300);
    });

    test('When user moving thumb two vertically with mouse down and then mouse is up, handleVerticalMoveTwo should stop to be called', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      document.body.appendChild(container);
      const thumbTwo = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(presenter, 'handleVerticalMoveTwo');
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseMoveEvent = new MouseEvent('mousemove');
      const mouseUpEvent = new MouseEvent('mouseup');
      thumbTwo.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);

      document.dispatchEvent(mouseUpEvent);
      document.dispatchEvent(mouseMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('When user moving thumb two vertically with touch and then thouch is ended, handleVerticalMoveTwo should stop to be called', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const thumbTwo: HTMLElement = container.querySelector('.slider__thumb--two');
      const spy = jest.spyOn(presenter, 'handleVerticalMoveTwo');
      const touchStartEvent = new TouchEvent('touchstart');
      const touchMoveEvent = new TouchEvent('touchmove', { 
        touches: [ { 
          altitudeAngle: 50, 
          azimuthAngle: 50, 
          clientX: 300, 
          clientY: 50, 
          force: 50, 
          identifier: 50, 
          pageX: 50, 
          pageY: 50, 
          radiusX: 50, 
          radiusY: 50, 
          rotationAngle: 50, 
          screenX: 50, 
          screenY: 50, 
          target: thumbTwo,
          touchType: 'direct'
        }] 
      });
      const touchEndEvent = new TouchEvent('touchend');
      thumbTwo.dispatchEvent(touchStartEvent);
      thumbTwo.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);

      thumbTwo.dispatchEvent(touchEndEvent);
      thumbTwo.dispatchEvent(touchMoveEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update options', () => {

    test('When presenter working with numbers received array ["a", "b", "c", "d"] as values and valueOne "b" in new params, it changed isWithStrings to true', () => {
      const params = {
        minValue: 0,
        maxValue: 20,
        valueOne: 4,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.isWithStrings).toBe(false);
      presenter.updateOptions({ 
        values: ['a', 'b', 'c', 'd'],
        valueOne: 'b'
      });
      expect(presenter.isWithStrings).toBe(true);
    });

    test('When updateOptions is called with min -50 in the presenter with min 5 and max 50 in params, its range should change from 45 to 100', () => {
      const params = {
        minValue: 5,
        maxValue: 50,
        valueOne: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.range).toBe(45);
      presenter.updateOptions({ minValue: -50});
      expect(presenter.range).toBe(100);
    });

    test('When updateOptions is called with array ["a", "b", "c", "d", "e"] an valueOne "b" in the presenter working with numbers and min -35, shift of presenter should change from -35 to 0', () => {
      const params = {
        minValue: -35,
        maxValue: 50,
        valueOne: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.shift).toBe(-35);
      presenter.updateOptions({
        valueOne: 'b',
        values: ['a', 'b', 'c', 'd', 'e']
      });
      expect(presenter.shift).toBe(0);
    });

    test('When updateOptions is called with array ["a", "b", "c", "d", "e"] an valueOne "b" in the presenter working with numbers and min -35, range of presenter should change from 85 to 4', () => {
      const params = {
        minValue: -35,
        maxValue: 50,
        valueOne: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.range).toBe(85);
      presenter.updateOptions({
        valueOne: 'b',
        values: ['a', 'b', 'c', 'd', 'e']
      });
      expect(presenter.range).toBe(4);
    });

    test('When presenter updated step in params from 0.222 to 5, it should change its fractionChars from 3 to 0', () => {
      const params = {
        minValue: -35,
        maxValue: 50,
        valueOne: 10,
        isVertical: true,
        step: 0.222,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.fractionChars).toBe(3);
      presenter.updateOptions({ step: 5 });
      expect(presenter.fractionChars).toBe(0);
    });

    test('When presenter updated its params, updatingParams with new params and rebootSliderView must be called in its view', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 10,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };

      const newParams = {
        minValue: 0,
        maxValue: 50,
        valueOne: 10,
        valueTwo: 20,
        isVertical: false,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const updateSpy = jest.spyOn(presenter.view, 'updateParams');
      const rebootSpy = jest.spyOn(presenter.view, 'rebootSliderView');
      presenter.updateOptions({ isVertical: false, valueTwo: 20 });
      expect(updateSpy).toHaveBeenCalledWith(newParams);
      expect(rebootSpy).toHaveBeenCalled();
    });

    test('When presenter with one value (5) in params is updated with new params with valueTwo 12, its model should change valueTwo from underfined to 12', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      expect(presenter.model.state.valueTwo).toBe(undefined);
      presenter.updateOptions({ valueTwo: 12 });
      expect(presenter.model.state.valueTwo).toBe(12);
    });
  });

  describe('Add outer inputs to slider', () => {
    test('When addOuterInputOne is called with input element as argument, the value of this input must represent valueOne in string', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputOne = document.createElement('input');
      inputOne.type = 'text';
      presenter.addOuterInputOne(inputOne);
      expect(inputOne.value).toBe('5');
    });

    test('When addOuterInputTwo is called with input element as argument, the value of this input must represent valueTwo in string', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        valueTwo: 16,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputTwo = document.createElement('input');
      inputTwo.type = 'text';
      presenter.addOuterInputTwo(inputTwo);
      expect(inputTwo.value).toBe('16');
    });

    test('When addOuterInputOne is called twice (with two different input elements), the length of presenters outerInputsOne must be 2', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputOne = document.createElement('input');
      const anotherInputOne = document.createElement('input');
      presenter.addOuterInputOne(inputOne);
      presenter.addOuterInputOne(anotherInputOne);
      expect(presenter.outerInputsOne.length).toBe(2);
    });

    test('When addOuterInputTwo is called twice (with two different input elements), the length of presenters outerInputsTwo must be 2', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        valueTwo: 20,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputTwo = document.createElement('input');
      const antotherInputTwo = document.createElement('input');
      presenter.addOuterInputTwo(inputTwo);
      presenter.addOuterInputTwo(antotherInputTwo);
      expect(presenter.outerInputsTwo.length).toBe(2);
    });

    test('When addOuterInputTwo is called in presenter with one value in params, the length of outerInputsTwo in presenter must remain 0', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputTwo = document.createElement('input');
      presenter.addOuterInputTwo(inputTwo);
      expect(presenter.outerInputsTwo.length).toBe(0);
    });
  });

  describe('Update outer inputs', () => {
    test('When valueOne is updated to 20 in a presenter with two added outer input for valueOne, the values of both these inputs must be changed to "20"', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        valueTwo: 30,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputOne = document.createElement('input');
      const anotherInputOne = document.createElement('input');
      presenter.addOuterInputOne(inputOne);
      presenter.addOuterInputOne(anotherInputOne);
      presenter.updateValueOne(20);
      expect(inputOne.value).toBe('20');
      expect(anotherInputOne.value).toBe('20');
    });

    test('When valueTwo is updated to 25 in a presenter with two added outer input for valueTwo, the values of both these inputs must be changed to "25"', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        valueTwo: 30,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputTwo = document.createElement('input');
      const antotherInputTwo = document.createElement('input');
      presenter.addOuterInputTwo(inputTwo);
      presenter.addOuterInputTwo(antotherInputTwo);
      presenter.updateValueTwo(25);
      expect(inputTwo.value).toBe('25');
      expect(antotherInputTwo.value).toBe('25');
    });

    test('When updateOuterInput is called with input element and string "John Doe" as arguments, the value of this input must be changed to "John Doe"', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const outerInput = document.createElement('input');
      outerInput.type = 'text';
      presenter.updateOuterInput(outerInput, 'John Doe');
      expect(outerInput.value).toBe('John Doe');
    });
  });

  describe('Validate input value', () => {
    test('When validateInputValue is called with argument "5" in presenter working with numbers and min 0 and max 10, it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateInputValue('5');
      expect(isValid).toBe(true);
    });

    test('When validateInputValue is called with argument "15" in presenter working with numbers and min 0 and max 10, it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateInputValue('15');
      expect(isValid).toBe(false);
    });

    test('When validateInputValue is called with argument "some string value" in presenter working with numbers and min 0 and max 10, it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateInputValue('15');
      expect(isValid).toBe(false);
    });

    test('When validateInputValue is called with argument "John Doe" in presenter working with strings ["John Snow", "John Doe"], it should return true', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'John Snow',
        isVertical: true,
        step: 1,
        values: ['John Snow', 'John Doe'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateInputValue('John Doe');
      expect(isValid).toBe(true);
    });

    test('When validateInputValue is called with argument "John Connor" in presenter working with strings ["John Snow", "John Doe"], it should return false', () => {
      const params = {
        minValue: 0,
        maxValue: 10,
        valueOne: 'John Snow',
        isVertical: true,
        step: 1,
        values: ['John Snow', 'John Doe'],
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const isValid = presenter.validateInputValue('John Connor');
      expect(isValid).toBe(false);
    });
  });

  describe('Handle blur on outer inputs', () => {
    test('When user changed the value of outer input one to "10" and this value is valid, then after this input lost focus, the value one in model changes to 10', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputOne: HTMLInputElement = document.createElement('input');
      inputOne.type = 'text';
      presenter.addOuterInputOne(inputOne);
      inputOne.value = '10';
      const blurEvent = new FocusEvent('blur');
      inputOne.dispatchEvent(blurEvent);
      expect(presenter.model.state.valueOne).toBe(10);
    });

    test('When user changed the value of outer input two to "10" and this value is valid, then after this input lost focus, the value two in model changes to 10', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        valueTwo: 8,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputTwo: HTMLInputElement = document.createElement('input');
      inputTwo.type = 'text';
      presenter.addOuterInputTwo(inputTwo);
      inputTwo.value = '10';
      const blurEvent = new FocusEvent('blur');
      inputTwo.dispatchEvent(blurEvent);
      expect(presenter.model.state.valueTwo).toBe(10);
    });
  });

  describe('Remove outer inputs', () => {
    test('When removeOuterInputOne is called with input element as an argument in the presenter with two elements in outerInputsOne, this input must be removed, bun only this', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputOne = document.createElement('input');
      const anotherInputOne = document.createElement('input');
      presenter.addOuterInputOne(inputOne);
      presenter.addOuterInputOne(anotherInputOne);
      expect(presenter.outerInputsOne.length).toBe(2);
      presenter.removeOuterInputOne(anotherInputOne);
      const inputOneIndex = presenter.outerInputsOne.indexOf(inputOne);
      const anotherInputOneIndex  = presenter.outerInputsOne.indexOf(anotherInputOne);
      expect(inputOneIndex).toBe(0);
      expect(anotherInputOneIndex).toBe(-1);
    });

    test('When removeOuterInputTwo is called with input element as an argument in the presenter with two elements in outerInputsTwo, this input must be removed, bun only this', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        valueTwo: 20,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputTwo = document.createElement('input');
      const anotherInputTwo = document.createElement('input');
      presenter.addOuterInputOne(inputTwo);
      presenter.addOuterInputOne(anotherInputTwo);
      expect(presenter.outerInputsOne.length).toBe(2);
      presenter.removeOuterInputOne(anotherInputTwo);
      const inputTwoIndex = presenter.outerInputsOne.indexOf(inputTwo);
      const anotherInputTwoIndex  = presenter.outerInputsOne.indexOf(anotherInputTwo);
      expect(inputTwoIndex).toBe(0);
      expect(anotherInputTwoIndex).toBe(-1);
    });

    test('When removeAllOuterInputsOne is called in presenter with two elements in outerInputsOne, the length of outerInputsOne array must changed from 2 to 0', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputOne = document.createElement('input');
      const anotherInputOne = document.createElement('input');
      presenter.addOuterInputOne(inputOne);
      presenter.addOuterInputOne(anotherInputOne);
      expect(presenter.outerInputsOne.length).toBe(2);
      presenter.removeAllOuterInputsOne();
      expect(presenter.outerInputsOne.length).toBe(0);
    });

    test('When removeAllOuterInputsTwo is called in presenter with two elements in outerInputsTwo, the length of outerInputsTwo array must changed from 2 to 0', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        valueTwo: 18,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };
      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const inputTwo = document.createElement('input');
      const anotherInputTwo = document.createElement('input');
      presenter.addOuterInputTwo(inputTwo);
      presenter.addOuterInputTwo(anotherInputTwo);
      expect(presenter.outerInputsTwo.length).toBe(2);
      presenter.removeAllOuterInputsTwo();
      expect(presenter.outerInputsTwo.length).toBe(0);
    });
  });

  describe('Handle window resize', () => {

    test('When handleWindowResize is called, presenter shoud rerender thumbs in its view', () => {
      const params = {
        minValue: 0,
        maxValue: 50,
        valueOne: 5,
        valueTwo: 18,
        isVertical: true,
        step: 1,
        values: emptyArray,
        isValueAlwaysShown: false,
        isValueOnHoverShown: true
      };

      const view = new View(container, params);
      const presenter = new Presenter(new Model(), view, params);
      const spyOne  = jest.spyOn(presenter.view, 'renderThumbOne');
      const spyTwo = jest.spyOn(presenter.view, 'renderThumbTwo');
      presenter.handleWindowResize();

      expect(spyOne).toHaveBeenCalled();
      expect(spyTwo);
    });
  })
});