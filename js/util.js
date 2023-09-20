
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
/*const renderAdvert = ()=>{
  const listFragment = document.createDocumentFragment();
  const advertList = createObjects();

  advertList.forEach((item)=>{
    const advertElement = advertTemplate.cloneNode(true);
    const popupFeatureItems = advertElement.querySelectorAll('.popup__feature');
    const popupPhotoList = advertElement.querySelector('.popup__photos');
    const popupPhotos = popupPhotoList.querySelector('.popup__photo');

    Object.keys(advertList.offer).forEach((key) => {
      if (!key) {
        advertElement.querySelector(`.popup__${OFFER_KEYS[key]}`).remove();
      }
    });
    advertElement.querySelector('title').textContent = item.offer.title;
    advertElement.querySelector('.popup__text--address').textContent = item.offer.address;
    advertElement.querySelector('.popup__text--price').firstChild.data = item.offer.price;
    advertElement.querySelector('.popup__type').textContent = offerType[item.offer.type];
    advertElement.querySelector('.popup__description').textContent = item.offer.description;
    advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin} выезд до ${item.offer.checkout}`;
    if (item.offer.features) {
      const modifiers = item.offer.features.map((feature) => `popup__feature--${feature}`);
      popupFeatureItems.forEach((popupFeatureItem) => {
        const modifier = popupFeatureItem.classList[1];
        if (!modifiers.includes(modifier)) {
          popupFeatureItem.remove();
        }
      });
    } else {
      advertElement.querySelector('.popup__features').remove();
    }
    if (item.offer.photos) {
      item.offer.photos.forEach((photo) => popupPhotoList.appendChild(createImage(photo)));
    } else {
      advertElement.querySelector('.popup__photos').remove();
    }
    popupPhotos.remove();

    if (item.author.avatar) {
      advertElement.querySelector('.popup__avatar').src = item.author.avatar;
    } else {
      advertElement.querySelector('.popup__avatar').remove();
    }
    listFragment.appendChild(advertElement);
  });
  advertContainer.appendChild(listFragment);

};*/
export{getRandomInteger,getRandomArrElement,randomizeArr,getImgString,getLocation,getRandomFloat};
