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



//   slider1.addOuterInputOne(outerInput1_1);
//   slider1.addOuterInputTwo(outerInput1_2);















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
    } else if ((<HTMLInputElement>event.target).closest('#radio-button-1-5')) {
      example1.setUpSliderWithNumbers(event, 40, 60);
    } else if ((<HTMLInputElement>event.target).closest('#radio-button-1-6')) {
      example1.setUpSliderWithStrings(event, latinAlphabet, 'h', 't');
    }  else if ((<HTMLElement>event.target).closest('#radio-button-1-7')) {
      example1.changeSliderRange(event, 0, 100);
    } else if ((<HTMLElement>event.target).closest('#radio-button-1-8')) {
      example1.changeSliderRange(event, -60,120);
    } 
  })



})();
















