import './sass/main.scss';

// import servisApi from '../Js/servisApi';
// import refs from '../Js/refs';
// import galleryMarkup from '../templates/gallery-item.hbs';
// import * as basicLightbox from 'basiclightbox';
// import '../../node_modules/'

const { form, gallery, loadMoreBtn, loadMoreLabel, loadMoreSpinner } = refs;


import fetchImg from '../Js/servisApi';
fetchImg().then(data => console.log(data)
)