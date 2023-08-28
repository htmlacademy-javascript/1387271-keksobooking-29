import { renderAdvert } from './render-advert.js';
//import { createObjects } from './data.js';
import {getData} from './api.js';
import { toActiveForms,resetForm} from './form.js';
const COUNT_BOOKING = 10;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const TOKIO_LAT_LNG_ = {
  lat: 35.65952,
  lng: 139.78179,
};
const coordinatesInputElement = document.querySelector('#address');
const resetButtonElement = document.querySelector('.ad-form__reset');
let map = null;
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const otherPinIcon = L.icon({
  iconUrl:'./img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const mainPinMarker = L.marker(TOKIO_LAT_LNG_, {
  draggable: true,
  icon: mainPinIcon,
});

//инициализация карты
const mapInit = ()=>{
  map = L.map('map-canvas')
    .on('load',onGetDataMap)
    .setView(TOKIO_LAT_LNG_, ZOOM);
  L.tileLayer(
    TILE_LAYER,{attribution: ATTRIBUTION,}).addTo(map);

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend',(evt)=>{
    const lat = Number(evt.target.getLatLng().lat).toFixed(5);
    const lng = Number(evt.target.getLatLng().lng).toFixed(5);
    coordinatesInputElement.value = `${lat} ${lng}`;
    map.setView(evt.target.getLatLng(), ZOOM);
  });
};

mapInit();
const markerGroup = L.layerGroup().addTo(map);

//функция по созданию других маркеров
const createOtherMarkets = (data)=>{
  const marker = L.marker(
    {
      lat:data.location.lat,
      lng:data.location.lng,
    },
    {
      otherPinIcon,
    },);
  marker.addTo(markerGroup).
    bindPopup(renderAdvert(data));

};
//создаем маркеры на основе данных полученных с сервера
const createAdvertsMarkers = (data) => {
  map.closePopup();
  markerGroup.clearLayers();
  data.forEach((listElement) => {
    createOtherMarkets(listElement);
  });
};
function onGetDataMap () {
  coordinatesInputElement.value = `${TOKIO_LAT_LNG_.lat} ${TOKIO_LAT_LNG_.lng}`;
  getData(
    (dataList) => {
      createAdvertsMarkers(dataList.slice(0, COUNT_BOOKING));
      toActiveForms();
    },
  );
}
//функция по сбросу значений
const resetData = ()=>{
  mainPinMarker.setLatLng({
    lat: TOKIO_LAT_LNG_.lat,
    lng: TOKIO_LAT_LNG_.lng,
  });
  map.setView(TOKIO_LAT_LNG_, ZOOM);
  map.closePopup();
  resetForm();
  coordinatesInputElement.value = `${TOKIO_LAT_LNG_.lat} ${TOKIO_LAT_LNG_.lng}`;
  onGetDataMap();
};
resetButtonElement.addEventListener('click',resetData);
export {resetData};
