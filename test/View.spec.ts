import { View } from '../src/slider/View';
import { Value } from '../src/slider/Model';

describe( 'View', () => {
  
  const container = document.createElement('div');
  container.classList.add('slider-container');
  document.body.appendChild(container);
  
  const emptyArray: string[] = [];
  const params1 = {
    minValue: 0,
    maxValue: 10,
    valueOne: 3,
    valueTwo: 6,
    isVertical: false,
    step: 1,
    values: emptyArray
  };

  const params2 = {
    minValue: 0,
    maxValue: 10,
    valueOne: 4,
    isVertical: true,
    step: 1,
    values: emptyArray
  };

  const params3 = {
    minValue: 0,
    maxValue: 10,
    valueOne: 2,
    valueTwo: 5,
    isVertical: true,
    step: 1,
    values: emptyArray
  };

  beforeEach(() => {
    container.innerHTML = '';
  })

  it('should add slider with interval to root', () => {
    new View(container, params1);
    const sliderElement = container.querySelector('.slider');
    const thumbOne = sliderElement.querySelector('.slider__thumb--one');
    const thumbTwo = sliderElement.querySelector('.slider__thumb--two');
    const intervalBar = sliderElement.querySelector('.slider__interval');
    expect(sliderElement).not.toBe(null);
    expect(thumbOne).not.toBe(null);
    expect(thumbTwo).not.toBe(null);
    expect(intervalBar).not.toBe(null);
  });

  it('should render slider with one value', () => {
    new View(container, params2);
    const sliderElement = container.querySelector('.slider');
    const thumbOne = sliderElement.querySelector('.slider__thumb--one');
    const thumbTwo = sliderElement.querySelector('.slider__thumb--two');
    const intervalBar = sliderElement.querySelector('.slider__interval');
    expect(sliderElement).not.toBe(null);
    expect(thumbOne).not.toBe(null);
    expect(thumbTwo).toBe(null);
    expect(intervalBar).toBe(null);
  });

  it('should add different classes to vertical and horizontal sliders', () => {
    new View(container, params1);
    const sliderElement1 = container.querySelector('.slider');
    const intervalBar1 = sliderElement1.querySelector('.slider__interval');
    expect(sliderElement1.classList).not.toContain('slider--vertical');
    expect(sliderElement1.classList).toContain('slider--horizontal');
    expect(intervalBar1.classList).not.toContain('slider__interval--vertical');
    expect(intervalBar1.classList).toContain('slider__interval--horizontal');
    
    container.innerHTML = '';
    new View(container, params3);
    const sliderElement2  = container.querySelector('.slider');
    const intervalBar2 = sliderElement2.querySelector('.slider__interval');
    expect(sliderElement2.classList).toContain('slider--vertical');
    expect(sliderElement2.classList).not.toContain('slider--horizontal');
    expect(intervalBar2.classList).toContain('slider__interval--vertical');
    expect(intervalBar2.classList).not.toContain('slider__interval--horizontal');
  });
});