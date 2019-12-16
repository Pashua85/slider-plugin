import './styles.scss';
import * as $ from 'jquery';
import './slider/slider';

const wordsArray = [ 'a', 'b','c', 'd', 'e', 'f', 'j'];
const config2 = {
  minValue: 0,
  maxValue: 100,
  valueOne: 45,
  valueTwo: 60,
  // scaleStep: 1,
  isVertical: true,
  // step: 1,
  // valueTwo: 'f',
  // values: wordsArray
};

const slider1 = $('#root').customSlider(config2);
const outerInput1 = document.querySelector('#outer-input-1');
const outerInput2 = document.querySelector('#outer-input-2');

document.querySelector('#btn').addEventListener('click',() => {
  // slider1.removeOuterInputOne(outerInput1);
  slider1.removeAllOuterInputsTwo();
  console.log(slider1);
});

slider1.addOuterInputOne(outerInput1);
slider1.addOuterInputTwo(outerInput2);


console.log(slider1);




