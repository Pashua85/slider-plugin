import { Model, Value } from "./Model";
import { View } from "./View";
import { IParams, IAdditionalOptions } from './slider';


export class Presenter {
  model: Model;
  view: View;
  params: IParams;
  range?: number;
  isWithStrings: boolean;
  shift: number;
  outerInputsOne: HTMLInputElement[];
  outerInputsTwo: HTMLInputElement[];
  fractionChars: number;
  thumbOneMouseUpHandler: () => void;
  thumbTwoMouseUpHandler: () => void;
  verticalMouseMoveOneHandler: () => void;
  verticalMouseMoveTwoHandler: () => void;
  verticalMoveTwoHandler: () => void;
  verticalTouchMoveTwoHandler: () => void;
  inputOneBlurHandler: () => void;
  inputTwoBlurHandler: () => void;
  windowResizeHandler: () => void;

  constructor(model: Model, view: View, params: IParams) {
    this.model = model;
    this.view = view;
    this.params = params;
    this.outerInputsOne = [];
    this.outerInputsTwo = [];
    this.setUpIsWithStrings();
    this.setUpRange();
    this.setUpShift();
    this.setUpFractionChars();

    this.model.onValueOneChange = this.onValueOneChange.bind(this);
    this.model.onValueTwoChange = this.onValueTwoChange.bind(this);
    this.view.handleHorizontalMoveOne = this.handleHorizontalMoveOne.bind(this);
    this.view.handleVerticalMoveOne = this.handleVerticalMoveOne.bind(this);
    this.view.handleHorizontalMoveTwo = this.handleHorizontalMoveTwo.bind(this);
    this.view.handleVerticalMoveTwo = this.handleVerticalMoveTwo.bind(this);
    this.inputOneBlurHandler = this.handleInputOneBlur.bind(this);
    this.inputTwoBlurHandler = this.handleInputTwoBlur.bind(this);
    this.windowResizeHandler = this.handleWindowResize.bind(this);

    this.addResizeHandler();
  
    this.updateValueOne(this.params.valueOne);
    if(params.valueTwo !== undefined) {
      this.updateValueTwo(this.params.valueTwo);
    }
  }

  setUpShift(): void {
    if(this.isWithStrings) {
      this.shift = 0;
    } else {
      this.shift = this.params.minValue !== undefined ? this.params.minValue : 0;
    }
  }

  setUpIsWithStrings(): void {
    this.isWithStrings = this.params.values.length > 0;
  }

  setUpRange(): void {
    if(!this.isWithStrings) {
      this.range = this.params.maxValue - this.params.minValue;
    } else {
      this.range = this.params.values.length - 1;
    }
  }

  setUpFractionChars(): void {
    const stepArray = this.params.step.toString().split('.');
    this.fractionChars = stepArray.length > 1 ? stepArray[1].length : 0;
  }

  updateValueOne(newValue: Value): void {
    if(this.validateValueOne(newValue)) {
      this.model.updateValueOne(newValue);
    }
  }

  updateValueTwo(newValue: Value): void {
    if(this.validateValueTwo(newValue)) {
      this.model.updateValueTwo(newValue);
    }
  }

  validateValueOne(newValue: Value): boolean {
    if(this.isWithStrings && typeof newValue === 'string' && this.model.valueTwo === undefined) {
      return this.params.values.indexOf(newValue) !== -1;
    } else if(this.isWithStrings && typeof newValue === 'string' && this.model.valueTwo !== undefined) {
    
      const newIndex = this.params.values.indexOf(newValue);
      if(typeof this.model.valueTwo === 'string') {
        const indexTwo = this.params.values.indexOf(String(this.model.valueTwo));
        return newIndex !== -1 && newIndex <= indexTwo;
      }
      return newIndex !== -1;

    } else if(!this.isWithStrings && typeof newValue === 'number' && this.model.valueTwo === undefined) {
      
      return newValue >= this.params.minValue && newValue <= this.params.maxValue;

    } else if(!this.isWithStrings && typeof newValue === 'number' && this.model.valueTwo !== undefined) {
      // для случая с переходом "на лету" в работе слайдера от строк к числам 
      if(typeof this.model.valueTwo === 'string') {
        return newValue >= this.params.minValue && newValue <= this.params.maxValue;
      }
      ////
      return newValue >= this.params.minValue && newValue <= this.model.valueTwo;

    } else {
      return false;
    }
  }

  validateValueTwo(newValue: Value): boolean {
    if(this.isWithStrings && typeof newValue === 'string' && this.model.valueOne === undefined) {

      return this.params.values.indexOf(newValue) !== -1;
      
    } else if(this.isWithStrings && typeof newValue == 'string' && this.model.valueOne !== undefined) {

      const newIndex = this.params.values.indexOf(newValue);
      const indexOne = this.params.values.indexOf(String(this.model.valueOne));
      return newIndex !== -1 && newIndex >= indexOne;

    } else if(!this.isWithStrings && typeof newValue === 'number' && this.model.valueOne === undefined) {

      return newValue >= this.params.minValue && newValue <= this.params.maxValue;

    } else if(!this.isWithStrings && typeof newValue === 'number' && this.model.valueOne !== undefined) {

      return newValue >= this.model.valueOne && newValue <= this.params.maxValue;

    } else {
      return false;
    }
  }

  onValueOneChange(): void {
    const valueOneString = this.makeValueString(this.model.valueOne);
    this.view.renderThumbOne(this.model.valueOne, valueOneString, this.range, this.shift);

    if(this.outerInputsOne.length > 0) {
      this.outerInputsOne.forEach(input => {
        this.updateOuterInput(input, valueOneString);
      })
    };
  }

  onValueTwoChange(): void {
    if(this.params.valueTwo !== undefined) {
      const valueTwoString = this.makeValueString(this.model.valueTwo)
      this.view.renderThumbTwo(this.model.valueTwo, valueTwoString, this.range, this.shift);

      if(this.outerInputsTwo.length > 0) {
        this.outerInputsTwo.forEach(input => {
          this.updateOuterInput(input, valueTwoString);
        })
      };
    } 
  }

  makeValueString(value: Value): string {
    if (typeof value === 'number') {
      return value.toFixed(this.fractionChars);
    } else {
      return value;
    }
  }

  roundToStep(number: number, step: number): number {
    const roundNumber = Math.round(number/step)*step;
    return Number(roundNumber.toFixed(this.fractionChars));
  }

  handleHorizontalMoveOne(eventX: number): void {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderLeft: number = slider.getBoundingClientRect().left;
    let sliderWidth: number = slider.offsetWidth;
    let newLeft: number = eventX - sliderLeft;
    let rightEdge: number;

    if(this.params.valueTwo !== undefined) {
      let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
      let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
      rightEdge = thumbTwo.getBoundingClientRect().left - sliderLeft + (thumbOne.offsetWidth - slider.offsetHeight);
    } else {
      rightEdge = sliderWidth;
    };
    if(newLeft < 0) { newLeft = 0 };
    if(newLeft > rightEdge) { newLeft = rightEdge };
    
    let newValue = this.range * newLeft / sliderWidth + this.shift;
    if (this.isWithStrings) {
      let newValueIndex = this.roundToStep(newValue, 1);
      this.updateValueOne(this.params.values[newValueIndex]);
    } else {
      this.updateValueOne(this.roundToStep(newValue,this.params.step));
    }
  }

  handleHorizontalMoveTwo(eventX: number): void {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderLeft: number = slider.getBoundingClientRect().left;
    let sliderWidth: number = slider.offsetWidth;
    let newLeft: number = eventX - sliderLeft;
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let rightEdge: number = sliderWidth;
    let leftEdge = thumbOne.getBoundingClientRect().left - sliderLeft + (thumbOne.offsetHeight - slider.offsetWidth);

    if(newLeft < leftEdge) { newLeft = leftEdge };
    if(newLeft > rightEdge) { newLeft = rightEdge };

    let newValue = this.range * newLeft / sliderWidth + this.shift;
    if (this.isWithStrings) {
      let newValueIndex = this.roundToStep(newValue, 1);
      this.updateValueTwo(this.params.values[newValueIndex]);
    } else {
      this.updateValueTwo(this.roundToStep(newValue, this.params.step));
    }
  }

  handleVerticalMoveOne(eventY: number): void {
    const slider: HTMLElement = this.view.root.querySelector('.slider');
    const sliderBottom: number = slider.getBoundingClientRect().bottom;
    const sliderHeight: number = slider.offsetHeight;
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let newBottom = sliderBottom - eventY;
    let topEdge: number;

    if(this.params.valueTwo !== undefined) {
      let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
      topEdge = sliderBottom - thumbTwo.getBoundingClientRect().bottom + (thumbOne.offsetHeight - slider.offsetWidth);
    } else {
      topEdge = sliderHeight;
    }

    if(newBottom < 0) newBottom = 0;
    if(newBottom > topEdge) newBottom = topEdge;
    let newValue = this.range * newBottom / sliderHeight + this.shift;
    if (this.isWithStrings) {
      let newValueIndex = this.roundToStep(newValue, 1);
      this.updateValueOne(this.params.values[newValueIndex]);
    } else {
      this.updateValueOne(this.roundToStep(newValue,this.params.step));
    }
  }

  handleVerticalMoveTwo (eventY: number): void {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderBottom: number = slider.getBoundingClientRect().bottom;
    let sliderHeight: number = slider.offsetHeight;
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
    let newBottom: number = sliderBottom - eventY;
    let bottomEdge: number = sliderBottom - thumbOne.getBoundingClientRect().bottom + (thumbOne.offsetHeight - slider.offsetWidth)/2;

    if(newBottom > sliderHeight) newBottom = sliderHeight;
    if(newBottom < bottomEdge) newBottom = bottomEdge;

    let newValue = this.range * newBottom / sliderHeight + this.shift;
    if (this.isWithStrings) {
      let newValueIndex = this.roundToStep(newValue, 1);
      this.updateValueTwo(this.params.values[newValueIndex]);
    } else {
      this.updateValueTwo(this.roundToStep(newValue,this.params.step));
    }
  }

  updateOptions(options: IAdditionalOptions): void {
    const newParams = {...this.params,...options};
    this.params = newParams;
    this.setUpIsWithStrings();
    this.setUpRange();
    this.setUpShift();
    this.setUpFractionChars();
    this.view.updateParams(newParams);
    this.view.rebootSliderView();
    this.updateValueOne(this.params.valueOne);
    if(this.params.valueTwo !== undefined) {
      this.updateValueTwo(this.params.valueTwo);
    } else {
      //для случая переключения работы слайдера с 2х значений на 1 "на лету"
      this.model.updateValueTwo(this.params.valueTwo);
    }
  }

  addOuterInputOne(input: HTMLInputElement): void {
    input.addEventListener('blur', this.inputOneBlurHandler);
    input.value = this.makeValueString(this.model.valueOne);
    this.outerInputsOne.push(input);
  }

  addOuterInputTwo(input: HTMLInputElement): void {
    if (this.params.valueTwo !== undefined) {
      input.addEventListener('blur', this.inputTwoBlurHandler);
      input.value = this.makeValueString(this.model.valueTwo);
      this.outerInputsTwo.push(input);
    }
  }

  handleInputOneBlur(event: Event) {
    const inputValue = (<HTMLInputElement>event.target).value;
    if(this.validateInputValue(inputValue)) {
      const newValue = this.isWithStrings ? inputValue : Number.parseFloat(inputValue);
      this.updateValueOne(newValue);
    }
  }

  handleInputTwoBlur(event: Event) {
    const inputValue = (<HTMLInputElement>event.target).value;
    if(this.validateInputValue(inputValue)) {
      const newValue = this.isWithStrings ? inputValue : Number.parseFloat(inputValue);
      this.updateValueTwo(newValue);
    }
  }

  removeOuterInputOne(input: HTMLInputElement): void {
    input.removeEventListener('blur', this.inputOneBlurHandler);
    const index = this.outerInputsOne.indexOf(input);
    if(index !== -1) this.outerInputsOne.splice(index, 1);
  }

  removeOuterInputTwo(input: HTMLInputElement): void {
    input.removeEventListener('blur', this.inputTwoBlurHandler);
    const index = this.outerInputsTwo.indexOf(input);
    if(index !== -1) this.outerInputsTwo;
  }

  removeAllOuterInputsOne(): void {
    this.outerInputsOne.forEach(input => {
      input.removeEventListener('blur', this.inputOneBlurHandler);
    });
    this.outerInputsOne = [];
  }

  removeAllOuterInputsTwo(): void {
    this.outerInputsTwo.forEach(input => {
      input.removeEventListener('blur', this.inputTwoBlurHandler);
    });
    this.outerInputsTwo = [];
  }
 
  validateInputValue(inputValue: string): boolean {
    if(this.isWithStrings) {
      return this.params.values.indexOf(inputValue) !== -1;
    } else {
      const inputValueNumber = Number(inputValue);
      return !(Number.isNaN(inputValueNumber)) && inputValueNumber >= this.params.minValue && inputValueNumber <= this.params.maxValue;
    }
  }

  updateOuterInput(input: HTMLInputElement, valueString: string): void {
    input.value = valueString;
  }

  handleWindowResize(): void {
    this.view.renderThumbOne(this.model.valueOne, this.makeValueString(this.model.valueOne), this.range, this.shift);
    if(this.params.valueTwo !== undefined) {
      this.view.renderThumbTwo(this.model.valueTwo, this.makeValueString(this.model.valueTwo), this.range, this.shift);
    }
  }

  addResizeHandler(): void {
    window.addEventListener('resize', this.windowResizeHandler);
  }
}
