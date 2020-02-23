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
    test('When Presenter is created working with numbers and with min value -20 in params, it should set up shift to -20', () => {
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

    test('When Presenter is created working with strings and with min value 35 in params, it should set up shift to 0', () => {
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
    test('When Presenter is created working with numbers(empty array in params for key "values"), it should set up isWithStrings to false', () => {
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

    test('When Presenter is created working with strings(array of strings in params for key "values"), it should set up isWithStrings to true', () => {
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
    test('When Presenter is created working with numbers and min 4 an max 20, it should set up range to 16', () => {
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

    test('When Presenter is created for working with strings with ["a", "b", "c", "d", "e"] in params, it should set up range to 4', () => {
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
  })
});