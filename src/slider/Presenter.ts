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
  horizontalMouseMoveOneHandler: () => void;
  horizontalMouseMoveTwoHandler: () => void;
  horizontalTouchMoveOneHandler: () => void;
  horizontalTouchMoveTwoHandler: () => void;
  thumbOneMouseUpHandler: () => void;
  thumbTwoMouseUpHandler: () => void;
  verticalMouseMoveOneHandler: () => void;
  verticalMouseMoveTwoHandler: () => void;
  verticalMoveTwoHandler: () => void;
  verticalTouchMoveOneHandler: () => void;
  verticalTouchMoveTwoHandler: () => void;
  inputOneBlurHandler: () => void;
  inputTwoBlurHandler: () => void;
  thumbOneTouchEndHandler: () => void;
  thumbTwoTouchEndHandler: () => void;

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
    this.view.onThumbOneTouchStart = this.onThumbOneTouchStart.bind(this);
    this.view.onThumbTwoTouchStart = this.onThumbTwoTouchStart.bind(this);

    this.horizontalMouseMoveOneHandler = this.handleHorizontalMouseMoveOne.bind(this);
    this.horizontalMouseMoveTwoHandler = this.handleHorizontalMouseMoveTwo.bind(this);
    this.horizontalTouchMoveOneHandler = this.handleHorizontalTouchMoveOne.bind(this);
    this.horizontalTouchMoveTwoHandler = this.handleHorizontalTouchMoveTwo.bind(this);
    this.verticalMouseMoveOneHandler = this.handleVerticalMouseMoveOne.bind(this);
    this.verticalMouseMoveTwoHandler = this.handleVerticalMouseMoveTwo.bind(this);
    this.verticalTouchMoveOneHandler = this.handleVerticalTouchMoveOne.bind(this);
    this.verticalTouchMoveTwoHandler = this.handleVerticalTouchMoveTwo.bind(this);
    this.thumbOneMouseUpHandler = this.handleThumbOneMouseUp.bind(this);
    this.thumbTwoMouseUpHandler = this.handleThumbTwoMouseUp.bind(this);
    this.thumbOneTouchEndHandler = this.handleThumbOneTouchEnd.bind(this);
    this.thumbTwoTouchEndHandler = this.handleThumbTwoTouchEnd.bind(this);
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
    if(this.validateValueTwo(newValue)) {
      this.model.updateValueTwo(newValue);
    }
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

  validateValueTwo(newValue: Value): boolean {
    if(this.isWithStrings && typeof newValue === 'string' && this.model.state.valueOne === undefined) {

      return this.params.values.indexOf(newValue) !== -1;
      
    } else if(this.isWithStrings && typeof newValue == 'string' && this.model.state.valueOne !== undefined) {

      const newIndex = this.params.values.indexOf(newValue);
      const indexOne = this.params.values.indexOf(String(this.model.state.valueOne));
      return newIndex !== -1 && newIndex >= indexOne;

    } else if(!this.isWithStrings && typeof newValue === 'number' && this.model.state.valueOne === undefined) {

      return newValue >= this.params.minValue && newValue <= this.params.maxValue;

    } else if(!this.isWithStrings && typeof newValue === 'number' && this.model.state.valueOne !== undefined) {

      return newValue >= this.model.state.valueOne && newValue <= this.params.maxValue;

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
      document.addEventListener('mousemove', this.verticalMouseMoveOneHandler);
    } else {
      document.addEventListener('mousemove', this.horizontalMouseMoveOneHandler);
    };
    document.addEventListener('mouseup', this.thumbOneMouseUpHandler);
  }

  onThumbTwoMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const thumbOne: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    const thumbTwo: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
    thumbOne.classList.remove('slider__thumb--top');
    thumbTwo.classList.add('slider__thumb--top');

    if (this.params.isVertical) {
      document.addEventListener('mousemove', this.verticalMouseMoveTwoHandler);
    } else {
      document.addEventListener('mousemove', this.horizontalMouseMoveTwoHandler);
    };
    document.addEventListener('mouseup', this.thumbTwoMouseUpHandler);
  };

  onThumbOneTouchStart(event: TouchEvent): void {
    event.preventDefault();
    if(this.params.valueTwo !== undefined ) {
      const thumbTwo: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
      thumbTwo.classList.remove('slider__thumb--top');
    };
    const thumbOne: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    thumbOne.classList.add('slider__thumb--top');

    thumbOne.classList.add('slider__thumb--touched');

    if (this.params.isVertical) {
      thumbOne.addEventListener('touchmove', this.verticalTouchMoveOneHandler);
    } else {
      thumbOne.addEventListener('touchmove', this.horizontalTouchMoveOneHandler);
    }
    thumbOne.addEventListener('touchend', this.thumbOneTouchEndHandler);
  }

  onThumbTwoTouchStart(event: TouchEvent): void {
    event.preventDefault();
    const thumbOne: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    const thumbTwo: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
    thumbOne.classList.remove('slider__thumb--top');
    thumbTwo.classList.add('slider__thumb--top');
    thumbTwo.classList.add('slider__thumb--touched');

    if(this.params.isVertical) {
      thumbTwo.addEventListener('touchmove', this.verticalTouchMoveTwoHandler);
    } else {
      thumbTwo.addEventListener('touchmove', this.horizontalTouchMoveTwoHandler);
    }
    thumbTwo.addEventListener('touchend', this.thumbTwoTouchEndHandler);
  }

  roundToStep(number: number, step: number): number {
    let roundNumber = Math.round(number/step)*step;
    let stepArray = step.toString().split('.');
    let fractionChars = stepArray.length > 1 ? stepArray[1].length : 0;
    return Number(roundNumber.toFixed(fractionChars));
  }

  handleHorizontalMouseMoveOne(event: MouseEvent): void {
    event.preventDefault();
    const eventX = event.clientX;
    this.handleHorizontalMoveOne(eventX);
  }

  handleHorizontalMouseMoveTwo(event: MouseEvent): void {
    event.preventDefault();
    const eventX = event.clientX;
    this.handleHorizontalMoveTwo(eventX);
  }

  handleHorizontalTouchMoveOne(event: TouchEvent): void {
    event.preventDefault();
    const eventX = event.touches[0].clientX;
    this.handleHorizontalMoveOne(eventX);
  }

  handleHorizontalTouchMoveTwo(event: TouchEvent): void {
    event.preventDefault();
    const eventX = event.touches[0].clientX;
    this.handleHorizontalMoveTwo(eventX);
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
    let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two')
    let rightEdge: number = sliderWidth;
    // topEdge = sliderBottom - thumbTwo.getBoundingClientRect().bottom + (thumbOne.offsetHeight - slider.offsetWidth);
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

  handleVerticalMouseMoveOne(event: MouseEvent): void {
    event.preventDefault();
    const eventY = event.clientY;
    this.handleVerticalMoveOne(eventY);
  }

  handleVerticalMouseMoveTwo(event: MouseEvent): void {
    event.preventDefault();
    const eventY = event.clientY;
    this.handleVerticalMoveTwo(eventY);
  }

  handleVerticalTouchMoveOne(event: TouchEvent): void {
    event.preventDefault();
    const eventY = event.touches[0].clientY;
    this.handleVerticalMoveOne(eventY);
  }

  handleVerticalTouchMoveTwo(event: TouchEvent): void {
    event.preventDefault();
    const eventY = event.touches[0].clientY;
    this.handleVerticalMoveTwo(eventY);
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

  handleThumbOneMouseUp (event: MouseEvent): void {
    event.preventDefault();
    if (this.params.isVertical) {
      document.removeEventListener('mousemove', this.verticalMouseMoveOneHandler);
    } else {
      document.removeEventListener('mousemove', this.horizontalMouseMoveOneHandler);
    }
    document.removeEventListener('mouseup', this.thumbOneMouseUpHandler);
  }

  handleThumbTwoMouseUp (event: MouseEvent): void {
    event.preventDefault();
    if (this.params.isVertical) {
      document.removeEventListener('mousemove', this.verticalMouseMoveTwoHandler);
    } else {
      document.removeEventListener('mousemove', this.horizontalMouseMoveTwoHandler);      
    } 
    document.removeEventListener('mouseup', this.thumbTwoMouseUpHandler);
  }

  handleThumbOneTouchEnd (event: TouchEvent): void {
    event.preventDefault();
    const thumbOne = this.view.root.querySelector('.slider__thumb--one');
    thumbOne.classList.remove('slider__thumb--touched');
    if (this.params.isVertical) {
      thumbOne.removeEventListener('touchmove', this.verticalTouchMoveOneHandler);
    } else {
      thumbOne.removeEventListener('touchmove', this.horizontalTouchMoveOneHandler);
    }
    thumbOne.removeEventListener('touchend', this.verticalTouchMoveOneHandler);
  }

  handleThumbTwoTouchEnd (event: TouchEvent): void {
    event.preventDefault();
    const thumbTwo = this.view.root.querySelector('.slider__thumb--two');
    thumbTwo.classList.remove('slider__thumb--touched');
    if (this.params.isVertical) {
      thumbTwo.removeEventListener('touchmove', this.verticalTouchMoveTwoHandler);
    } else {
      thumbTwo.removeEventListener('touchmove', this.horizontalTouchMoveTwoHandler);
    }
    thumbTwo.removeEventListener('touchend', this.thumbTwoTouchEndHandler);
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
    if(this.validateInputValue(inputValue)) {
      const newValue = this.isWithStrings ? inputValue : Number(inputValue);
      this.updateValueOne(newValue);
    }
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
