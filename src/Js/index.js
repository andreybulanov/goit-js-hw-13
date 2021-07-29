import '../sass/main.scss';

import apiService from '../Js/servisApi';
import refs from '../Js/refs';
import galleryMarkup from '../templates/gallery-item.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basicLightbox/dist/basicLightbox.min.css';
import Notiflix from "notiflix";

const { form, gallery, loadMoreBtn, loadMoreLabel, loadMoreSpinner } = refs;

const loadMore = {
  enable() {
    loadMoreBtn.disabled = false;
    loadMoreLabel.textContent = 'Показать ещё';
    loadMoreSpinner.classList.add('is-hidden');
  },
  disable() {
    loadMoreBtn.disabled = true;
    loadMoreLabel.textContent = 'Загружаем...';
    loadMoreSpinner.classList.remove('is-hidden');
  },
  show() {
    loadMoreBtn.classList.remove('is-hidden');
  },
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const input = e.currentTarget.elements.query.value;
  apiService.query = input.trim();
  
  if (!apiService.query) return;
  clearImgGallery();
  

  apiService.resetPage();

  fetchMoreImg();
  

  gallery.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.nodeName === 'IMG') {
      const instance = basicLightbox.create(`
        <img src="${e.target.dataset.source}">
        `);
      instance.show();
    }
  });

  form.reset();
});

loadMoreBtn.addEventListener('click', fetchMoreImg);

function fetchMoreImg() {
  loadMore.disable();

  apiService.fetchImg().then(data => {
    renderImageGallery(data);
    loadMore.show();
    loadMore.enable();
    
    loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}

function renderImageGallery(data) {
  const markup = galleryMarkup(data);
  gallery.insertAdjacentHTML('beforeend', markup);
  
}

function clearImgGallery() {
  gallery.innerHTML = '';
}

const result = await apiService.fetchImg();
if (apiService.query.trim() === '') {
  clearImgGallery();
  loadMoreBtn.classList.add('is-hidden');
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
} else {
  loadMoreBtn.classList.remove('is-hidden');
  clearImgGallery();
  Notiflix.Notify.success(`"Hooray! We found ${result.totalHits} images."`);
  renderImgGallery(result.hits);
}






// const lenghtHits = gallery.querySelectorAll('.photo-card').length;
// function notification() {
//             lenghtHits >= result.totalHits;
//             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//             loadMoreBtn.classList.add('is-hidden');
//         }

// if  
//  if (newsApiService.query.trim() === ''){
//             clearCardsCounteiner();
//             loadMoreBtn.classList.add('is-hidden');
//             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         } else {  
//             refs.loadMoreBtn.classList.remove('is-hidden');

//             clearCardsCounteiner();
//             Notiflix.Notify.success(`"Hooray! We found ${result.totalHits} images."`);
//             appendCardsMarkup(result.hits);

// async function onSearch(e) {
//   e.preventDefault();
//   imageApiService.resetPage();
//   clearImgContainer();
//   refs.loadMoreBtn.classList.add('hidden')
//   imageApiService.searchQuery = e.currentTarget.elements.searchQuery.value;

//   if (imageApiService.searchQuery === '') {
//     return;
//   };
//   try {
//     const res = await imageApiService.fetchImages()
    

//     appendImageMarkup(res.hits);

//     Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);
    
//     if (res.hits.length === 0) {
//       loadMoreBtn.classList.add('hidden')
//       Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//       return;
//     };
        
//     loadMoreBtn.classList.remove('hidden');
//   }
//    catch (error) {
//         console.log(error);
//     }
// }