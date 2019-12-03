type Value = number | string;

interface IState {
  valueOne?: Value;
  valueTwo?: Value;
}

class Model {
  state: IState;

  constructor() {
    this.state = {}
  }

  updateValueOne(newValue: Value): void {
    this.state.valueOne = newValue;
    console.log('newValue from model', this.state.valueOne);
    this.onValueOneChange();
  }

  updateValueTwo(newValue: Value): void {
    this.state.valueTwo = newValue;
    this.onValueTwoChange();
  }

  onValueOneChange(): void {}
  onValueTwoChange(): void {}
}

export { Model, Value };