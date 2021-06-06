const API_KEY = '21952569-4b44b40a7ae5579ea0d6f7f48';
const BASE_URL = 'https://pixabay.com/api';

export default class NewsApiService {
    constructor(searchQuery) {
        this.searchQuery = searchQuery;
        this.page = 1;
        this.perPage = 12;
    }

    fetchPicture() {
        const url = `${BASE_URL}/?image_type=photo&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`
        return fetch(url)
            .then(response => response.json())
            .then(({hits}) => {
                this.incrementPage();
                return hits;
            })
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