import { Example } from '../../classes/Example';

(() => {
  const latinAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const emptyStringArray: string[] = [];
  const config1 = {
    minValue: 0,
    maxValue: 100,
    valueOne: 40,
    valueTwo: 60,
    isValueOnHoverShown: true
  };
  const exampleElement: HTMLElement = document.querySelector('.example--one');
  const form: HTMLElement = exampleElement.querySelector('.form');
  
  const example1 = new Example(exampleElement, config1);

  form.addEventListener('change', (event: Event) => {
    if ((<HTMLElement>event.target).closest('.radio-button--1')) {
      example1.changeSliderDirection(event, false);
    } else if ((<HTMLElement>event.target).closest('.radio-button--2')) {
      example1.changeSliderDirection(event, true);
    } else if ((<HTMLElement>event.target).closest('.radio-button--3')) {
      example1.addSecondValue(event, 's', 60);
    } else if ((<HTMLElement>event.target).closest('.radio-button--4')) {
      example1.removeSecondValue(event);
    } else if ((<HTMLInputElement>event.target).closest('.radio-button--5')) {
      example1.setUpSliderWithNumbers(event, 40, 60); 
    } else if ((<HTMLInputElement>event.target).closest('.radio-button--6')) {
      example1.setUpSliderWithStrings(event, latinAlphabet, 'h', 't');
    }  else if ((<HTMLElement>event.target).closest('.radio-button--7')) {
      example1.changeSliderRange(event, 0, 100);
    } else if ((<HTMLElement>event.target).closest('.radio-button--8')) {
      example1.changeSliderRange(event, -60,120);
    } else if ((<HTMLElement>event.target).closest('.radio-button--9')) {
      example1.changeSliderStep(event, 1);
    } else if ((<HTMLElement>event.target).closest('.radio-button--10')) {
      example1.changeSliderStep(event, 5);
    } else if ((<HTMLElement>event.target).closest('.radio-button--11')) {
      example1.changeSliderStep(event, 0.2);
    } else if ((<HTMLElement>event.target).closest('.radio-button--12')) {
      example1.changeScaleStep(event, 0);
    } else if ((<HTMLElement>event.target).closest('.radio-button--13')) {
      example1.changeScaleStep(event, 10);
    } else if ((<HTMLElement>event.target).closest('.radio-button--14')) {
      example1.changeScaleStep(event, 20);
    } else if ((<HTMLElement>event.target).closest('.radio-button--15')) {
      example1.changeScaleStep(event, 1);
    }  else if ((<HTMLElement>event.target).closest('.radio-button--16')) {
      example1.changeValueShowing(event, true, false);
    } else if ((<HTMLElement>event.target).closest('.radio-button--17')) {
      example1.changeValueShowing(event, false, false);
    } else if ((<HTMLElement>event.target).closest('.radio-button--18')) {
      example1.changeValueShowing(event, false, true);
    }
  })
})();
















