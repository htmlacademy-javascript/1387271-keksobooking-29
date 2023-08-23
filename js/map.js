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
const otherPinIcon = L.icon({
  iconUrl:'./img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const coordinatesInputElement = document.querySelector('#address');
const resetButtonElement = document.querySelector('.ad-form__reset');
let map = null;
//инициализация карты
const mapInit = ()=>{
  map = L.map('map-canvas')
    .on('load',toActiveForms)
    .setView(TOKIO_LAT_LNG_, ZOOM);
  L.tileLayer(
    TILE_LAYER,{attribution: ATTRIBUTION,}).addTo(map);

  const mainPinMarker = L.marker(TOKIO_LAT_LNG_, {
    draggable: true,
    icon: mainPinIcon,
  });
  mainPinMarker.addTo(map);

  coordinatesInputElement.value = `${TOKIO_LAT_LNG_.lat} ${TOKIO_LAT_LNG_.lng}`;
  mainPinMarker.on('moveend',(evt)=>{
    const lat = Number(evt.target.getLatLng().lat).toFixed(5);
    const lng = Number(evt.target.getLatLng().lng).toFixed(5);
    coordinatesInputElement.value = `${lat} ${lng}`;
    map.setView(evt.target.getLatLng(), ZOOM);
  });
};
const createOtherMarkets = (data)=>{
  const marker = L.marker(
    {
      lat:data.location.lat,
      lng:data.location.lng,
    },
    {
      otherPinIcon,
    },);

  marker.addTo(map);
};

export{mapInit,createOtherMarkets};
