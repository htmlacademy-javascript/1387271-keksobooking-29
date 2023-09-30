import { renderAdvert } from './render-advert.js';
import {getData} from './api.js';
import { activeForm,addformElement,mapfiltersElement,resetForm,setAdress} from './form.js';
import { initFilters } from './filter.js';
const COUNT_BOOKING = 10;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const TOKIO_LAT_LNG_ = {
  lat: 35.65952,
  lng: 139.78179,
};
const resetButtonElement = document.querySelector('.ad-form__reset');
let map = null;
let markerGroup = null;
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
const mapInit = (onMapLoad)=>{
  map = L.map('map-canvas')
    .on('load',() => {
      activeForm(addformElement);
      onMapLoad(TOKIO_LAT_LNG_);
    })
    .setView(TOKIO_LAT_LNG_, ZOOM);
  L.tileLayer(
    TILE_LAYER,{attribution: ATTRIBUTION,}).addTo(map);

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend',(evt)=>{
    const lat = Number(evt.target.getLatLng().lat).toFixed(5);
    const lng = Number(evt.target.getLatLng().lng).toFixed(5);
    setAdress({lat,lng});
    map.setView(evt.target.getLatLng(), ZOOM);
  });
};

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
  if(markerGroup){
    markerGroup.clearLayers();
  }
  markerGroup = L.layerGroup().addTo(map);
  map.closePopup();
  data.forEach((listElement) => {
    createOtherMarkets(listElement,markerGroup);
  });
};
function onGetDataMap () {
  getData(
    (dataList) => {
      mapInit(setAdress);
      createAdvertsMarkers(dataList.slice(0, COUNT_BOOKING));
      initFilters(dataList.slice());
      activeForm(mapfiltersElement);
    },
  );
}
//функция по сбросу значений
const resetAllElements = ()=>{
  mainPinMarker.setLatLng({
    lat: TOKIO_LAT_LNG_.lat,
    lng: TOKIO_LAT_LNG_.lng,
  });
  map.setView(TOKIO_LAT_LNG_, ZOOM);
  map.closePopup();
  resetForm();
  setTimeout(() => {
    setAdress(TOKIO_LAT_LNG_);
  }, 1);
};
resetButtonElement.addEventListener('click',resetAllElements);
export {onGetDataMap,resetAllElements,createAdvertsMarkers,TOKIO_LAT_LNG_};
