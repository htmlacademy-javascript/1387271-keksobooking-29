import {debounce} from './util.js';
import{createAdvertsMarkers} from './map.js';
const TIMEOUT = 5000;
const ADVERTS_AMOUNT = 10;
const mapFiltersElement = document.querySelector('.map__filters');
const houseTypeElement = mapFiltersElement.querySelector('#housing-type');


const filterByHouseType = (type) => houseTypeElement.value === type;

const filterOffers = (offers, rerenderMarkers) => {
  const filteredOffers = [];
  for (const offer of offers) {
    if (filterByHouseType(offer.offer.type)){/*&&
      filterByPrice(offer.offer.price) &&
      filterByRoomsCount(offer.offer.rooms) &&
      filterByGuestsCount(offer.offer.guests) &&
      filterByFeatures(offer.offer.features))*/

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
