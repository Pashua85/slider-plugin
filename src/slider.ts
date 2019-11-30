import './styles.scss';

import { View } from './View';
import { Model } from './Model';
import { Presenter } from './Presenter';

const emptyArray: string[] = [];
const arrayWithValues = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

// const config = {
//   maxValue: 100,
//   minValue: 0,
//   valueOne: 30,
//   valueTwo: 60,
//   step: 1,
//   isVertical: false,
//   values: emptyArray
// }

// const anotherConfig = {
//   maxValue: 10,
//   minValue: 0,
//   valueOne: 0,
//   valueTwo: 5,
//   step: .1, 
//   isVertical: true,
//   values: emptyArray
// }

// const root: HTMLElement = document.querySelector('#root');
// const view = new View(root, config);
// new Presenter(new Model(), view, config);

// const root1: HTMLElement = document.querySelector('#root1');
// const anotherView = new View(root1, anotherConfig);
// new Presenter(new Model(), anotherView, anotherConfig);

const config2 = {
  valueOne: 'Two',
  step: 1,
  isVertical: false,
  values: arrayWithValues
};

const root2: HTMLElement = document.querySelector('#root2');
const view2 = new View(root2, config2);
new Presenter(new Model(), view2, config2);
