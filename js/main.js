import{TOKIO_LAT_LNG_, mapInit,mainPinInit,createAdvertsMarkers,COUNT_BOOKING} from './map.js';
import {toDisactiveForms,validateForm,setAdress,toActiveForms} from './form.js';
import { setPreviewPictureLoader } from './upload.js';
import { getData } from './api.js';
import { initFilters } from './filter.js';
toDisactiveForms();
setPreviewPictureLoader();
validateForm();
function onGetDataMap () {
  setAdress(TOKIO_LAT_LNG_);
  getData(
    (dataList) => {
      mapInit(setAdress);
      mainPinInit(setAdress);
      createAdvertsMarkers(dataList.slice(0, COUNT_BOOKING));
      initFilters(dataList.slice());
      toActiveForms();
    },
  );
}
onGetDataMap();
export{onGetDataMap};
