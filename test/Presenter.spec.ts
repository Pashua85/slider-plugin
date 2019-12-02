import { Presenter } from '../src/slider/Presenter';
import { Model } from '../src/slider/Model';
import { View } from '../src/slider/View';

describe('Presenter', () => {

  let root = document.createElement('div');
  let config, model: Model, presenter: Presenter, view: View;

  beforeEach(() => {
    config = { 
      valueOne: 17, 
      valueTwo: 45, 
      isVertical: false, 
      step: 1,
      values: []
    };
    model = new Model();
    view = new View(root, config);
    presenter = new Presenter(model, view, config);
  });

  it('should set up values in model on initialisation', () => {
    expect(presenter.model.state.valueOne).toBe(17); 
    expect(presenter.model.state.valueTwo).toBe(45);
  }); 

  it('should update values', () => {
    presenter.updateValueOne(3);
    presenter.updateValueTwo(4);
    expect(presenter.model.state.valueOne).toBe(3);
    expect(presenter.model.state.valueTwo).toBe(4);
  });
})