type Value = number | string;

interface IState {
  valueOne?: Value;
  valueTwo?: Value;
}



export class Model {
  state: IState;

  constructor() {
    this.state = {}
  }

  updateValueOne(newValue: Value): void {
    this.state.valueOne = newValue;
    this.onStateChange();
  }

  updateValueTwo(newValue: Value): void {
    this.state.valueTwo = newValue;
    this.onStateChange();
  }

  onStateChange(): void {}

}