import {getRandomInteger,getRandomArrElement,randomizeArr,getImgString,getLocation,getRandomFloat} from './util.js';

const MAX_ROOMS = 5;
const LAT_RANGE = [35.65000, 35.70000];
const LNG_RANGE = [139.70000, 139.80000];
const MAX_PRICE = 5000;
const MAX_GUESTS = 5;
const HOURS = ['12:00','13:00','14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPE_HOUSE = ['palace','flat','house','bungalow','hotel'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

//создание объекта
const createObjects = (id)=>({
  author:{
    avatar:getImgString(id)},
  offer:{
    title:'Лучшее предложение!',
    address: `${getLocation(LAT_RANGE[0],LAT_RANGE[1])} ${getLocation(LNG_RANGE[0],LNG_RANGE[1])}`,
    price:getRandomInteger(1,MAX_PRICE),
    type:getRandomArrElement(TYPE_HOUSE),
    rooms:getRandomInteger(1,MAX_ROOMS),
    guests:getRandomInteger(1,MAX_GUESTS),
    checkin:getRandomArrElement(HOURS),
    checkout:getRandomArrElement(HOURS),
    features:randomizeArr(FEATURES),
    description:'описание помещения',
    photos:randomizeArr(PHOTOS),
  },
  location:{
    lat:getRandomFloat(LAT_RANGE[0],LAT_RANGE[1]),
    lng:getRandomFloat(LNG_RANGE[0],LNG_RANGE[1]),
  }
});
export {createObjects};
