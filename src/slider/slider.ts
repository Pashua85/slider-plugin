import './slider.scss';
import * as $ from 'jquery';

import { View } from './View';
import { Model, Value } from './Model';
import { Presenter, IConfig } from './Presenter';

(function(jquery) {
  jquery.fn.customSlider = function(options: IConfig) {
    const view = new View(jquery(this)[0], options);
    const presenter = new Presenter(new Model(), view, options);
    return presenter;
  }
})($);


export const emptyArray: Value[] = [];





