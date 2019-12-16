import { IParams } from './slider';
import { Value } from './Model';

 export class View {
  root: HTMLElement;
  params: IParams;
  isWithStrings: boolean;
  range: number;
  marksAmount?: number;

  constructor(root: HTMLElement, params: IParams) {
    this.root = root;
    this.params = params;
    
    this.initSlider();
    this.setUpIsWithStrings();
    this.setUpRange();

    if(this.params.scaleStep !== undefined && this.params.scaleStep > 0) {
      this.marksAmount = Math.ceil(this.range / this.params.scaleStep) - 1;
      this.initScale(this.renderScale.bind(this));
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
    thumbOne.addEventListener('touchstart', event => {
      event.preventDefault();
      this.onThumbOneTouchStart(event);
    })
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
      thumbTwo.addEventListener('touchstart', event => {
        console.log('touched from view');
        event.preventDefault();
        this.onThumbTwoTouchStart(event);
      })
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

  initScale(callback: () => void): void {
    const slider: HTMLElement = this.root.querySelector('.slider');
    
    for(let i = 0; i < this.marksAmount; i++) {
      const mark: HTMLElement = document.createElement('div');
      mark.classList.add('slider__mark');
      mark.classList.add('slider__mark--' + (i + 1).toString());
      slider.appendChild(mark);
    }
    callback();
  }

  renderScale(): void {
    const slider: HTMLElement = this.root.querySelector('.slider');
    const thumb: HTMLElement = this.root.querySelector('.slider__thumb');
    
    for(let i = 0; i < this.marksAmount ; i ++) {
      const mark: HTMLElement = slider.querySelector('.slider__mark--' + (i + 1).toString());
      if(this.params.isVertical) {
        mark.classList.add('slider__mark--vertical');
        const markBottom = (i+1) * this.params.scaleStep * (slider.offsetHeight - (thumb.offsetHeight - slider.offsetWidth) / 2)
          / this.range + slider.offsetWidth/2 - mark.offsetHeight/2;
        mark.style.bottom = markBottom.toString() + 'px';
      } else {
        mark.classList.add('slider__mark--horizontal');
        const markLeft = (i+1) * this.params.scaleStep * (slider.offsetWidth - (thumb.offsetWidth - slider.offsetHeight) / 2)
          / this.range + slider.offsetHeight/2 - mark.offsetWidth/2;
        
        mark.style.left = markLeft.toString() + 'px';
      }
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
        newBottom = valueIndex * height / range - thumbHeight/2;
      } else {
        newBottom = (Number(value) - shift) * (height - (thumbHeight - slider.offsetWidth)/2) / range - (thumbHeight - slider.offsetWidth)/2;
      }
      // if (newBottom < 0) newBottom = 0;
      return newBottom;
    } else {
      const thumbWidth = thumb.offsetWidth;
      const width = slider.offsetWidth;
      let newLeft: number;
      if(this.isWithStrings) {
        const valueIndex = this.params.values.indexOf(String(value));
        newLeft = valueIndex * (width - (thumbWidth - slider.offsetHeight)/2) / range - (thumbWidth - slider.offsetHeight)/2;
      } else {
        newLeft = (Number(value) - shift) * (width - (thumbWidth - slider.offsetHeight)/2) / range - (thumbWidth - slider.offsetHeight)/2;
      }
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
  }

  updateParams(newParams: IParams): void {
    this.params = newParams;
    this.setUpIsWithStrings();
    this.setUpRange();
  }

  rebootSliderView(): void {
    this.root.innerHTML = '';
    this.initSlider();
  };

  onThumbOneMouseDown(event: MouseEvent): void {};
  
  onThumbTwoMouseDown(event: MouseEvent): void {};

  onThumbOneTouchStart(event: TouchEvent): void {};

  onThumbTwoTouchStart(event: TouchEvent): void {};
};



