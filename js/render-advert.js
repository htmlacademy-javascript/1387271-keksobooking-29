const WIDTH = 45;
const HEIGHT = 40;

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


const renderAdvert = (dataList)=>{
  const listFragment = document.createDocumentFragment();
  const advertElement = advertTemplate.cloneNode(true);
  const popupFeatureItems = advertElement.querySelectorAll('.popup__feature');
  const popupPhotoList = advertElement.querySelector('.popup__photos');
  const popupPhotos = popupPhotoList.querySelector('.popup__photo');

  Object.keys(dataList.offer).forEach((key) => {
    if (!key) {
      advertElement.querySelector(`.popup__${OFFER_KEYS[key]}`).remove();
    }
  });
  advertElement.querySelector('.popup__title').textContent = dataList.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = dataList.offer.address;
  advertElement.querySelector('.popup__text--price').firstChild.data = dataList.offer.price;
  advertElement.querySelector('.popup__type').textContent = offerType[dataList.offer.type];
  advertElement.querySelector('.popup__description').textContent = dataList.offer.description;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${dataList.offer.checkin} выезд до ${dataList.offer.checkout}`;
  if (dataList.offer.features) {
    const modifiers = dataList.offer.features.map((feature) => `popup__feature--${feature}`);
    popupFeatureItems.forEach((popupFeatureItem) => {
      const modifier = popupFeatureItem.classList[1];
      if (!modifiers.includes(modifier)) {
        popupFeatureItem.remove();
      }
    });
  } else {
    advertElement.querySelector('.popup__features').remove();
  }
  if (dataList.offer.photos) {
    dataList.offer.photos.forEach((photo) => popupPhotoList.appendChild(createImage(photo)));
  } else {
    advertElement.querySelector('.popup__photos').remove();
  }
  popupPhotos.remove();

  if (dataList.author.avatar) {
    advertElement.querySelector('.popup__avatar').src = dataList.author.avatar;
  } else {
    advertElement.querySelector('.popup__avatar').remove();
  }
  listFragment.appendChild(advertElement);

  advertContainer.appendChild(listFragment);
  return advertContainer;
};

export {renderAdvert};
