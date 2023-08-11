
const NUMBER_OF_DIGITS = 5;
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
  return `img/avatars/user${imgNum}.png`;
};
const getLocation = (a,b)=>{
  const result = getRandomFloat(a,b);
  return result;
};
export{getRandomInteger,getRandomArrElement,randomizeArr,getImgString,getLocation,getRandomFloat};
