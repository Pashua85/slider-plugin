import { IConfig } from './Presenter';

class View {
  root: HTMLElement;
  config: IConfig;

  constructor(root: HTMLElement, config: IConfig) {
    this.root = root;
    this.config = config;
    let slider = document.createElement('div');
    if(!config.isVertical) {
      this.initHorizontalSlider(slider);
    }
  }

  initHorizontalSlider(slider: HTMLElement): void {
    slider.classList.add('slider');
    slider.classList.add('slider--horizontal')
    let thumbOne = document.createElement('div');
    thumbOne.classList.add('slider__thumb');
    thumbOne.classList.add('slider__thumb--one');
    slider.appendChild(thumbOne);
    
    if(this.config.valueTwo !== undefined) {
      let thumbTwo = document.createElement('div');
      thumbOne.classList.add('slider__thumb');
      thumbOne.classList.add('slider__thumb--two');
      slider.appendChild(thumbTwo);
    };

    this.root.appendChild(slider);
  }

  renderValueOneHorizontaly(newLeft: number): void {
    let thumb: HTMLElement = this.root.querySelector('.slider__thumb--one');
    thumb.style.left = newLeft.toString() + 'px';
  }
};

export {View};

