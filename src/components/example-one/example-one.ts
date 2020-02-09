import '../../slider/slider';
import * as $ from 'jquery';

(() => {
  const latinAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const emptyStringArray: string[] = [];
  const config1 = {
    minValue: 0,
    maxValue: 100,
    valueOne: 40,
    valueTwo: 60,
    isValueOnHoverShown: true
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
  const button16: HTMLInputElement = document.querySelector('#radio-button-1-16');
  const button17: HTMLInputElement = document.querySelector('#radio-button-1-17');
  const button18: HTMLInputElement = document.querySelector('#radio-button-1-18');


  const numberButtons: HTMLInputElement[] = Array.from(exampleOne.querySelectorAll('.form__input--for-numbers'));
  const stringButtons: HTMLInputElement[] = Array.from(exampleOne.querySelectorAll('.form__input--for-strings'));

  slider1.addOuterInputOne(outerInput1_1);
  slider1.addOuterInputTwo(outerInput1_2);

  // НАПРАВЛЕНИЕ СЛАЙДЕРА

  function changeSliderDirection(event: Event, value: Boolean) {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions ({
        isVertical: value
      });
    };
  };

  button1.addEventListener('change', (event: Event) => { changeSliderDirection(event, false)});

  button2.addEventListener('change', (event: Event) => { changeSliderDirection(event, true)});

  // КОЛИЧЕСТВО ЗНАЧЕНИЙ

  function addSecondValue(event: Event) {
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
  };

  function removeSecondValue(event: Event) {
    if((<HTMLInputElement>event.target).checked) {
      outerInput1_2.value = '';
      slider1.removeAllOuterInputsTwo();
      slider1.updateOptions ({
        valueTwo: undefined
      });
    }
  }

  button3.addEventListener('change', (event: Event) => { addSecondValue(event)});

  button4.addEventListener('change', (event: Event) => { removeSecondValue(event)});

  // РАБОТА С ЧИСЛАМИ/СТРОКАМИ

  function setUpNumberButtons() {
    numberButtons.forEach(button => {
      button.disabled = false;
    });
    stringButtons.forEach(button => {
      button.disabled = true;
    });
  };

  function setUpStringButtons() {
    numberButtons.forEach(button => {
      button.disabled = true;
    });
    stringButtons.forEach(button => {
      button.disabled = false;
    });
  };

  function setUpSliderWithNumbers(event: Event) {
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
      };

      setUpNumberButtons();

      if(button15.checked) { 
        slider1.updateOptions({
          scaleStep: undefined
        });
        button12.checked = true; 
      };
    };
  };

  function setUpSliderWithStrings(event: Event) {
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
      
      setUpStringButtons();

      if(button13.checked || button14.checked) {
        slider1.updateOptions({
          scaleStep: 1
        });
        button15.checked = true;
      }
    };
  }

  button5.addEventListener('change', (event: Event) => { setUpSliderWithNumbers(event)});

  button6.addEventListener('change', (event: Event) => { setUpSliderWithStrings(event)});

  // ДИАПАЗОН ЗНАЧЕНИЙ ЧИСЕЛ 

  function changeSliderRange(event: Event, minValue: number, maxValue: number) {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({ minValue, maxValue })
    }
  }

  button7.addEventListener('change', (event: Event) => { changeSliderRange(event, 0, 100)});

  button8.addEventListener('change', (event: Event) => { changeSliderRange(event, -60, 120)});

  // ШАГ СЛАЙДЕРА (ДЛЯ ЧИСЕЛ)

  function changeSliderStep(event: Event, value: number) {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        step: value
      });
    } 
  };

  button9.addEventListener('change', (event: Event) => { changeSliderStep(event, 1)});

  button10.addEventListener('change', (event: Event) => { changeSliderStep(event, 5)});

  button11.addEventListener('change', (event: Event) => { changeSliderStep(event, 0.2)});
  
  //  ШАГ ШКАЛЫ СЛАЙДЕРА

  function changeScaleStep(event: Event, value: number) {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({
        scaleStep: value
      });
    }
  };

  button12.addEventListener('change', (event: Event) => { changeScaleStep(event, 0)});

  button13.addEventListener('change', (event: Event) => { changeScaleStep(event, 10)});

  button14.addEventListener('change', (event: Event) => { changeScaleStep(event, 20)});

  button15.addEventListener('change', (event: Event) => { changeScaleStep(event, 1)});

  // ОТОБРАЖЕНИЕ ЗНАЧЕНИЯ НАД ПОДЗУНКОМ

  function changeValueShowing(event: Event, isValueOnHoverShown: boolean, isValueAlwaysShown: boolean) {
    if((<HTMLInputElement>event.target).checked) {
      slider1.updateOptions({ isValueOnHoverShown, isValueAlwaysShown });
    } 
  }

  button16.addEventListener('change', (event: Event) => { changeValueShowing(event, true, false)});

  button17.addEventListener('change', (event: Event) => { changeValueShowing(event, false, false)});

  button18.addEventListener('change', (event: Event) => { changeValueShowing(event, false, true)});

})();











