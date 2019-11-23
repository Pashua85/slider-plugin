import { Model } from "./Model";

interface Config {
  valueOne: number | 'string';
  valueTwo?: number | 'sting'; 
}

export class Presenter {
  model: Model;

  constructor(model: Model, config: Config) {
    this.model = model;
    this.model.updateValueOne(config.valueOne);
  }
}
