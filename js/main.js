import { generatePhotosArray } from './data.js';
import { generatePictures } from './pictures.js';

const usersPictures = generatePhotosArray();

generatePictures(usersPictures);
