import './sass/main.scss';
import NewsApiService from './apiService';
import Notiflix from 'notiflix';
import cards from './templates/cards.hbs';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/src/simple-lightbox.scss';

const gallery = new SimpleLightbox('.photo-card a');

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryCards: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.searchBtn'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoad)
refs.loadMoreBtn.classList.add('is-hidden');


async function onSearch(e){
    e.preventDefault();
    newsApiService.resetPage();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;

    
    
    try {
        const result = await newsApiService.fetchArticles();
        
        if (newsApiService.query.trim() === '' || result.hits.length === 0){    
            clearCardsCounteiner();
            refs.loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {  
            refs.loadMoreBtn.classList.remove('is-hidden');

            clearCardsCounteiner();
            Notiflix.Notify.success(`"Hooray! We found ${result.totalHits} images."`);
            appendCardsMarkup(result.hits);
        
            gallery.refresh(); 
}
   } catch (error) {
       console.log(error);
   }
}

async function onLoad (){
    try { 
        refs.loadMoreBtn.disabled = true;
        const result = await newsApiService.fetchArticles();
        appendCardsMarkup(result.hits);
        gallery.refresh();
        refs.loadMoreBtn.disabled = false;

        const lenghtHits = refs.galleryCards.querySelectorAll('.photo-card').length;
              
        if (lenghtHits >= result.totalHits){
            Notiflix.Notify.failure('"We are sorry, but you have reached the end of search results."');
            refs.loadMoreBtn.classList.add('is-hidden');
        } 

    }
        catch (error){
            console.log(error)
        }   
    } 
    
function appendCardsMarkup(data){
    refs.galleryCards.insertAdjacentHTML('beforeend', cards(data));
};

function clearCardsCounteiner () {
    refs.galleryCards.innerHTML = '';
}


