import './styles.scss';

console.log('form script');

import { View } from './View';

const config = {
  valueOne: 3,
  isVertical: false
}

const root: HTMLElement = document.querySelector('#root');

new View(root, config);