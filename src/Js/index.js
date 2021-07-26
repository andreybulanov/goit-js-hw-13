import '../sass/main.scss';

import servisApi from '../Js/servisApi';
import refs from '../Js/refs';
import galleryMarkup from '../templates/gallery-item.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basicLightbox/dist/basicLightbox.min.css'

const { form, gallery, loadMoreBtn, loadMoreLabel, loadMoreSpinner } = refs;

form.addEventListener('submit', e => {
  e.preventDefault();

  const input = e.currentTarget.elements.query.value;
  servisApi.query = input.trim();

  if (!servisApi.query) return;
  clearImgGallery();

  servisApi.resetPage();

  fetchMoreImg();

  gallery.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.nodeName === 'IMG') {
        const instance = basicLightbox.create(
            `<img src="${e.target.dataset.source}">`);
      instance.show();
    }
  });

  form.reset();
});

loadMoreBtn.addEventListener('click', fetchMoreImg);

function fetchMoreImg() {
  loadMore.disable();

  servisApi.fetchImg().then(data => {
    renderImageGallery(data);
    loadMore.show();
    loadMore.enable();

    // const element = document.getElementById('.my-element-selector');
    loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });

  // const element = document.getElementById('.my-element-selector');
}

function renderImageGallery(data) {
  const markup = galleryMarkup(data);
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearImgGallery() {
  gallery.innerHTML = '';
}
