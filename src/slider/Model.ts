type Value = number | string;

class Model {
  valueOne?: Value;
  valueTwo?: Value

  updateValueOne(newValue: Value): void {
    this.valueOne = newValue;
    this.onValueOneChange();
  }

  updateValueTwo(newValue: Value): void {
    this.valueTwo = newValue;
    this.onValueTwoChange();
  }

  onValueOneChange(): void {}
  onValueTwoChange(): void {}
}

export { Model, Value };