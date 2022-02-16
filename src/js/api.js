import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = "25705868-b120ad61381773d51dfa3e39d";
const API_URL = "https://pixabay.com/api/";

    
export default class ImgApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;

  }
    
  async  fetchImg() {
    try {
      const imgs = await axios.get(`${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);

      if (!imgs.data.totalHits) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      else {
        Notiflix.Notify.success(`Hooray! We found ${imgs.data.totalHits} images.`);
        return imgs.data.hits;
      }
    }
    catch (error){
      console.log(error);
    }

  }

  async hits() {
      const hits = await axios.get(`${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
      return hits.data.totalHits;
  }



  async  fetchImgAgain() {
    try {
      const imgs = await axios.get(`${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);

      if (!imgs.data.totalHits) {
        return;
      }
      else {
        return imgs.data.hits;
      }
    }
    catch (error){
      console.log(error);
    }

  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }



  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}