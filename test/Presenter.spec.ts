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
});