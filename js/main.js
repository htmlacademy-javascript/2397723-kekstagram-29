import { showAlert } from './fetch-pictures.js';
import { initUploadForm } from './upload-form.js';
import { getPictures } from './api.js';
import { filterPicturesList } from './filter-pictures.js';

getPictures(
  filterPicturesList,
  showAlert,
  'Не удалось загрузить фотографии пользователей',
);

initUploadForm();
