import './styles.scss';
import * as $ from 'jquery';
import './slider/slider';


const config2 = {
  minValue: 0,
  maxValue: 300,
  valueOne: 100,
  valueTwo: 200
};

const slider1 = $('#root').customSlider(config2);

console.log(slider1);




