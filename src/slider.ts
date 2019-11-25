import './styles.scss';

console.log('form script');

import { View } from './View';
import { Model } from './Model';
import { Presenter } from './Presenter';

const config = {
  maxValue: 10,
  minValue: 0,
  valueOne: 9,
  valueTwo: 6,
  isVertical: false
}

const root: HTMLElement = document.querySelector('#root');

const view = new View(root, config);

new Presenter(new Model(), view, config);
