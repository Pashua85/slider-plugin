import '../../slider/slider';
import * as $ from 'jquery';

(() => {
  const latinAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const emptyStringArray: string[] = [];
  const config1 = {
    // values: latinAlphabet,
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
  const button5: HTMLInputElement = document.querySelector('#radio-button-1-5');
  const button6: HTMLInputElement = document.querySelector('#radio-button-1-6');

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
      if(slider1.isWithStrings) {
        slider1.updateOptions({
          valueTwo: 's'
        });
      } else {
        slider1.updateOptions({
          valueTwo: 60
        });
      }
    }
  });

  button4.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      outerInput1_2.value = '';
      slider1.removeAllOuterInputsTwo();
      slider1.updateOptions ({
        valueTwo: undefined
      });
    };
  });

  button5.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      if(button3.checked) {
        slider1.updateOptions({
          values: emptyStringArray,
          valueOne: 40,
          valueTwo: 60,
        });
      } else {
        slider1.updateOptions({
          values: emptyStringArray,
          valueOne: 40
        });
      }
    };
  });

  button6.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      if(button3.checked) {
        slider1.updateOptions({
          values: latinAlphabet,
          valueOne: 'f',
          valueTwo: 's'
        });
      } else {
        slider1.updateOptions({
          values: latinAlphabet,
          valueOne: 'f',
          valueTwo: undefined
        });
      };
    };
  });



})();











