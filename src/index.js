import './sass/main.scss';
import pictureTpl from './templates/picture-card.hbs';
import NewsApiService from './js/apiService.js';
import LoadMoreBtn from './js/load-more-btn.js';
import getRefs from './js/get-refs.js';

const refs = getRefs();
const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '.js-load-more',
    hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', fetchPicture)


function onSearch(e) {
    e.preventDefault();
console.log('click')
    newsApiService.query = e.currentTarget.elements.query.value;
    
    if (newsApiService.query === '') {
        return alert('Enter query!');
    };
    
    loadMoreBtn.show();
    newsApiService.resetPage();
    newsApiService.fetchPicture().then(picture => {
        clearPictureContainer();
        appendPictureMarkup(picture);
    }).catch(error => console.log(error));
};

function fetchPicture() {
  newsApiService.fetchPicture().then(appendPictureMarkup);
}

function appendPictureMarkup(picture) {
    refs.cardContainer.insertAdjacentHTML('beforeend', pictureTpl(picture));
    refs.cardContainer.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}

function clearPictureContainer() {
    refs.cardContainer.innerHTML = '';
}