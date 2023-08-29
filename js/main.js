import { generatePhotosArray } from './data.js';
import { renderPictures } from './pictures.js';

const usersPictures = generatePhotosArray();

renderPictures(usersPictures);
