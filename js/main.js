import './map.js';
import {toDisactiveForms,validateForm} from './form.js';
import { setPreviewPictureLoader } from './upload.js';
import { onGetDataMap } from './map.js';
toDisactiveForms();
onGetDataMap();
setPreviewPictureLoader();
validateForm();


