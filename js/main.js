import './map.js';
import {setAdress, toDisactiveForms,validateForm} from './form.js';
import { setPreviewPictureLoader } from './upload.js';
import { mapInit, onGetDataMap } from './map.js';
toDisactiveForms();
onGetDataMap();
setPreviewPictureLoader();
validateForm();


