import './styles.scss';

import { View } from './View';
import { Model } from './Model';
import { Presenter } from './Presenter';

const config = {
  maxValue: 100,
  minValue: 0,
  valueOne: 30,
  valueTwo: 60,
  step: 1,
  isVertical: false
}

const anotherConfig = {
  maxValue: 10,
  minValue: 0,
  valueOne: 0,
  // valueTwo: 5,
  step: .1, 
  isVertical: true
}

const root: HTMLElement = document.querySelector('#root');
const view = new View(root, config);
new Presenter(new Model(), view, config);

const root1: HTMLElement = document.querySelector('#root1');
const anotherView = new View(root1, anotherConfig);
new Presenter(new Model(), anotherView, anotherConfig);
