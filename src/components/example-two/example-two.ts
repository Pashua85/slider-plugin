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
