import {mapInit,createOtherMarkets} from './map.js';
import { toDisactiveForms,validateForm} from './form.js';
import { createObjects } from './data.js';
const COUNT_BOOKING = 10;
const ArrayofObjects = () => Array.from({length:COUNT_BOOKING}, (_, index)=> createObjects(index));
const advertList = ArrayofObjects();
toDisactiveForms();
mapInit();
advertList.forEach((data) =>{
  createOtherMarkets(data);
});
validateForm();


