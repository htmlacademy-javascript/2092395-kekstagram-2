import { getData } from './api.js';
import './upload-form.js';
import './preview.js';
import { renderPictures } from './pictures.js';
import { setOnFormSubmit } from './upload-form.js';
import { closeModal } from './modal-control.js';
import { setOnFilterClick, turnFilterOn, filterPictures } from './filter.js';

getData((pictures) => {
  turnFilterOn(pictures);
  renderPictures(filterPictures(pictures));
  setOnFilterClick((filteredPictures) => {
    renderPictures(filteredPictures);
  });
});

setOnFormSubmit(closeModal);
