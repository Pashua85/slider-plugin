// import '../../slider/slider';
// import * as $ from 'jquery';

// (() => {

//   const config1 = {
//     minValue: 0,
//     maxValue: 100,
//     valueOne: 40,
//     valueTwo: 60,
//     isValueOnHoverShown: true
//   };

//   const element: HTMLElement = document.querySelector('.slider-container--one');
//   const slider1 = $(element).customSlider(config1);

//   const exampleOne: HTMLElement = document.querySelector('.example--one');
//   const form = exampleOne.querySelector('.form');
//   const outerInput1_1: HTMLInputElement = document.querySelector('#input-1-1');
//   const outerInput1_2: HTMLInputElement = document.querySelector('#input-1-2');
//   const button3: HTMLInputElement = document.querySelector('#radio-button-1-3');
//   const button12: HTMLInputElement = document.querySelector('#radio-button-1-12');
//   const button13: HTMLInputElement = document.querySelector('#radio-button-1-13');
//   const button14: HTMLInputElement = document.querySelector('#radio-button-1-14');
//   const button15: HTMLInputElement = document.querySelector('#radio-button-1-15');

//   const numberButtons: HTMLInputElement[] = Array.from(exampleOne.querySelectorAll('.input-group__input--for-numbers'));
//   const stringButtons: HTMLInputElement[] = Array.from(exampleOne.querySelectorAll('.input-group__input--for-strings'));

//   slider1.addOuterInputOne(outerInput1_1);
//   slider1.addOuterInputTwo(outerInput1_2);







//   function setUpNumberButtons() {
//     numberButtons.forEach(button => {
//       button.disabled = false;
//     });
//     stringButtons.forEach(button => {
//       button.disabled = true;
//     });
//   };

//   function setUpStringButtons() {
//     numberButtons.forEach(button => {
//       button.disabled = true;
//     });
//     stringButtons.forEach(button => {
//       button.disabled = false;
//     });
//   };

//   function setUpSliderWithNumbers(event: Event) {
//     if((<HTMLInputElement>event.target).checked) {
//       if(button3.checked) {
//         slider1.updateOptions({
//           values: emptyStringArray,
//           valueOne: 40,
//           valueTwo: 60,
//         });
//       } else {
//         slider1.updateOptions({
//           values: emptyStringArray,
//           valueOne: 40
//         });
//       };

//       setUpNumberButtons();

//       if(button15.checked) { 
//         slider1.updateOptions({
//           scaleStep: undefined
//         });
//         button12.checked = true; 
//       };
//     };
//   };

//   function setUpSliderWithStrings(event: Event) {
//     if((<HTMLInputElement>event.target).checked) {
//       if(button3.checked) {
//         slider1.updateOptions({
//           values: latinAlphabet,
//           valueOne: 'f',
//           valueTwo: 's'
//         });
//       } else {
//         slider1.updateOptions({
//           values: latinAlphabet,
//           valueOne: 'f',
//           valueTwo: undefined
//         });
//       };
      
//       setUpStringButtons();

//       if(button13.checked || button14.checked) {
//         slider1.updateOptions({
//           scaleStep: 1
//         });
//         button15.checked = true;
//       }
//     };
//   };

//   function changeSliderRange(event: Event, minValue: number, maxValue: number) {
//     if((<HTMLInputElement>event.target).checked) {
//       slider1.updateOptions({ minValue, maxValue })
//     }
//   };

//   function changeSliderStep(event: Event, value: number) {
//     if((<HTMLInputElement>event.target).checked) {
//       slider1.updateOptions({
//         step: value
//       });
//     } 
//   };

//   function changeScaleStep(event: Event, value: number) {
//     if((<HTMLInputElement>event.target).checked) {
//       slider1.updateOptions({
//         scaleStep: value
//       });
//     }
//   };

//   function changeValueShowing(event: Event, isValueOnHoverShown: boolean, isValueAlwaysShown: boolean) {
//     if((<HTMLInputElement>event.target).checked) {
//       slider1.updateOptions({ isValueOnHoverShown, isValueAlwaysShown });
//     } 
//   };

//   form.addEventListener('change', (event: Event) => {
//     if ((<HTMLElement>event.target).closest('#radio-button-1-1')) {
//       changeSliderDirection(event, false);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-2')) {
//       changeSliderDirection(event, true);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-3')) {
//       addSecondValue(event);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-4')) {
//       removeSecondValue(event);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-5')) {
//       setUpSliderWithNumbers(event);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-6')) {
//       setUpSliderWithStrings(event);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-7')) {
//       changeSliderRange(event, 0, 100);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-8')) {
//       changeSliderRange(event, -60,120);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-9')) {
//       changeSliderStep(event, 1);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-10')) {
//       changeSliderStep(event, 5);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-11')) {
//       changeSliderStep(event, 0.2);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-12')) {
//       changeScaleStep(event, 0);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-13')) {
//       changeScaleStep(event, 10);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-14')) {
//       changeScaleStep(event, 20);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-15')) {
//       changeScaleStep(event, 1);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-16')) {
//       changeValueShowing(event, true, false);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-17')) {
//       changeValueShowing(event, false, false);
//     } else if ((<HTMLElement>event.target).closest('#radio-button-1-18')) {
//       changeValueShowing(event, false, true);
//     }
//   });

// })();

import { Example } from '../../classes/Example';

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
  const exampleElement: HTMLElement = document.querySelector('.example--one');
  const form: HTMLElement = exampleElement.querySelector('.form');
  
  const example1 = new Example(exampleElement, config1);

  form.addEventListener('change', (event: Event) => {
    if ((<HTMLElement>event.target).closest('#radio-button-1-1')) {
      example1.changeSliderDirection(event, false);
    } else if ((<HTMLElement>event.target).closest('#radio-button-1-2')) {
      example1.changeSliderDirection(event, true);
    } else if ((<HTMLElement>event.target).closest('#radio-button-1-3')) {
      example1.addSecondValue(event, 's', 60);
    } else if ((<HTMLElement>event.target).closest('#radio-button-1-4')) {
      example1.removeSecondValue(event);
    } 
  })



})();
















