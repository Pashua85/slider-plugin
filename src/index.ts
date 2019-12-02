import './styles.scss';
import * as $ from 'jquery';
import './slider/slider';
import { emptyArray } from './slider/slider';

const config2 = {
  isVertical: false,
  minValue: 0,
  maxValue: 300,
  valueOne: 100,
  valueTwo: 200,
  step: 1,
  values: emptyArray
};

$('#root').customSlider(config2);
