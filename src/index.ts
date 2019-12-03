import './styles.scss';
import * as $ from 'jquery';
import './slider/slider';

const wordsArray = [ 'a', 'b','c', 'd', 'e', 'f', 'j'];
const config2 = {
  minValue: 0,
  maxValue: 300,
  valueOne: 100,
};


const slider1 = $('#root').customSlider(config2);
const outerInput = document.querySelector('#outer-input');

document.querySelector('#btn').addEventListener('click',() => {
  slider1.updateOptions({ 
    values: [], 
    valueOne: 40, 
    valueTwo: 90 
  });
  console.log(slider1.range);
});

slider1.addOuterInput(outerInput);

console.log(slider1);




