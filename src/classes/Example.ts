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
  outerInput1: HTMLInputElement;
  outerInput2: HTMLInputElement;

  constructor(root: HTMLElement, config: IConfig, values?: string[]) {
    this.root = root;
    const sliderContainer = this.root.querySelector('.slider-container');
    this.slider = $(sliderContainer).customSlider(config);
    console.log(this.slider)
    this.form = this.root.querySelector('.form');
    this.outerInput1 = this.root.querySelector('.example__input--1');
    this.outerInput2 = this.root.querySelector('.example__input--2');

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
      this.slider.addOuterInputTwo(this.outerInput2);
      if(this.slider.isWithStrings) {
        this.slider.updateOptions({
          valueTwo: stringValue
        });
      } else {
        this.slider.updateOptions({
          valueTwo: numberValue
        });
      }      
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
}

