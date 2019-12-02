import './styles.scss';
import * as $ from 'jquery';
import './slider/slider';


const config2 = {
  minValue: 0,
  maxValue: 300,
  valueOne: 100,
  // valueTwo: 200
};

const wordsArray = [ 'a', 'b','c', 'd', 'e', 'f', 'j'];
const slider1 = $('#root').customSlider(config2);

console.log(slider1.params);
console.log(slider1.range);
console.log(slider1.values);

document.querySelector('#btn').addEventListener('click',() => {
  slider1.updateParams({ valueOne: 50 });
  console.log(slider1.range);
  console.log(slider1.values);
});




