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
  // isVertical: true,
  // step: 1,
  // valueTwo: 'f',
  // values: wordsArray
};

const slider1 = $('#container-1').customSlider(config2);
const outerInput1 = document.querySelector('#outer-input-1');
const outerInput2 = document.querySelector('#outer-input-2');
const outerInput3 = document.querySelector('#outer-input-3');
const outerInput4 = document.querySelector('#outer-input-4');

// document.querySelector('#btn').addEventListener('click',() => {
//   // slider1.removeOuterInputOne(outerInput1);
//   // slider1.removeAllOuterInputsTwo();
//   // console.log(slider1);
//   slider1.updateOptions({ scaleStep: 5 });
//   console.log(slider1);
// });

slider1.addOuterInputOne(outerInput1);
slider1.addOuterInputOne(outerInput2);
slider1.addOuterInputTwo(outerInput3);
slider1.addOuterInputTwo(outerInput4);


console.log(slider1);




