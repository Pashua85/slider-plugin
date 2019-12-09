import { View } from '../src/slider/View';

describe( 'View', () => {
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('slider-container');

  it('should work', () => {
    console.log(sliderContainer);
    expect(true).toBe(true);
  });
});