const NUMBER_OF_DIGITS = 5;
const MAX_ROOMS = 5;
const LAT_RANGE = [35.65000, 35.70000];
const LNG_RANGE = [139.70000, 139.80000];
const MAX_PRICE= 5000;
const TYPE_HOUSE=['palace','flat','house','bungalow','hotel'];
//генератор  уникального индентификатора
const generatorID = () =>{
  let lastID = 0;
  return () => {
    lastID += 1;
    return lastID;

  };
};
//генератор случайного целого числа
const getRandomInteger = (x, y) => {
  const lower = Math.ceil(Math.min(x, y));
  const upper = Math.floor(Math.max(x, y));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
//генератор случайного числа в диапозоне c плавающей точкой:
const getRandomFloat=(min, max)=> {
  const str = (Math.random() * (max - min) + min).toFixed(NUMBER_OF_DIGITS);

  return parseFloat(str);
}
//поиск случайного элемента в переданном массиве
const getRandomArrElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
//конструктор описания объекта
/*const createOffer=()=>({
  title:,
  address:,
  price:,
  type:,
  rooms:,
  guests:,
  checkin:,
  checkout:,
  features:,
  description:,
  photos:,
})*/;
//создание объекта
const createObjects=()=>({
  autor:`img/avatars/user0${generatorID()}.svg`,
  offer:{
    title:'Лучшее предложение!',
    address: `${lat} ${lng}`,
    price:getRandomInteger(1,MAX_PRICE),
    type:getRandomArrElement(TYPE_HOUSE),
    rooms:,
    guests:,
    checkin:,
    checkout:,
    features:,
    description:,
    photos:,
  }
  location:{
    lat:getRandomFloat(LAT_RANGE[0],LAT_RANGE[1]),
    lng:getRandomFloat(LNG_RANGE[0],LNG_RANGE[1]),
  }

})
