import { IConfig } from './Presenter';

class View {
  root: HTMLElement;
  config: IConfig;

  constructor(root: HTMLElement, config: IConfig) {
    this.root = root;
    this.config = config;
    
    this.initSlider();
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

    if(this.config.isVertical) {
      slider.classList.add('slider--vertical');
      thumbOne.classList.add('slider__thumb--vertical');
    } else {
      slider.classList.add('slider--horizontal');
      thumbOne.classList.add('slider__thumb--horizontal');
    };

    slider.appendChild(thumbOne);

    if(this.config.valueTwo !== undefined) {
      let thumbTwo = document.createElement('div');
      thumbTwo.classList.add('slider__thumb');
      thumbTwo.classList.add('slider__thumb--two');
      thumbTwo.addEventListener('mousedown', event => {
        event.preventDefault();
        this.onThumbTwoMouseDown(event);
      });

      if(this.config.isVertical) {
        thumbTwo.classList.add('slider__thumb--vertical');
      } else {
        thumbTwo.classList.add('slider__thumb--horizontal');
      }
  
      slider.appendChild(thumbTwo);
    };

    this.root.appendChild(slider);
  }

  renderValueOneHorizontaly(newLeft: number): void {
    let thumb: HTMLElement = this.root.querySelector('.slider__thumb--one');
    thumb.style.left = newLeft.toString() + 'px';
  }

  renderValueTwoHorizontaly(newLeft: number): void {
    let thumb: HTMLElement = this.root.querySelector('.slider__thumb--two');
    thumb.style.left = newLeft.toString() + 'px';
  }

  renderValueOneVerticaly(newBottom: number): void {
    let thumb: HTMLElement = this.root.querySelector('.slider__thumb--one');
    thumb.style.bottom = newBottom.toString() + 'px';
  }

  renderValueTwoVerticaly(newBottom: number): void {
    let thumb: HTMLElement = this.root.querySelector('.slider__thumb--two');
    thumb.style.bottom = newBottom.toString() + 'px';
  }

  onThumbOneMouseDown(event: MouseEvent): void {};
  
  onThumbTwoMouseDown(event: MouseEvent): void {};
};

export {View};

