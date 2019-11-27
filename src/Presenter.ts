import { Model, Value } from "./Model";
import { View } from "View";

export interface IConfig {
  valueOne: Value;
  valueTwo?: Value;
  isVertical: boolean;
  maxValue?: number;
  minValue?: number;
};

export class Presenter {
  model: Model;
  view: View;
  config: IConfig;
  range?: number;
  horizontalMoveOneHandler: () => void;

  constructor(model: Model, view: View, config: IConfig) {
    this.model = model;
    this.view = view;
    this.config = config;
    this.model.onValueOneChange = this.onValueOneChange.bind(this);
    this.model.onValueTwoChange = this.onValueTwoChange.bind(this);
    this.view.onThumbOneMouseDown = this.onThumbOneMouseDown.bind(this);

    this.horizontalMoveOneHandler = this.handleHorizontalMoveOne.bind(this);

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
    if(!this.config.isVertical) {
      let newLeft = this.setNewLeftOne();
      this.view.renderValueOneHorizontaly(newLeft);
    } else {
      let newBottom = this.setNewBottomOne();
      this.view.renderValueOneVerticaly(newBottom);
    }
  }

  onValueTwoChange(): void {
    console.log('valueTwo was changed');
    if(!this.config.isVertical) {
      let newLeft = this.setNewLeftTwo();
      this.view.renderValueTwoHorizontaly(newLeft);
    } else {
      let newBottom = this.setNewBottomTwo();
      this.view.renderValueTwoVerticaly(newBottom);
    }
  }

  onThumbOneMouseDown(event: MouseEvent) {
    document.addEventListener('mousemove', this.horizontalMoveOneHandler);
  }

  handleHorizontalMoveOne(event: MouseEvent) {
    event.preventDefault();
    let slider: HTMLElement = this.view.root.querySelector('.slider');
    let sliderLeft: number = slider.getBoundingClientRect().left;
    let sliderWidth: number = slider.offsetWidth;
    let newLeft: number = event.clientX - sliderLeft;
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let rightEdge: number;

    if(this.config.valueTwo !== undefined) {
      rightEdge = slider.querySelector('.slider__thumb--two').getBoundingClientRect().left - sliderLeft;
    } else {
      rightEdge = sliderWidth;
    };
    if(newLeft < 0) { newLeft = 0 };
    if(newLeft > rightEdge) { newLeft = rightEdge };

    let newValue = this.range * newLeft / sliderWidth;
    this.updateValueOne(newValue);
  }
}
