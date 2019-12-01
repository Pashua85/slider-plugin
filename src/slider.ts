import './styles.scss';

import { View } from './View';
import { Model, Value } from './Model';
import { Presenter, IConfig } from './Presenter';

const emptyArray: Value[] = [];
const arrayWithValues = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const wordsArray = ['ужасно', 'очень плохо', 'бывает и хуже', 'плохо', "так себе", "терпимо", "неплохо",
  "нормально", "сойдёт", "хорошо", "очень хорошо", "отлично", "здорово", "просто прекрасно", "потрясающе", "восхитительно"]

const config = {
  maxValue: 100,
  minValue: 0,
  valueOne: 30,
  valueTwo: 60,
  step: 1,
  isVertical: false,
  values: emptyArray
};

const anotherConfig = {
  maxValue: 20,
  minValue: 8,
  valueOne: 8,
  valueTwo: 12.4,
  step: .1, 
  isVertical: true,
  values: emptyArray
}

const root: HTMLElement = document.querySelector('#root');
const view = new View(root, config);
new Presenter(new Model(), view, config);

const root1: HTMLElement = document.querySelector('#root1');
const anotherView = new View(root1, anotherConfig);
new Presenter(new Model(), anotherView, anotherConfig);

const config2 = {
  isVertical: false,
  valueOne: 'терпимо',
  valueTwo: 'очень хорошо',
  step: 1,
  values: wordsArray
};

const config3 = {
  valueOne: 'Two',
  valueTwo: 'Four',
  step: 1,
  values: arrayWithValues,
  isVertical: true
  
}

const root2: HTMLElement = document.querySelector('#root2');
const view2 = new View(root2, config2);
new Presenter(new Model(), view2, config2);

const root3: HTMLElement = document.querySelector('#root3');
const view3 = new View(root3, config3);
new Presenter(new Model(), view3, config3);

const config4 = {
  maxValue: 300,
  minValue: 60,
  valueOne: 60,
  step: 10,
  isVertical: true,
  values: emptyArray
};

const root4: HTMLElement = document.querySelector('#root4');
const view4 = new View(root4, config4);
new Presenter(new Model(), view4, config4);

var $ = require('jquery');

console.log($);

$.fn.customSlider = function(options: IConfig) {
  const view = new View($(this)[0], options);
  const presenter = new Presenter(new Model(), view, options);
  return presenter;
}

$('#root5').customSlider(config2);

$('#root6').customSlider({
  minValue: 0,
  maxValue: 70,
  valueOne: 10,
  valueTwo: 30,
  step: 2,
  isVertical: false,
  values: emptyArray
})




