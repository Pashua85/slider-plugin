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
  horizontalMoveOneHandler: () => void;
  horizontalMoveTwoHandler: () => void;
  thumbOneMouseUpHandler: () => void;
  thumbTwoMouseUpHandler: () => void;
  verticalMoveOneHandler: () => void;
  verticalMoveTwoHandler: () => void;
  inputOneBlurHandler: () => void;
  inputTwoBlurHandler: () => void;

  constructor(model: Model, view: View, params: IParams) {
    this.model = model;
    this.view = view;
    this.params = params;
    this.outerInputsOne = [];
    this.outerInputsTwo = [];
    this.setUpIsWithStrings();
    this.setUpRange();
    this.setUpShift();

    this.model.onValueOneChange = this.onValueOneChange.bind(this);
    this.model.onValueTwoChange = this.onValueTwoChange.bind(this);
    this.view.onThumbOneMouseDown = this.onThumbOneMouseDown.bind(this);
    this.view.onThumbTwoMouseDown = this.onThumbTwoMouseDown.bind(this);

    this.horizontalMoveOneHandler = this.handleHorizontalMoveOne.bind(this);
    this.horizontalMoveTwoHandler = this.handleHorizontalMoveTwo.bind(this);
    this.thumbOneMouseUpHandler = this.handleThumbOneMouseUp.bind(this);
    this.thumbTwoMouseUpHandler = this.handleThumbTwoMouseUp.bind(this);
    this.verticalMoveOneHandler = this.handleVerticalMoveOne.bind(this);
    this.verticalMoveTwoHandler = this.handleVerticalMoveTwo.bind(this);
    this.inputOneBlurHandler = this.handleInputOneBlur.bind(this);
    this.inputTwoBlurHandler = this.handleInputTwoBlur.bind(this);
  
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

  updateValueOne(newValue: Value): void {
    if(this.validateValueOne(newValue)) {
      this.model.updateValueOne(newValue);
    }
  }

  updateValueTwo(newValue: Value): void {
    this.model.updateValueTwo(newValue);
  }

  validateValueOne(newValue: Value): boolean {
    if(this.isWithStrings && typeof newValue === 'string' && this.model.state.valueTwo === undefined) {

      return this.params.values.indexOf(newValue) !== -1;
      
    } else if(this.isWithStrings && typeof newValue == 'string' && this.model.state.valueTwo !== undefined) {

      const newIndex = this.params.values.indexOf(newValue);
      const indexTwo = this.params.values.indexOf(String(this.model.state.valueTwo));
      return newIndex !== -1 && newIndex <= indexTwo;

    } else if(!this.isWithStrings && typeof newValue === 'number' && this.model.state.valueTwo === undefined) {

      return newValue >= this.params.minValue && newValue <= this.params.maxValue;

    } else if(!this.isWithStrings && typeof newValue === 'number' && this.model.state.valueTwo !== undefined) {

      return newValue >= this.params.minValue && newValue <= this.model.state.valueTwo;

    } else {
      return false;
    }
  }

  onValueOneChange(): void {

    this.view.renderThumbOne(this.model.state.valueOne, this.range, this.shift);

    if(this.outerInputsOne.length > 0) {
      this.outerInputsOne.forEach(input => {
        this.updateOuterInput(input, String(this.model.state.valueOne));
      })
    };
  }

  onValueTwoChange(): void {

    this.view.renderThumbTwo(this.model.state.valueTwo, this.range, this.shift);
  
    if(this.outerInputsTwo.length > 0) {
      this.outerInputsTwo.forEach(input => {
        this.updateOuterInput(input, String(this.model.state.valueTwo));
      })
    };
  }

  onThumbOneMouseDown(event: MouseEvent): void {
    if(this.params.valueTwo !== undefined ) {
      const thumbTwo: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
      thumbTwo.classList.remove('slider__thumb--top');
    };
    const thumbOne: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    thumbOne.classList.add('slider__thumb--top');

    if (this.params.isVertical) {
      document.addEventListener('mousemove', this.verticalMoveOneHandler);
    } else {
      document.addEventListener('mousemove', this.horizontalMoveOneHandler);
    };
    document.addEventListener('mouseup', this.thumbOneMouseUpHandler);
  }

  onThumbTwoMouseDown(event: MouseEvent): void {
    const thumbOne: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    const thumbTwo: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
    thumbOne.classList.remove('slider__thumb--top');
    thumbTwo.classList.add('slider__thumb--top');

    if (this.params.isVertical) {
      document.addEventListener('mousemove', this.verticalMoveTwoHandler);
    } else {
      document.addEventListener('mousemove', this.horizontalMoveTwoHandler);
    };
    document.addEventListener('mouseup', this.thumbTwoMouseUpHandler);
  };

  roundToStep(number: number, step: number): number {
    let roundNumber = Math.round(number/step)*step;
    let stepArray = step.toString().split('.');
    let fractionChars = stepArray.length > 1 ? stepArray[1].length : 0;
    return Number(roundNumber.toFixed(fractionChars));
  }

  handleHorizontalMoveOne(event: MouseEvent): void {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderLeft: number = slider.getBoundingClientRect().left;
    let sliderWidth: number = slider.offsetWidth;
    let newLeft: number = event.clientX - sliderLeft;
    let rightEdge: number;

    if(this.params.valueTwo !== undefined) {
      let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
      let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
      rightEdge = thumbTwo.getBoundingClientRect().left - sliderLeft;
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

  handleHorizontalMoveTwo(event: MouseEvent): void {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderLeft: number = slider.getBoundingClientRect().left;
    let sliderWidth: number = slider.offsetWidth;
    let newLeft: number = event.clientX - sliderLeft;
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two')
    let rightEdge: number = sliderWidth;
    let leftEdge = thumbOne.getBoundingClientRect().left - sliderLeft + thumbOne.offsetWidth;

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

  handleVerticalMoveOne(event: MouseEvent): void {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderBottom: number = slider.getBoundingClientRect().bottom;
    let sliderHeight: number = slider.offsetHeight;
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let newBottom: number = sliderBottom - event.clientY;
    let topEdge: number;

    if(this.params.valueTwo !== undefined) {
      let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
      // rightEdge = thumbTwo.getBoundingClientRect().left - sliderLeft;
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

  handleVerticalMoveTwo (event: MouseEvent): void {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderBottom: number = slider.getBoundingClientRect().bottom;
    let sliderHeight: number = slider.offsetHeight;
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
    let newBottom: number = sliderBottom - event.clientY;
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

  handleThumbOneMouseUp (event: MouseEvent): void {
    event.preventDefault();
    if (this.params.isVertical) {
      document.removeEventListener('mousemove', this.verticalMoveOneHandler);
    } else {
      document.removeEventListener('mousemove', this.horizontalMoveOneHandler);
    }
    document.removeEventListener('mouseup', this.thumbOneMouseUpHandler);
  }

  handleThumbTwoMouseUp (event: MouseEvent): void {
    event.preventDefault();
    if (this.params.isVertical) {
      document.removeEventListener('mousemove', this.verticalMoveTwoHandler);
    } else {
      document.removeEventListener('mousemove', this.horizontalMoveTwoHandler);      
    } 
    document.removeEventListener('mouseup', this.thumbTwoMouseUpHandler);
  }

  updateOptions(options: IAdditionalOptions): void {
    const newParams = {...this.params,...options};
    this.params = newParams;
    this.setUpIsWithStrings();
    this.setUpRange();
    this.setUpShift();
    this.view.updateParams(newParams);
    this.view.rebootSliderView();
    this.updateValueOne(this.params.valueOne);
    if(this.params.valueTwo !== undefined) {
      this.updateValueTwo(this.params.valueTwo);
    }
  }

  addOuterInputOne(input: HTMLInputElement): void {
    input.addEventListener('blur', this.inputOneBlurHandler);
    input.value = String(this.model.state.valueOne);
    this.outerInputsOne.push(input);
  }

  addOuterInputTwo(input: HTMLInputElement): void {
    input.addEventListener('blur', this.inputTwoBlurHandler);
    input.value = String(this.model.state.valueTwo);
    this.outerInputsTwo.push(input);
  }

  handleInputOneBlur(event: Event) {
    const inputValue = (<HTMLInputElement>event.target).value;
    const newValue = this.isWithStrings ? inputValue : Number(inputValue);
    this.updateValueOne(newValue);
  
  }

  handleInputTwoBlur(event: Event) {
    const inputValue = (<HTMLInputElement>event.target).value;
    if(this.validateInputValue(inputValue)) {
      const newValue = this.isWithStrings ? inputValue : Number(inputValue);
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

  updateOuterInput(input: HTMLInputElement, valueString: string) {
    input.value = String(valueString);
  }
}
