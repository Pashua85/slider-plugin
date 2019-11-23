import { IConfig } from './Presenter';

export class View {
  root: HTMLElement;

  constructor(root: HTMLElement, config: IConfig) {
    this.root = root;
    let slider = document.createElement('div');
    if(!config.isVertical) {
      this.initHorizontalSlider(slider);
    }
  }

  initHorizontalSlider(slider: HTMLElement): void {
    slider.classList.add('slider');
    let thumb = document.createElement('div');
    thumb.classList.add('thumb');
    slider.appendChild(thumb);
    this.root.appendChild(slider);
  }
}

