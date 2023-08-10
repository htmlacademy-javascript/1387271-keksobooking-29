import {createObjects} from './data.js';
const COUNT_BOOKING = 10;
const ArrayofObjects = () => Array.from({length:COUNT_BOOKING}, (_, index)=>createObjects(index));
console.log(ArrayofObjects());
//export {ArrayofObjects};
