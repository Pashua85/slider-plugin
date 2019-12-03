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
  horizontalMoveOneHandler: () => void;
  horizontalMoveTwoHandler: () => void;
  thumbOneMouseUpHandler: () => void;
  thumbTwoMouseUpHandler: () => void;
  verticalMoveOneHandler: () => void;
  verticalMoveTwoHandler: () => void;


  constructor(model: Model, view: View, params: IParams) {
    this.model = model;
    this.view = view;
    this.params = params;
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
  
    this.updateValueOne(this.params.valueOne);
    if(params.valueTwo !== undefined) {
      this.updateValueTwo(this.params.valueTwo);
    }
    console.log('isSting', this.isWithStrings);
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

  setNewLeftOne(): number {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let width = slider.offsetWidth;
    let thumb: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    let thumbWidth = thumb.offsetWidth;
    let newLeft: number;
    if(this.isWithStrings) {
      let valueIndex = this.params.values.indexOf(String(this.model.state.valueOne));
      newLeft = valueIndex * width / this.range - thumbWidth;
    } else {
      newLeft = (Number(this.model.state.valueOne) - this.shift) * width / this.range - thumbWidth;
    }
    if (newLeft < 0) { newLeft = 0 };
    return newLeft;
  }

  setNewLeftTwo(): number {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let width = slider.offsetWidth;
    let thumb: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
    let thumbWidth = thumb.offsetWidth;
    let newLeft: number;
    if(this.isWithStrings) {
      let valueIndex = this.params.values.indexOf(String(this.model.state.valueTwo));
      newLeft = valueIndex * width / this.range - thumbWidth;
    } else {
      newLeft = (Number(this.model.state.valueTwo) - this.shift) * width / this.range - thumbWidth;
    }
    if (newLeft < 0) { newLeft = 0 };
    return newLeft;
  }

  setNewBottomOne(): number {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let height = slider.offsetHeight;
    let thumb: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    let thumbHeight = thumb.offsetHeight;
    let newBottom: number;
    if(this.isWithStrings) {
      let valueIndex = this.params.values.indexOf(String(this.model.state.valueOne));
      newBottom = valueIndex * height / this.range - thumbHeight;
    } else {
      newBottom = (Number(this.model.state.valueOne) - this.shift) * height/ this.range - thumbHeight;
    }
    if (newBottom < 0) { newBottom = 0 };
    return newBottom;
  }

  setNewBottomTwo(): number {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let height = slider.offsetHeight;
    let thumb: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
    let thumbHeight = thumb.offsetHeight;
    let newBottom: number;
    if(this.isWithStrings) {
      let valueIndex = this.params.values.indexOf(String(this.model.state.valueTwo));
      newBottom = valueIndex * height / this.range - thumbHeight;
    } else {
      newBottom = (Number(this.model.state.valueTwo) - this.shift) * height/ this.range - thumbHeight;
    }
    if (newBottom < 0) { newBottom = 0 };
    return newBottom;
  }

  updateValueOne(newValue: Value): void {
    this.model.updateValueOne(newValue);
  }

  updateValueTwo(newValue: Value): void {
    this.model.updateValueTwo(newValue);
  }

  onValueOneChange(): void {
    let valueString = typeof this.model.state.valueOne === 'number' ? this.model.state.valueOne.toString() : this.model.state.valueOne;
    if(!this.params.isVertical) {
      let newLeft = this.setNewLeftOne();
      this.view.renderValueOneHorizontaly(newLeft, valueString);
    } else {
      let newBottom = this.setNewBottomOne();
      this.view.renderValueOneVerticaly(newBottom, valueString);
    }
  }

  onValueTwoChange(): void {
    let valueString = typeof this.model.state.valueTwo === 'number' ? this.model.state.valueTwo.toString() : this.model.state.valueTwo;
    if(!this.params.isVertical) {
      let newLeft = this.setNewLeftTwo();
      this.view.renderValueTwoHorizontaly(newLeft, valueString);
    } else {
      let newBottom = this.setNewBottomTwo();
      this.view.renderValueTwoVerticaly(newBottom, valueString);
    }
  }

  onThumbOneMouseDown(event: MouseEvent): void {
    if (this.params.isVertical) {
      document.addEventListener('mousemove', this.verticalMoveOneHandler);
    } else {
      document.addEventListener('mousemove', this.horizontalMoveOneHandler);
    };
    document.addEventListener('mouseup', this.thumbOneMouseUpHandler);
  }

  onThumbTwoMouseDown(event: MouseEvent): void {
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
      rightEdge = thumbTwo.getBoundingClientRect().left - sliderLeft + thumbTwo.offsetWidth / 2;
    } else {
      rightEdge = sliderWidth;
    };
    if(newLeft < 0) { newLeft = 0 };
    if(newLeft > rightEdge) { newLeft = rightEdge };
    
    let newValue = this.range * newLeft / sliderWidth + this.shift;
    console.log('newValue from handle', newValue);
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
    let leftEdge = thumbOne.getBoundingClientRect().left - sliderLeft + thumbOne.offsetWidth + thumbTwo.offsetWidth/2;

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
      topEdge = sliderBottom - thumbTwo.getBoundingClientRect().bottom + thumbOne.offsetHeight / 2;
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
    let bottomEdge: number = sliderBottom - thumbOne.getBoundingClientRect().bottom + thumbOne.offsetHeight + thumbTwo.offsetHeight / 2;

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
    this.view.params = newParams;
    this.view.updateParams(newParams);
    this.view.rebootSliderView();
    this.updateValueOne(this.params.valueOne);
    if(this.params.valueTwo !== undefined) {
      this.updateValueTwo(this.params.valueTwo);
    }
  }
}
