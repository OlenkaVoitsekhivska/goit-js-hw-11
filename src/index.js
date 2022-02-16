import './css/styles.css';
import { markUp }  from './js/markUp';
import ImgApi from './js/api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';



const formRef = document.querySelector('form');
const containerRef = document.querySelector('.gallery');
const inputRef = document.querySelector('input');
const loadMoreBtn = document.querySelector('.load-more');
const imgApi = new ImgApi();


loadMoreBtn.classList.add("hidden");

formRef.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', lemmeFetchMyImgsAgain);

function onSearch(e) {
  e.preventDefault();

  imgApi.query = inputRef.value;

  if (imgApi.query === '') {
    Notiflix.Notify.warning("Please enter your request");
    return;
    }
  imgApi.resetPage();
  clearСontainerRef();
  lemmeFetchMyImgs();
  
}



function lemmeFetchMyImgs() {
  imgApi.fetchImg().then(data => {
        if (data.length===0) {
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
          return;
        }
        else {
            loadMoreBtn.classList.add("hidden");
            containerRef.insertAdjacentHTML('beforeend', markUp(data));
            let lightbox = new SimpleLightbox('.gallery a', { scrollZoom: false, captionDelay: 250, captionsData: 'alt', doubleTapZoom: 1 });
            lightbox.refresh();
            loadMoreBtn.classList.remove("hidden");
            imgApi.incrementPage();
        }
    })
};

function lemmeFetchMyImgsAgain() {
    imgApi.fetchImgAgain().then(data => {
        if (data.length===0) {
          Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
          loadMoreBtn.classList.add("hidden");
        }
        else {
            loadMoreBtn.classList.add("hidden");
            containerRef.insertAdjacentHTML('beforeend', markUp(data));
            let lightbox = new SimpleLightbox('.gallery a', { scrollZoom: false, captionDelay: 250, captionsData: 'alt', doubleTapZoom: 1 });
            lightbox.refresh();
            loadMoreBtn.classList.remove("hidden");
            imgApi.incrementPage();
        }
    })
};


function clearСontainerRef() {
  containerRef.innerHTML = ''; 
}








