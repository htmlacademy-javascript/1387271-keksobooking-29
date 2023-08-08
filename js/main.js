const
//генератор  уникального индентификатора
const generatorID = () =>{
  let lastID = 0;
  return () => {
    lastID += 1;
    return lastID;

  };
};
//генератор случайного числа в диапозоне c плавающей точкой:
const getRandomFloat=(min, max)=> {
  const str = (Math.random() * (max - min) + min).toFixed(5);

  return parseFloat(str);
}
//конструктор описания объекта
const createOffer=()=>({

});
//создание объекта
const createObjects=()=>({
  autor:`img/avatars/user0${generatorID()}.svg`,
  offer:createOffer(),
  location:{
    lat:getRandomFloat(35.65000,35.70000),
    lng:getRandomFloat(139.70000,139.80000),
  }

})
