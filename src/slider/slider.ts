import './slider.scss';
import * as $ from 'jquery';

import { View } from './View';
import { Model, Value } from './Model';
import { Presenter } from './Presenter';

export interface IOptions {
  valueOne: Value;
  valueTwo?: Value;
  isVertical?: boolean;
  maxValue?: number;
  minValue?: number;
  step?: number;
  values?: string[];
};

export interface IParams {
  valueOne: Value;
  valueTwo?: Value;
  isVertical: boolean;
  maxValue: number;
  minValue: number;
  step: number;
  values: string[];
};

const emptyStringArray: string[] = [];
const defaultOptions = {
  step: 1,
  values: emptyStringArray,
  isVertical: false,
  minValue: 0,
  maxValue: 10000
};

(function(jquery) {
  jquery.fn.customSlider = function(options: IOptions) {
    const params: IParams = { ...defaultOptions, ...options};
    const view = new View(jquery(this)[0], params);
    const presenter = new Presenter(new Model(), view, params);
    return presenter;
  }
})($);






