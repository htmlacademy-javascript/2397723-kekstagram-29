import { generatePhotosArray } from './data.js';
import { renderPictures } from './pictures.js';
import { initUploadForm } from './init-upload-form.js';

const usersPictures = generatePhotosArray();

renderPictures(usersPictures);

initUploadForm();
