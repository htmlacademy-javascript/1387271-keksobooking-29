import {mapInit} from './map.js';
import { toActiveForms, toDisactiveForms,validateForm} from './form.js';


toDisactiveForms();
mapInit(toActiveForms);
validateForm();


