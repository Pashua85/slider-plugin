// import '../../slider/slider';
// import * as $ from 'jquery';

// (() => {
//   const cyrillicAlphabet = [ 'Аа', 'Бб', 'Вв', 'Гг' , 'Дд', 'Ее', 'Ёё', 'Жж', 'Зз' , 'Ии', 'Йй',
//     'Кк', 'Лл' , 'Мм' , 'Нн', 'Оо', 'Пп', 'Рр', 'Сс', 'Тт', 'Уу', 'Фф', 'Хх', 'Цц', 'Чч', 'Шш', 'Щщ', 'Ъъ', 'Ыы', 'Ьь', 'Ээ', 'Юю', 'Яя'];
//   const emptyStringArray: string[] = [];
//   const config2 = {
//     minValue: 0,
//     maxValue: 30,
//     valueOne: 5,
//     valueTwo: 27,
//     isValueAlwaysShown: true
//   };

//   const slider2 = $('.slider-container--two').customSlider(config2);

//   const exampleTwo: HTMLElement = document.querySelector('.example--two');
//   const form = exampleTwo.querySelector('.form');
//   const outerInput2_1: HTMLInputElement = document.querySelector('#input-2-1');
//   const outerInput2_2: HTMLInputElement = document.querySelector('#input-2-2');
//   const button3: HTMLInputElement = document.querySelector('#radio-button-2-3');
//   const button12: HTMLInputElement = document.querySelector('#radio-button-2-12');
//   const button13: HTMLInputElement = document.querySelector('#radio-button-2-13');
//   const button14: HTMLInputElement = document.querySelector('#radio-button-2-14');
//   const button15: HTMLInputElement = document.querySelector('#radio-button-2-15');

//   const numberButtons: HTMLInputElement[] = Array.from(exampleTwo.querySelectorAll('.input-group__input--for-numbers'));
//   const stringButtons: HTMLInputElement[] = Array.from(exampleTwo.querySelectorAll('.input-group__input--for-strings'));

//   slider2.addOuterInputOne(outerInput2_1);
//   slider2.addOuterInputTwo(outerInput2_2);

//   function changeSliderDirection(event: Event, value: Boolean) {
//     if((<HTMLInputElement>event.target).checked) {
//       slider2.updateOptions ({
//         isVertical: value
//       });
//     };
//   };

//   function addSecondValue(event: Event) {
//     if((<HTMLInputElement>event.target).checked) {
//       slider2.addOuterInputTwo(outerInput2_2);
//       if(slider2.isWithStrings) {
//         slider2.updateOptions({
//           valueTwo: 'Кк'
//         });
//       } else {
//         slider2.updateOptions({
//           valueTwo: 27
//         });
//       }      
//     }
//   };

//   function removeSecondValue(event: Event) {
//     if((<HTMLInputElement>event.target).checked) {
//       outerInput2_2.value = '';
//       slider2.removeAllOuterInputsTwo();
//       slider2.updateOptions ({
//         valueTwo: undefined
//       });
//     }
//   };

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
//         slider2.updateOptions({
//           values: emptyStringArray,
//           valueOne: 40,
//           valueTwo: 60,
//         });
//       } else {
//         slider2.updateOptions({
//           values: emptyStringArray,
//           valueOne: 40
//         });
//       };

//       setUpNumberButtons();

//       if(button15.checked) { 
//         slider2.updateOptions({
//           scaleStep: undefined
//         });
//         button12.checked = true; 
//       };
//     };
//   };


// })();

import { Example } from '../../classes/Example';

(() => {
  const cyrillicAlphabet = [ 'Аа', 'Бб', 'Вв', 'Гг' , 'Дд', 'Ее', 'Ёё', 'Жж', 'Зз' , 'Ии', 'Йй',
    'Кк', 'Лл' , 'Мм' , 'Нн', 'Оо', 'Пп', 'Рр', 'Сс', 'Тт', 'Уу', 'Фф', 'Хх', 'Цц', 'Чч', 'Шш', 'Щщ', 'Ъъ', 'Ыы', 'Ьь', 'Ээ', 'Юю', 'Яя'];
  const latinAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const emptyStringArray: string[] = [];
  const config1 = {
    minValue: 0,
    maxValue: 30,
    valueOne: 12,
    valueTwo: 21,
    step: 0.1,
    isValueOnHoverShown: true
  };
  const exampleElement: HTMLElement = document.querySelector('.example--two');
  const form: HTMLElement = exampleElement.querySelector('.form');
  
  const example1 = new Example(exampleElement, config1);

  form.addEventListener('change', (event: Event) => {
    if ((<HTMLElement>event.target).closest('.radio-button--1')) {
      example1.changeSliderDirection(event, false);
    } else if ((<HTMLElement>event.target).closest('.radio-button--2')) {
      example1.changeSliderDirection(event, true);
    } else if ((<HTMLElement>event.target).closest('.radio-button--3')) {
      example1.addSecondValue(event, 'Тт', 21);
    } else if ((<HTMLElement>event.target).closest('.radio-button--4')) {
      example1.removeSecondValue(event);
    } else if ((<HTMLInputElement>event.target).closest('.radio-button--5')) {
      example1.setUpSliderWithNumbers(event, 12, 21); 
    } else if ((<HTMLInputElement>event.target).closest('.radio-button--6')) {
      example1.setUpSliderWithStrings(event, cyrillicAlphabet, 'Мм', 'Тт');
    }  else if ((<HTMLElement>event.target).closest('.radio-button--7')) {
      example1.changeSliderRange(event, 0, 30);
    } else if ((<HTMLElement>event.target).closest('.radio-button--8')) {
      example1.changeSliderRange(event, -5,25);
    } else if ((<HTMLElement>event.target).closest('.radio-button--9')) {
      example1.changeSliderStep(event, 0.1);
    } else if ((<HTMLElement>event.target).closest('.radio-button--10')) {
      example1.changeSliderStep(event, 0.25);
    } else if ((<HTMLElement>event.target).closest('.radio-button--11')) {
      example1.changeSliderStep(event, 1);
    } else if ((<HTMLElement>event.target).closest('.radio-button--12')) {
      example1.changeScaleStep(event, 0);
    } else if ((<HTMLElement>event.target).closest('.radio-button--13')) {
      example1.changeScaleStep(event, 1.5);
    } else if ((<HTMLElement>event.target).closest('.radio-button--14')) {
      example1.changeScaleStep(event, 3);
    } else if ((<HTMLElement>event.target).closest('.radio-button--15')) {
      example1.changeScaleStep(event, 1);
    }  else if ((<HTMLElement>event.target).closest('.radio-button--16')) {
      example1.changeValueShowing(event, true, false);
    } else if ((<HTMLElement>event.target).closest('.radio-button--17')) {
      example1.changeValueShowing(event, false, false);
    } else if ((<HTMLElement>event.target).closest('.radio-button--18')) {
      example1.changeValueShowing(event, false, true);
    }
  })
})();
