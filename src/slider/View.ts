import { IParams } from './slider';
import { Value } from './Model';

 export class View {
  root: HTMLElement;
  params: IParams;
  isWithStrings: boolean;
  range: number;
  marksAmount?: number;
  horizontalMouseMoveOneHandler: () => void;
  horizontalMouseMoveTwoHandler: () => void;
  horizontalTouchMoveOneHandler: () => void;
  horizontalTouchMoveTwoHandler: () => void;
  verticalMouseMoveOneHandler: () => void;
  verticalMouseMoveTwoHandler: () => void;
  verticalTouchMoveOneHandler: () => void;
  verticalTouchMoveTwoHandler: () => void;
  thumbOneMouseUpHandler: () => void;
  thumbTwoMouseUpHandler: () => void;
  thumbOneTouchEndHandler: () => void;
  thumbTwoTouchEndHandler: () => void;
  
  constructor(root: HTMLElement, params: IParams) {
    this.root = root;
    this.params = params;

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
    
    this.initSlider();
    this.setUpIsWithStrings();
    this.setUpRange();

    if(this.params.scaleStep !== undefined && this.params.scaleStep > 0) {
      this.setUpMarksAmount();
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

  setUpMarksAmount(): void {
    if(this.isWithStrings) {
      this.marksAmount = this.range - 1;
    } else {
      this.marksAmount = Math.ceil(this.range / this.params.scaleStep) - 1;
    }
  }

  initSlider():void {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    const thumbOne = document.createElement('div');
    thumbOne.classList.add('slider__thumb');
    thumbOne.classList.add('slider__thumb--one');
    thumbOne.addEventListener('mousedown',event => {
      event.preventDefault();
      this.onThumbOneMouseDown(event);
    });
    thumbOne.addEventListener('touchstart', event => {
      event.preventDefault();
      this.onThumbOneTouchStart(event);
    });

    if(this.params.isVertical) {
      slider.classList.add('slider--vertical');
      thumbOne.classList.add('slider__thumb--vertical');
    } else {
      slider.classList.add('slider--horizontal');
      thumbOne.classList.add('slider__thumb--horizontal');
    };

    if(this.params.isValueAlwaysShown || this.params.isValueOnHoverShown) {
      const valueLabelOne = document.createElement('div');
      valueLabelOne.classList.add('slider__label');
      if(this.params.isVertical) {
        valueLabelOne.classList.add('slider__label--vertical');
      } else {
        valueLabelOne.classList.add('slider__label--horizontal');
      };
      
      if(this.params.isValueAlwaysShown) { valueLabelOne.classList.add('slider__label--always-shown') };
      if(this.params.isValueOnHoverShown) { valueLabelOne.classList.add('slider__label--hover-shown') };

      thumbOne.appendChild(valueLabelOne);
    };
    
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
        event.preventDefault();
        this.onThumbTwoTouchStart(event);
      });
      
      let intervalBar = document.createElement('div');
      intervalBar.classList.add('slider__interval');

      if(this.params.isVertical) {
        thumbTwo.classList.add('slider__thumb--vertical');
        intervalBar.classList.add('slider__interval--vertical');
      } else {
        thumbTwo.classList.add('slider__thumb--horizontal');
        intervalBar.classList.add('slider__interval--horizontal');
      };

      if(this.params.isValueAlwaysShown || this.params.isValueOnHoverShown) {
        let valueLabelTwo = document.createElement('div');
        valueLabelTwo.classList.add('slider__label');

        if(this.params.isVertical) {
          valueLabelTwo.classList.add('slider__label--vertical');
        } else {
          valueLabelTwo.classList.add('slider__label--horizontal');
        };

        if(this.params.isValueAlwaysShown) { valueLabelTwo.classList.add('slider__label--always-shown') };
        if(this.params.isValueOnHoverShown) { valueLabelTwo.classList.add('slider__label--hover-shown') };

        thumbTwo.appendChild(valueLabelTwo);
      }
      
      
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
      };
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
      };
      return newLeft;
    }
  }

  renderThumbOne (value: Value, valueString: string, range: number, shift: number): void {
    const thumb: HTMLElement = this.root.querySelector('.slider__thumb--one');
    if(this.params.isValueAlwaysShown || this.params.isValueOnHoverShown) {
      const label: HTMLElement = thumb.querySelector('.slider__label');
      label.innerHTML = valueString;
    };
    
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

  renderThumbTwo (value: Value, valueString: string, range: number, shift: number): void {
    const thumb: HTMLElement = this.root.querySelector('.slider__thumb--two');
    if(this.params.isValueAlwaysShown || this.params.isValueOnHoverShown) {
      const label: HTMLElement = thumb.querySelector('.slider__label');
      label.innerHTML = valueString;
    };
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
    if(this.params.scaleStep !== undefined && this.params.scaleStep > 0) {
      this.setUpMarksAmount();
    }
  }

  rebootSliderView(): void {
    this.root.innerHTML = '';
    this.initSlider();
    if(this.params.scaleStep !== undefined && this.params.scaleStep > 0) {
      this.initScale(this.renderScale.bind(this));
    }
  };

  // USER INTERACTION  

  onThumbOneMouseDown(event: MouseEvent): void {
    if(this.params.valueTwo !== undefined ) {
      const thumbTwo: HTMLElement = this.root.querySelector('.slider__thumb--two');
      thumbTwo.classList.remove('slider__thumb--top');
    };
    const thumbOne: HTMLElement = this.root.querySelector('.slider__thumb--one');
    thumbOne.classList.add('slider__thumb--top');

    if (this.params.isVertical) {
      document.addEventListener('mousemove', this.verticalMouseMoveOneHandler);
    } else {
      document.addEventListener('mousemove', this.horizontalMouseMoveOneHandler);
    };
    document.addEventListener('mouseup', this.thumbOneMouseUpHandler);
  }

  handleHorizontalMouseMoveOne(event: MouseEvent): void {
    event.preventDefault();
    const eventX = event.clientX;
    this.handleHorizontalMoveOne(eventX);
  }

  handleVerticalMouseMoveOne(event: MouseEvent): void {
    event.preventDefault();
    const eventY = event.clientY;
    this.handleVerticalMoveOne(eventY);
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

  onThumbTwoMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const thumbOne: HTMLElement = this.root.querySelector('.slider__thumb--one');
    const thumbTwo: HTMLElement = this.root.querySelector('.slider__thumb--two');
    thumbOne.classList.remove('slider__thumb--top');
    thumbTwo.classList.add('slider__thumb--top');

    if (this.params.isVertical) {
      document.addEventListener('mousemove', this.verticalMouseMoveTwoHandler);
    } else {
      document.addEventListener('mousemove', this.horizontalMouseMoveTwoHandler);
    };
    document.addEventListener('mouseup', this.thumbTwoMouseUpHandler);
  };

  handleHorizontalMouseMoveTwo(event: MouseEvent): void {
    event.preventDefault();
    const eventX = event.clientX;
    this.handleHorizontalMoveTwo(eventX);
  }

  handleVerticalMouseMoveTwo(event: MouseEvent): void {
    event.preventDefault();
    const eventY = event.clientY;
    this.handleVerticalMoveTwo(eventY);
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

  onThumbOneTouchStart(event: TouchEvent): void {
    event.preventDefault();
    if(this.params.valueTwo !== undefined ) {
      const thumbTwo: HTMLElement = this.root.querySelector('.slider__thumb--two');
      thumbTwo.classList.remove('slider__thumb--top');
    };
    const thumbOne: HTMLElement = this.root.querySelector('.slider__thumb--one');
    thumbOne.classList.add('slider__thumb--top');

    thumbOne.classList.add('slider__thumb--touched');

    if (this.params.isVertical) {
      thumbOne.addEventListener('touchmove', this.verticalTouchMoveOneHandler);
    } else {
      thumbOne.addEventListener('touchmove', this.horizontalTouchMoveOneHandler);
    }
    thumbOne.addEventListener('touchend', this.thumbOneTouchEndHandler);
  }

  handleHorizontalTouchMoveOne(event: TouchEvent): void {
    event.preventDefault();
    const eventX = event.touches[0].clientX;
    this.handleHorizontalMoveOne(eventX);
  }

  handleVerticalTouchMoveOne(event: TouchEvent): void {
    event.preventDefault();
    const eventY = event.touches[0].clientY;
    this.handleVerticalMoveOne(eventY);
  }

  handleThumbOneTouchEnd (event: TouchEvent): void {
    event.preventDefault();
    const thumbOne = this.root.querySelector('.slider__thumb--one');
    thumbOne.classList.remove('slider__thumb--touched');
    if (this.params.isVertical) {
      thumbOne.removeEventListener('touchmove', this.verticalTouchMoveOneHandler);
    } else {
      thumbOne.removeEventListener('touchmove', this.horizontalTouchMoveOneHandler);
    }
    thumbOne.removeEventListener('touchend', this.verticalTouchMoveOneHandler);
  }

  onThumbTwoTouchStart(event: TouchEvent): void {
    event.preventDefault();
    const thumbOne: HTMLElement = this.root.querySelector('.slider__thumb--one');
    const thumbTwo: HTMLElement = this.root.querySelector('.slider__thumb--two');
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

  handleHorizontalTouchMoveTwo(event: TouchEvent): void {
    event.preventDefault();
    const eventX = event.touches[0].clientX;
    this.handleHorizontalMoveTwo(eventX);
  }
  handleVerticalTouchMoveTwo(event: TouchEvent): void {
    event.preventDefault();
    const eventY = event.touches[0].clientY;
    this.handleVerticalMoveTwo(eventY);
  }

  handleThumbTwoTouchEnd (event: TouchEvent): void {
    event.preventDefault();
    const thumbTwo = this.root.querySelector('.slider__thumb--two');
    thumbTwo.classList.remove('slider__thumb--touched');
    if (this.params.isVertical) {
      thumbTwo.removeEventListener('touchmove', this.verticalTouchMoveTwoHandler);
    } else {
      thumbTwo.removeEventListener('touchmove', this.horizontalTouchMoveTwoHandler);
    }
    thumbTwo.removeEventListener('touchend', this.thumbTwoTouchEndHandler);
  }

  handleHorizontalMoveOne(eventX: number): void {};

  handleHorizontalMoveTwo(eventX: number): void {};

  handleVerticalMoveOne(eventY: number): void {};

  handleVerticalMoveTwo(eventY: number): void {};
};



