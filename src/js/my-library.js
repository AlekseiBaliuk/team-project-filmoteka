import { createMovieCards } from './moviesMarkup';
// import { onMovieCardClick } from './moviesGallery';
import { modalBasicLightbox } from './modalBasicLightbox';
import { localStorageAPI } from './localStorageAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const moviesContainer = document.querySelector('.movies');
const watchedBtnEl = document.querySelector('[data-id="watched-btn"');
const queueBtnEl = document.querySelector('[data-id="queue-btn"');

const localStorageApi = new localStorageAPI();

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);

function renderCardsWatched() {
  const getWatched = localStorageApi.getData('watched');
  const markup = createMovieCards(getWatched);
  moviesContainer.innerHTML = markup;
}

renderCardsWatched();

function onWatchedBtnClick() {
  console.log(watchedBtnEl.classList.contains('is-active'));
  if (watchedBtnEl.classList.contains('is-active')) {
    return;
  }
  const getWatched = localStorageApi.getData('watched');
  const markup = createMovieCards(getWatched);
  moviesContainer.innerHTML = markup;
}

function onQueueBtnClick() {
  console.log(watchedBtnEl.classList.contains('is-active'));
  if (!watchedBtnEl.classList.contains('is-active')) {
    return;
  }
  const getQueue = localStorageApi.getData('queue');
  const markup = createMovieCards(getQueue);
  moviesContainer.innerHTML = markup;
}

moviesContainer.addEventListener('click', onMovieCardClick2);

// как сделать функцию с параметром и обработчиком event?

export async function onMovieCardClick2(e) {
  const targetFilm = e.target.closest('li').dataset.id; // id текущего фильма при открытии модалки
  console.log(targetFilm);
  if (e.target.nodeName === 'UL') {
    return;
  }
  try {
    const movies = localStorageApi.getData('watched'); // забираем фильмы из Local Storage по тегу "movies"
    const parsedGenres = localStorageApi.getData('genresList'); // забираем жанры из Local Storage

    const film = movies.filter(({ id }) => id === Number(targetFilm))[0]; // метод filter возвращает массив, поэтому берем элемент этого массива
    const { genre_ids } = film;
    let genres;
    if (genre_ids) {
      genres = parsedGenres
        .filter(({ id }) => genre_ids.includes(id)) // перебираем массив всех жанров по id и возвращаем только с текущими
        .map(({ name }) => name); //перебираем массив текущих id и возвращаем массив с именами
    }
    film.genres = genres; // в ключ текущего объекта film сохраняем жанры по именам

    localStorageApi.setData('current-film', film);

    modalBasicLightbox(film);
    localStorageApi.addListenersToBtns();
  } catch (error) {
    console.log(error.message);
  }
}