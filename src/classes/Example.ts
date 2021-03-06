import '../slider/slider';
import { Presenter } from '../slider/slider';
import * as $ from 'jquery';

interface IConfig {
  minValue: number,
  maxValue: number,
  valueOne: number,
  valueTwo: number,
  isValueOnHoverShown: boolean
}

export class Example {
  slider: Presenter;
  root: HTMLElement;
  form: HTMLElement;
  button3: HTMLInputElement;
  button12: HTMLInputElement;
  button13: HTMLInputElement;
  button14: HTMLInputElement;
  button15: HTMLInputElement;
  numberButtons: HTMLInputElement[];
  stringButtons: HTMLInputElement[];
  outerInput1: HTMLInputElement;
  outerInput2: HTMLInputElement;

  constructor(root: HTMLElement, config: IConfig, values?: string[]) {
    this.root = root;
    const sliderContainer = this.root.querySelector('.slider-container');
    this.slider = $(sliderContainer).customSlider(config);
    this.form = this.root.querySelector('.form');
    this.button3 = this.form.querySelector('.radio-button--3');
    this.button12 = this.form.querySelector('.radio-button--12');
    this.button13 = this.form.querySelector('.radio-button--13');
    this.button14 = this.form.querySelector('.radio-button--14');
    this.button15 = this.form.querySelector('.radio-button--15');
    this.outerInput1 = this.root.querySelector('.example__input--1');
    this.outerInput2 = this.root.querySelector('.example__input--2');
    this.numberButtons = Array.from(this.root.querySelectorAll('.input-group__input--for-numbers'));
    this.stringButtons = Array.from(this.root.querySelectorAll('.input-group__input--for-strings'));

    this.slider.addOuterInputOne(this.outerInput1);
    this.slider.addOuterInputTwo(this.outerInput2);
  }
  
  changeSliderDirection(event: Event, value: boolean): void {
    if((<HTMLInputElement>event.target).checked) {
      this.slider.updateOptions ({
        isVertical: value
      });
    };
  };

  addSecondValue(event: Event, stringValue: string, numberValue: number) {
    if((<HTMLInputElement>event.target).checked) {
      if(this.slider.isWithStrings) {
        this.slider.updateOptions({
          valueTwo: stringValue
        });
      } else {
        this.slider.updateOptions({
          valueTwo: numberValue
        });
      } 
      this.slider.addOuterInputTwo(this.outerInput2);     
    }
  };

  removeSecondValue(event: Event) {
    if((<HTMLInputElement>event.target).checked) {
      this.outerInput2.value = '';
      this.slider.removeAllOuterInputsTwo();
      this.slider.updateOptions ({
        valueTwo: undefined
      });
    }
  };

  setUpNumberButtons() {
    if (this.numberButtons.length > 0) {
      this.numberButtons.forEach(button => {
        button.disabled = false;
      });
    }
    if (this.stringButtons.length > 0) {
      this.stringButtons.forEach(button => {
        button.disabled = true;
      });
    }
  };

  setUpStringButtons() {
    if (this.numberButtons.length > 0) {
      this.numberButtons.forEach(button => {
        button.disabled = true;
      });
    }
    if (this.stringButtons.length > 0) {
      this.stringButtons.forEach(button => {
        button.disabled = false;
      });
    }
  };

  setUpSliderWithNumbers(event: Event, valueOne: number, valueTwo: number) {
    if((<HTMLInputElement>event.target).checked) {
      if(this.button3.checked) {
        this.slider.updateOptions({
          values: [],
          valueOne,
          valueTwo,
        });
      } else {
        this.slider.updateOptions({
          values: [],
          valueOne,
          valueTwo: undefined
        });
      };

      this.setUpNumberButtons();
      
      this.slider.updateOptions({
        scaleStep: undefined
      });
      this.button12.checked = true;
    };
  };

  setUpSliderWithStrings(event: Event, values: string[], valueOne: string, valueTwo: string) {
    if((<HTMLInputElement>event.target).checked) {
      if(this.button3.checked) {
        this.slider.updateOptions({
          values,
          valueOne,
          valueTwo
        });
      } else {
        this.slider.updateOptions({
          values,
          valueOne,
          valueTwo: undefined
        });
      };
      
      this.setUpStringButtons();

      this.slider.updateOptions({
        scaleStep: undefined
      });
      this.button12.checked = true;
    };
  };

  changeSliderRange(event: Event, minValue: number, maxValue: number) {
    if((<HTMLInputElement>event.target).checked) {
      this.slider.updateOptions({ minValue, maxValue })
    }
  };

  changeSliderStep(event: Event, value: number) {
    if((<HTMLInputElement>event.target).checked) {
      this.slider.updateOptions({
        step: value
      });
    } 
  };

  changeScaleStep(event: Event, value: number) {
    if((<HTMLInputElement>event.target).checked) {
      this.slider.updateOptions({
        scaleStep: value
      });
    }
  };

  changeValueShowing(event: Event, isValueOnHoverShown: boolean, isValueAlwaysShown: boolean) {
    if((<HTMLInputElement>event.target).checked) {
      this.slider.updateOptions({ isValueOnHoverShown, isValueAlwaysShown });
    } 
  };
}

