import { IParams } from './slider';
import { Value } from './Model';

 export class View {
  root: HTMLElement;
  params: IParams;
  isWithStrings: boolean;

  constructor(root: HTMLElement, params: IParams) {
    this.root = root;
    this.params = params;
    
    this.initSlider();
    this.setUpIsWithStrings();
  }

  setUpIsWithStrings(): void {
    this.isWithStrings = this.params.values.length > 0;
  }

  initSlider():void {
    let slider = document.createElement('div');
    slider.classList.add('slider');
    let thumbOne = document.createElement('div');
    thumbOne.classList.add('slider__thumb');
    thumbOne.classList.add('slider__thumb--one');
    thumbOne.addEventListener('mousedown',event => {
      event.preventDefault();
      this.onThumbOneMouseDown(event);
    });
    let valueLabelOne = document.createElement('div');
    valueLabelOne.classList.add('slider__label');

    if(this.params.isVertical) {
      slider.classList.add('slider--vertical');
      thumbOne.classList.add('slider__thumb--vertical');
      valueLabelOne.classList.add('slider__label--vertical');
    } else {
      slider.classList.add('slider--horizontal');
      thumbOne.classList.add('slider__thumb--horizontal');
      valueLabelOne.classList.add('slider__label--horizontal');
    };

    thumbOne.appendChild(valueLabelOne);
    slider.appendChild(thumbOne);

    if(this.params.valueTwo !== undefined) {
      let thumbTwo = document.createElement('div');
      thumbTwo.classList.add('slider__thumb');
      thumbTwo.classList.add('slider__thumb--two');
      thumbTwo.addEventListener('mousedown', event => {
        event.preventDefault();
        this.onThumbTwoMouseDown(event);
      });
      let valueLabelTwo = document.createElement('div');
      valueLabelTwo.classList.add('slider__label');
      let intervalBar = document.createElement('div');
      intervalBar.classList.add('slider__interval');

      if(this.params.isVertical) {
        thumbTwo.classList.add('slider__thumb--vertical');
        valueLabelTwo.classList.add('slider__label--vertical');
        intervalBar.classList.add('slider__interval--vertical');
      } else {
        thumbTwo.classList.add('slider__thumb--horizontal');
        valueLabelTwo.classList.add('slider__label--horizontal');
        intervalBar.classList.add('slider__interval--horizontal');
      }
      
      thumbTwo.appendChild(valueLabelTwo);
      slider.appendChild(thumbTwo);
      slider.appendChild(intervalBar);
    };

    this.root.appendChild(slider);
  }

  renderIntervalBar(): void {
    let slider: HTMLElement = this.root.querySelector('.slider');
    let thumbOne: HTMLElement = slider.querySelector('.slider__thumb--one');
    let thumbTwo: HTMLElement = slider.querySelector('.slider__thumb--two');
    let intervalBar: HTMLElement = slider.querySelector('.slider__interval');
    let interval: number;

    if(this.params.isVertical) {
      interval = thumbOne.getBoundingClientRect().bottom - thumbTwo.getBoundingClientRect().bottom;
      let intervalBottom = slider.getBoundingClientRect().bottom - thumbOne.getBoundingClientRect().bottom + thumbOne.offsetHeight / 2;
      intervalBar.style.height = interval.toString() + 'px';
      intervalBar.style.bottom = intervalBottom.toString() + 'px';
    } else {
      interval = thumbTwo.getBoundingClientRect().left - thumbOne.getBoundingClientRect().left;
      let intervalLeft = thumbOne.getBoundingClientRect().left - slider.getBoundingClientRect().left + thumbOne.offsetWidth / 2;
      intervalBar.style.left = intervalLeft.toString() + 'px';
      intervalBar.style.width = interval.toString() + 'px';
    }
  }

  defineCoords(thumb: HTMLElement,value: Value, range: number, shift: number ): number {
    const slider: HTMLElement = this.root.querySelector('.slider');

    if(this.params.isVertical) {
      const height = slider.offsetHeight;
      const thumbHeight = thumb.offsetHeight;
      let newBottom: number;  
      if(this.isWithStrings) {
        const valueIndex = this.params.values.indexOf(String(value));
        newBottom = valueIndex * height / range - thumbHeight;
      } else {
        newBottom = (Number(value) - shift) * height / range - thumbHeight;
      }
      if (newBottom < 0) newBottom = 0;
      return newBottom;
    } else {
      const width = slider.offsetWidth;
      const thumbWidth = thumb.offsetWidth;
      let newLeft: number;
      if(this.isWithStrings) {
        const valueIndex = this.params.values.indexOf(String(value));
        newLeft = valueIndex * width / range - thumbWidth;
      } else {
        newLeft = (Number(value) - shift) * width / range - thumbWidth;
      }
      if (newLeft < 0) newLeft = 0;
      return newLeft;
    }
  }

  renderThumbOne (value: Value, range: number, shift: number): void {
    const thumb: HTMLElement = this.root.querySelector('.slider__thumb--one');
    const label: HTMLElement = thumb.querySelector('.slider__label');
    label.innerHTML = String(value);
    const newCoords = this.defineCoords(thumb, value, range, shift);

    if(this.params.isVertical) {
      thumb.style.bottom = newCoords.toString() + 'px';
    } else {
      thumb.style.left = newCoords.toString() + 'px';
    }
    if(this.params.valueTwo !== undefined) {
      this.renderIntervalBar();
    }
  }

  renderThumbTwo (value: Value, range: number, shift: number): void {
    const thumb: HTMLElement = this.root.querySelector('.slider__thumb--two');
    const label: HTMLElement = thumb.querySelector('.slider__label');
    label.innerHTML = String(value);
    const newCoords = this.defineCoords(thumb, value, range, shift);

    if(this.params.isVertical) {
      thumb.style.bottom = newCoords.toString() + 'px';
    } else {
      thumb.style.left = newCoords.toString() + 'px';
    }
    this.renderIntervalBar();
    console.log('render 2');
  }

  updateParams(newParams: IParams): void {
    this.params = newParams;
    this.setUpIsWithStrings();
  }

  rebootSliderView(): void {
    this.root.innerHTML = '';
    this.initSlider();
  };

  onThumbOneMouseDown(event: MouseEvent): void {};
  
  onThumbTwoMouseDown(event: MouseEvent): void {};
};



