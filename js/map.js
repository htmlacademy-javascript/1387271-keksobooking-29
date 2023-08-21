import {toActiveForms} from './form.js';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const TOKIO_LAT_LNG_ = {
  lat: 35.65952,
  lng: 139.78179,
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
let map = null;
//инициализация карты
const mapInit = ()=>{
  map = L.map('map-canvas')
    .on('load',toActiveForms)
    .setView(TOKIO_LAT_LNG_, ZOOM);
  L.tileLayer(TILE_LAYER,{
    attribution: ATTRIBUTION,}).addTo(map);
  const mainPinMarker = L.marker(TOKIO_LAT_LNG_, {
    draggable: true,
    icon: mainPinIcon,
  });
  mainPinMarker.addTo(map);
};

export{mapInit};
