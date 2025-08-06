import { getData } from './api.js';
import './upload-form.js';
import { renderPictures } from './pictures.js';
import { setOnFormSubmit } from './upload-form.js';
import { closeModal } from './modal-control.js';


getData((pictures) => {
  renderPictures(pictures);
});

setOnFormSubmit(closeModal);
