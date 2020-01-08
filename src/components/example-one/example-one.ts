import '../../slider/slider';
import * as $ from 'jquery';

const config1 = {
  minValue: 0,
  maxValue: 100,
  valueOne: 45,
  valueTwo: 60,
  // isVertical: true
};

const slider1 = $('.slider-container--one').customSlider(config1);
const outerInput1_1 = document.querySelector('#input-1-1');
const outerInput1_2 = document.querySelector('#input-1-2');

slider1.addOuterInputOne(outerInput1_1);
slider1.addOuterInputTwo(outerInput1_2);







