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
    let thumbOne = document.createElement('div');
    thumbOne.classList.add('thumb');
    thumbOne.classList.add('thumb--one');
    slider.appendChild(thumbOne);
    
    if(this.config.valueTwo !== undefined) {
      let thumbTwo = document.createElement('div');
      thumbTwo.classList.add('thumb thumb--two');
      slider.appendChild(thumbTwo);
    };

    this.root.appendChild(slider);
  }
};

export {View};

