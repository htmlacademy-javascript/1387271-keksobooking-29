
import { createObjects } from './data.js';
const WIDTH = 45;
const HEIGHT = 40;
const COUNT_BOOKING = 10;
const offerType = {
  flat : 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const OFFER_KEYS = {
  title: 'title',
  address: 'text--address',
  price: 'text--price',
  type: 'type',
  rooms: 'text--capacity',
  guests: 'text--capacity',
  checkin: 'text--time',
  checkout: 'text--time',
  features: 'features',
  description: 'description',
  photos: 'photos',
};
const advertContainer = document.querySelector('.map__canvas');
const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
//создание фото
const createImage = (objectKey) => {
  const newImage = document.createElement('img');
  newImage.classList.add('popup__photo');
  newImage.width = WIDTH;
  newImage.height = HEIGHT;
  newImage.alt = 'Фотография объекта';
  newImage.src = objectKey;
  return newImage;
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
const renderAdvert = ()=>{
  const ArrayofObjects = () => Array.from({length:COUNT_BOOKING}, (_, index)=>createObjects(index));
  const listFragment = document.createDocumentFragment();
  const advertList = ArrayofObjects();
  console.log('advertList',advertList[0],advertList[0].author.avatar);

  const advertElement = advertTemplate.cloneNode(true);
  const popupFeatureItems = advertElement.querySelectorAll('.popup__feature');
  const popupPhotoList = advertElement.querySelector('.popup__photos');
  const popupPhotos = popupPhotoList.querySelector('.popup__photo');

  Object.keys(advertList[0].offer).forEach((key) => {
    if (!key) {
      advertElement.querySelector(`.popup__${OFFER_KEYS[key]}`).remove();
    }
  });
  advertElement.querySelector('.popup__title').textContent = advertList[0].offer.title;
  advertElement.querySelector('.popup__text--address').textContent = advertList[0].offer.address;
  advertElement.querySelector('.popup__text--price').firstChild.data = advertList[0].offer.price;
  advertElement.querySelector('.popup__type').textContent = offerType[advertList[0].offer.type];
  advertElement.querySelector('.popup__description').textContent = advertList[0].offer.description;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertList[0].offer.checkin} выезд до ${advertList[0].offer.checkout}`;
  if (advertList[0].offer.features) {
    const modifiers = advertList[0].offer.features.map((feature) => `popup__feature--${feature}`);
    popupFeatureItems.forEach((popupFeatureItem) => {
      const modifier = popupFeatureItem.classList[1];
      if (!modifiers.includes(modifier)) {
        popupFeatureItem.remove();
      }
    });
  } else {
    advertElement.querySelector('.popup__features').remove();
  }
  if (advertList[0].offer.photos) {
    advertList[0].offer.photos.forEach((photo) => popupPhotoList.appendChild(createImage(photo)));
  } else {
    advertElement.querySelector('.popup__photos').remove();
  }
  popupPhotos.remove();

  if (advertList[0].author.avatar) {
    advertElement.querySelector('.popup__avatar').src = advertList[0].author.avatar;
  } else {
    advertElement.querySelector('.popup__avatar').remove();
  }
  listFragment.appendChild(advertElement);

  advertContainer.appendChild(listFragment);
  return advertContainer;
};

export {renderAdvert};
