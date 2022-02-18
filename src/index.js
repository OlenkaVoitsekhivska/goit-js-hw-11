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
  lemmeFetchMyImgs();
  clearСontainerRef();
}



function lemmeFetchMyImgs() {
  imgApi.fetchImg().then(({hits, totalHits}) => {

   if(totalHits===0) {
          loadMoreBtn.classList.add("hidden");
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
   else {
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
          loadMoreBtn.classList.add("hidden");
          containerRef.insertAdjacentHTML('beforeend', markUp(hits));
          let lightbox = new SimpleLightbox('.gallery a', { scrollZoom: false, captionDelay: 250, captionsData: 'alt', doubleTapZoom: 1 });
          lightbox.refresh();
          imgApi.incrementPage();
          smooth();
          if (totalHits > 40) {
                loadMoreBtn.classList.remove("hidden");
          }
          
        }
    })
};



function lemmeFetchMyImgsAgain() {
  imgApi.fetchImgAgain().then(({ hits, totalHits }) => {
   
    if (totalHits === 0) {
      loadMoreBtn.classList.add("hidden");
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }
    else {
      containerRef.insertAdjacentHTML('beforeend', markUp(hits));
      let lightbox = new SimpleLightbox('.gallery a', { scrollZoom: false, captionDelay: 250, captionsData: 'alt', doubleTapZoom: 1 });
      lightbox.refresh();
      loadMoreBtn.classList.remove("hidden");
      let numberOfPages = totalHits / 40;
          if (imgApi.page === Math.ceil(numberOfPages)) {
                loadMoreBtn.classList.add("hidden");
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
          }       
      imgApi.incrementPage();
      smooth();
    }
  })
};




function clearСontainerRef() {
  containerRef.innerHTML = ''; 
}



function smooth() {

  const { height: cardHeight } = 
    document.querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}





