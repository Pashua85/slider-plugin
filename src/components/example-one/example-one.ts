import '../../slider/slider';
import * as $ from 'jquery';

(() => {
  const latinAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const emptyStringArray: string[] = [];
  const config1 = {
    minValue: 0,
    maxValue: 100,
    valueOne: 40,
    valueTwo: 60
  };

  const slider1 = $('.slider-container--one').customSlider(config1);
  const exampleOne = document.querySelector('.example--one');
  const outerInput1_1: HTMLInputElement = document.querySelector('#input-1-1');
  const outerInput1_2: HTMLInputElement = document.querySelector('#input-1-2');
  const button1: HTMLInputElement = document.querySelector('#radio-button-1-1');
  const button2: HTMLInputElement = document.querySelector('#radio-button-1-2');
  const button3: HTMLInputElement = document.querySelector('#radio-button-1-3');
  const button4: HTMLInputElement = document.querySelector('#radio-button-1-4');
  const button5: HTMLInputElement = document.querySelector('#radio-button-1-5');
  const button6: HTMLInputElement = document.querySelector('#radio-button-1-6');
  const button7: HTMLInputElement = document.querySelector('#radio-button-1-7');
  const button8: HTMLInputElement = document.querySelector('#radio-button-1-8');
  const button9: HTMLInputElement = document.querySelector('#radio-button-1-9');
  const button10: HTMLInputElement = document.querySelector('#radio-button-1-10');
  const button11: HTMLInputElement = document.querySelector('#radio-button-1-11');
  const button12: HTMLInputElement = document.querySelector('#radio-button-1-12');
  const button13: HTMLInputElement = document.querySelector('#radio-button-1-13');
  const button14: HTMLInputElement = document.querySelector('#radio-button-1-14');
  const button15: HTMLInputElement = document.querySelector('#radio-button-1-15');


  const numberButtons: HTMLInputElement[] = Array.from(exampleOne.querySelectorAll('.form__input--for-numbers'));
  const stringButtons: HTMLInputElement[] = Array.from(exampleOne.querySelectorAll('.form__input--for-strings'));

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
      numberButtons.forEach(button => {
        button.disabled = false;
      });
      stringButtons.forEach(button => {
        button.disabled = true;
      });
      if(button15.checked) { 
        slider1.updateOptions({
          scaleStep: undefined
        });
        button12.checked = true; 
      };
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
      numberButtons.forEach(button => {
        button.disabled = true;
      });
      stringButtons.forEach(button => {
        button.disabled = false;
      });

      if(button13.checked || button14.checked) {
        slider1.updateOptions({
          scaleStep: 1
        });
        button15.checked = true;
      }
    };
  });

  button7.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        minValue: 0,
        maxValue: 100
      })
    }
  });

  button8.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        minValue: -60,
        maxValue: 120
      });
    }
  });

  button9.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        step: 1
      });
    }
  });

  button10.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        step: 5
      });
    }
  });

  button11.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        step: 0.2
      });
    }
  });

  button12.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        scaleStep: undefined
      });
    }
  });

  button13.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        scaleStep: 10
      });
    }
  });

  button14.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        scaleStep: 20
      });
    }
  });

  button15.addEventListener('change', (event: Event) => {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        scaleStep: 1
      });
    }
  });

})();











