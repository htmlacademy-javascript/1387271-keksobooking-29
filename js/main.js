const COUNT_BOOKING = 10;
const NUMBER_OF_DIGITS = 5;
const MAX_ROOMS = 5;
const LAT_RANGE = [35.65000, 35.70000];
const LNG_RANGE = [139.70000, 139.80000];
const MAX_PRICE = 5000;
const MAX_GUESTS = 5;
const HOURS = ['12:00','13:00','14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPE_HOUSE = ['palace','flat','house','bungalow','hotel'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

//генератор случайного целого числа
const getRandomInteger = (x, y) => {
  const lower = Math.ceil(Math.min(x, y));
  const upper = Math.floor(Math.max(x, y));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
//генератор случайного числа в диапозоне c плавающей точкой:
const getRandomFloat = (min, max)=> {
  const str = (Math.random() * (max - min) + min).toFixed(NUMBER_OF_DIGITS);
  return parseFloat(str);
};
//поиск случайного элемента в переданном массиве
const getRandomArrElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// массив строк — массив случайной длины из значений
const randomizeArr = (arr) => {
  const newArr = arr.slice(0);
  const sliceRandomIndex = getRandomInteger(1, newArr.length);
  return newArr.slice(0, sliceRandomIndex);
};
const getImgString = (i)=>{
  ++i;
  const imgNum = i < 10 ? `0${i}` : i;
  return `img/avatars/user${imgNum}.svg`;
};
const getLocation = (a,b)=>{
  const result = getRandomFloat(a,b);
  return result;
};
//создание объектаs
const createObjects = (id)=>({
  autor:getImgString(id),
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
const ArrayofObjects = () => Array.from({length:COUNT_BOOKING}, (_, index)=>createObjects(index));
//console.log(ArrayofObjects());
export {ArrayofObjects};
