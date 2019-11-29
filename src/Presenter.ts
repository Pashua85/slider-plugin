import { Model, Value } from "./Model";
import { View } from "View";

export interface IConfig {
  valueOne: Value;
  valueTwo?: Value;
  isVertical: boolean;
  maxValue?: number;
  minValue?: number;
  step: number;
};

export class Presenter {
  model: Model;
  view: View;
  config: IConfig;
  range?: number;
  horizontalMoveOneHandler: () => void;
  horizontalMoveTwoHandler: () => void;
  thumbOneMouseUpHandler: () => void;
  thumbTwoMouseUpHandler: () => void;
  verticalMoveOneHandler: () => void;
  verticalMoveTwoHandler: () => void;


  constructor(model: Model, view: View, config: IConfig) {
    this.model = model;
    this.view = view;
    this.config = config;
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

    if(this.config.maxValue !== undefined && this.config.minValue !== undefined) {
      this.range = this.config.maxValue - this.config.minValue;
    }

    this.updateValueOne(this.config.valueOne);
    if(config.valueTwo !== undefined) {
      this.updateValueTwo(config.valueTwo);
    }
  }

  setNewLeftOne(): number {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let width = slider.offsetWidth;
    let thumb: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    let thumbWidth = thumb.offsetWidth;
    let newLeft = this.model.state.valueOne * width / this.range - thumbWidth;
    if (newLeft < 0) { newLeft = 0 };
    return newLeft;
  }

  setNewLeftTwo(): number {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let width = slider.offsetWidth;
    let thumb: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
    let thumbWidth = thumb.offsetWidth;
    let newLeft = this.model.state.valueTwo * width / this.range - thumbWidth;
    if (newLeft < 0) { newLeft = 0 };
    return newLeft;
  }

  setNewBottomOne(): number {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let height = slider.offsetHeight;
    let thumb: HTMLElement = this.view.root.querySelector('.slider__thumb--one');
    let thumbHeight = thumb.offsetHeight;
    let newBottom = this.model.state.valueOne * height/ this.range - thumbHeight;
    if (newBottom < 0) { newBottom = 0 };
    return newBottom;
  }

  setNewBottomTwo(): number {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let height = slider.offsetHeight;
    let thumb: HTMLElement = this.view.root.querySelector('.slider__thumb--two');
    let thumbHeight = thumb.offsetHeight;
    let newBottom = this.model.state.valueTwo * height/ this.range - thumbHeight;
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
    console.log('valueOne was changed', this.model.state.valueOne);
    let valueString = typeof this.model.state.valueOne === 'number' ? this.model.state.valueOne.toString() : this.model.state.valueOne;
    if(!this.config.isVertical) {
      let newLeft = this.setNewLeftOne();
      this.view.renderValueOneHorizontaly(newLeft, valueString);
    } else {
      let newBottom = this.setNewBottomOne();
      this.view.renderValueOneVerticaly(newBottom);
    }
  }

  onValueTwoChange(): void {
    console.log('valueTwo was changed', this.model.state.valueTwo);
    if(!this.config.isVertical) {
      let newLeft = this.setNewLeftTwo();
      this.view.renderValueTwoHorizontaly(newLeft);
    } else {
      let newBottom = this.setNewBottomTwo();
      this.view.renderValueTwoVerticaly(newBottom);
    }
  }

  onThumbOneMouseDown(event: MouseEvent): void {
    if (this.config.isVertical) {
      document.addEventListener('mousemove', this.verticalMoveOneHandler);
    } else {
      document.addEventListener('mousemove', this.horizontalMoveOneHandler);
    };
    document.addEventListener('mouseup', this.thumbOneMouseUpHandler);
  }

  onThumbTwoMouseDown(event: MouseEvent): void {
    if (this.config.isVertical) {
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

    if(this.config.valueTwo !== undefined) {
      let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
      rightEdge = thumbTwo.getBoundingClientRect().left - sliderLeft + thumbTwo.offsetWidth / 2;
    } else {
      rightEdge = sliderWidth;
    };
    if(newLeft < 0) { newLeft = 0 };
    if(newLeft > rightEdge) { newLeft = rightEdge };

    let newValue = this.range * newLeft / sliderWidth;
    this.updateValueOne(this.roundToStep(newValue,this.config.step));
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
    console.log('thumbOne', thumbOne.getBoundingClientRect().left - sliderLeft);
    console.log('leftEdge', leftEdge);

    if(newLeft < leftEdge) { newLeft = leftEdge };
    if(newLeft > rightEdge) { newLeft = rightEdge };

    let newValue = this.range * newLeft / sliderWidth;
    this.updateValueTwo(this.roundToStep(newValue, this.config.step));
  }

  handleVerticalMoveOne(event: MouseEvent): void {
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderBottom: number = slider.getBoundingClientRect().bottom;
    let sliderHeight: number = slider.offsetHeight;
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let newBottom: number = sliderBottom - event.clientY;
    let topEdge: number;

    if(this.config.valueTwo !== undefined) {
      let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
      topEdge = sliderBottom - thumbTwo.getBoundingClientRect().bottom + thumbOne.offsetHeight / 2;
    } else {
      topEdge = sliderHeight;
    }

    if(newBottom < 0) newBottom = 0;
    if(newBottom > topEdge) newBottom = topEdge;
    let newValue = this.range * newBottom / sliderHeight;
    this.updateValueOne(this.roundToStep(newValue,this.config.step));
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
    let newValue = this.range * newBottom / sliderHeight;
    this.updateValueTwo(this.roundToStep(newValue, this.config.step));
  }

  handleThumbOneMouseUp (event: MouseEvent): void {
    event.preventDefault();
    if (this.config.isVertical) {
      document.removeEventListener('mousemove', this.verticalMoveOneHandler);
    } else {
      document.removeEventListener('mousemove', this.horizontalMoveOneHandler);
    }
    document.removeEventListener('mouseup', this.thumbOneMouseUpHandler);
  }

  handleThumbTwoMouseUp (event: MouseEvent): void {
    event.preventDefault();
    if (this.config.isVertical) {
      document.removeEventListener('mousemove', this.verticalMoveTwoHandler);
    } else {
      document.removeEventListener('mousemove', this.horizontalMoveTwoHandler);      
    } 
    document.removeEventListener('mouseup', this.thumbTwoMouseUpHandler);
  }
}
