import {debounce} from './util.js';
import{createAdvertsMarkers} from './map.js';
const TIMEOUT = 500;
const ADVERTS_AMOUNT = 10;
const mapFiltersElement = document.querySelector('.map__filters');
const houseTypeElement = mapFiltersElement.querySelector('#housing-type');
const housePriceElement = mapFiltersElement.querySelector('#housing-price');
const ANY = 'any';
const Prices = {
  ANY: {
    minPrice: 0,
    maxPrice: 100000,
  },
  LOW: {
    minPrice: 0,
    maxPrice: 10000,
  },
  MIDDLE: {
    minPrice: 10001,
    maxPrice: 50000,
  },
  HIGH: {
    minPrice: 50001,
    maxPrice: 100000,
  },
};
//функции для фильтрации по типу, цене
const filterByHouseType = (type) => houseTypeElement.value === type || houseTypeElement.value === ANY;
const filterByPrice = (price) =>{
  const priceElement = housePriceElement.value.toUpperCase();
  return price >= Prices[priceElement].minPrice && price <= Prices[priceElement].maxPrice;
};
const filterOffers = (offers, rerenderMarkers) => {
  const filteredOffers = [];
  for (const offer of offers) {
    if (filterByHouseType(offer.offer.type) && filterByPrice(offer.offer.price)){
      filteredOffers.push(offer);
      if (filteredOffers.length >= ADVERTS_AMOUNT) {
        break;
      }
    }
  }
  return rerenderMarkers(filteredOffers.slice(0, 10));
};
const initFilters = (offers) => {
  const onMapFiltersElementChange = debounce(() => filterOffers(offers, createAdvertsMarkers),TIMEOUT);
  mapFiltersElement.addEventListener('change', onMapFiltersElementChange);
};
export {initFilters};
