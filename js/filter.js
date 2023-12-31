import {debounce} from './util.js';
import{createAdvertsMarkers} from './map.js';
const TIMEOUT = 500;
const ADVERTS_AMOUNT = 10;
const mapFiltersElement = document.querySelector('.map__filters');
const DEFAULT_TYPE = 'any';
const PriceRanges = {
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
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');

const filterByHouseType = (type) => housingTypeElement.value === type || housingTypeElement.value === DEFAULT_TYPE;

const filterByPrice = (price) => {
  const priseSelect = housingPriceElement.value.toUpperCase();
  return price >= PriceRanges[priseSelect].minPrice && price <= PriceRanges[priseSelect].maxPrice;
};

const filterByRoomsCount = (roomsCount) => Number(housingRoomsElement.value) === roomsCount || housingRoomsElement.value === DEFAULT_TYPE;
const filterByGuestsCount = (guestsCount) => Number(housingGuestsElement.value) === guestsCount || housingGuestsElement.value === DEFAULT_TYPE;

const filterByFeatures = (features) => {
  const checkBoxFeatures = mapFiltersElement.querySelectorAll('.map__features :checked');
  if (checkBoxFeatures.length && features) {
    return Array.from(checkBoxFeatures).every((checkFeatures) => features.includes(checkFeatures.value));
  }
  return checkBoxFeatures.length === 0;
};
const toCheckAllFilters = (offer)=>filterByHouseType(offer.offer.type) &&
      filterByPrice(offer.offer.price) &&
      filterByRoomsCount(offer.offer.rooms) &&
      filterByGuestsCount(offer.offer.guests) &&
      filterByFeatures(offer.offer.features);

const filterOffers = (offers, rerenderMarkers) => {
  const filteredOffers = [];
  for (const offer of offers) {
    if (toCheckAllFilters(offer)){
      filteredOffers.push(offer);
      if (filteredOffers.length >= ADVERTS_AMOUNT) {
        break;
      }
    }
  }
  return rerenderMarkers(filteredOffers.slice(0, 10));
};

const initFilters = (offers) => {
  const onMapFiltersElementChange = debounce(() => filterOffers(offers, createAdvertsMarkers), TIMEOUT);
  mapFiltersElement.addEventListener('change', onMapFiltersElementChange);
};

export {initFilters};
