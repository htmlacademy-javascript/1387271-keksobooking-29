import {createObjects} from './data.js';
import { renderAdvert } from './render-advert.js';
const COUNT_BOOKING = 10;
const ArrayofObjects = () => Array.from({length:COUNT_BOOKING}, (_, index)=>createObjects(index));
console.log(ArrayofObjects());
renderAdvert();
