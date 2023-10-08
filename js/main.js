import { initUploadForm } from './upload-form.js';
import { request } from './request.js';
import { filterPicturesList } from './filter-pictures.js';


const URL = 'https://29.javascript.pages.academy/kekstagram/data';


const photoData = await request({url: URL, toast: true});

filterPicturesList(photoData);

initUploadForm();
