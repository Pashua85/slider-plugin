import { Model } from "./Model";

export interface IConfig {
  valueOne: number | 'string';
  valueTwo?: number | 'sting'; 
  isVertical: boolean;
};

export class Presenter {
  model: Model;

  constructor(model: Model, config: IConfig) {
    this.model = model;
    this.model.onStateChange = this.onStateChange.bind(this);

    this.model.updateValueOne(config.valueOne);
    if(config.valueTwo !== undefined) {
      this.model.updateValueTwo(config.valueTwo);
    }
  }

  onStateChange() {
    
  }
}
