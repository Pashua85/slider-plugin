import '../../slider/slider';
import * as $ from 'jquery';

(() => {

  const config1 = {
    minValue: 0,
    maxValue: 100,
    valueOne: 40,
    valueTwo: 60
  };

  const slider1 = $('.slider-container--one').customSlider(config1);
  const outerInput1_1: HTMLInputElement = document.querySelector('#input-1-1');
  const outerInput1_2: HTMLInputElement = document.querySelector('#input-1-2');
  const button1: HTMLInputElement = document.querySelector('#radio-button-1-1');
  const button2: HTMLInputElement = document.querySelector('#radio-button-1-2');
  const button3: HTMLInputElement = document.querySelector('#radio-button-1-3');
  const button4: HTMLInputElement = document.querySelector('#radio-button-1-4');

  slider1.addOuterInputOne(outerInput1_1);
  slider1.addOuterInputTwo(outerInput1_2);

  button1.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions ({
        isVertical: false
      })
    };
  });

  button2.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions ({
        isVertical: true
      })
    };
  });

  button3.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.addOuterInputTwo(outerInput1_2);
      slider1.updateOptions ({
        valueTwo: 60
      });
    }
  });

  button4.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      outerInput1_2.value = '';
      slider1.removeAllOuterInputsTwo();
      slider1.updateOptions ({
        valueTwo: undefined
      });
    }
  });



})();











