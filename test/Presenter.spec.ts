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


});