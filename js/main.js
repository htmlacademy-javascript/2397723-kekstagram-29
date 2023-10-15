import { initUploadForm } from './upload-form.js';
import { getPictures } from './api.js';
import { filterPicturesList } from './filter-pictures.js';
import { showErrorNotification } from './notifications.js';
import { FETCH_ERROR_MESSAGE } from './pictures.js';


getPictures({
  onSuccess: filterPicturesList,
  onError: showErrorNotification,
  errorMessage: FETCH_ERROR_MESSAGE,
});

initUploadForm();
