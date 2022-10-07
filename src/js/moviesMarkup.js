import genresData from './genres.json';

function createMovieCards(movies) {
  return movies
    .map(
      ({
        poster_path,
        title,
        id,
        name,
        release_date,
        first_air_date,
        vote_average,
        genres,
        genre_ids,
      }) => {
        let filmGenres;
        if (genres) {
          filmGenres = genres.map(({ name }) => name).join(', ');
        }
        if (genre_ids) {
          filmGenres = genresData
            .filter(({ id }) => genre_ids.includes(id))
            .map(({ name }) => name)
            .join(', ');
        }
        const imgUrl = poster_path
          ? `https://image.tmdb.org/t/p/original${poster_path}`
          : 'https://via.placeholder.com/395x574';

        return `<li class="films__item" data-id=${id}>
                <div class="films__img">
                <img src=${imgUrl} alt="${title || name}" loading="lazy">
        </div>
                <div class="films__description">
                  <p class="films__title">${title || name}</p>
                  <div class="films__meta">
                    <p class="films__genres">${filmGenres}</p>
                    <p class="films__data">${(
                      release_date ||
                      first_air_date ||
                      '2023'
                    ).slice(0, 4)}</p>
                    <span class="films__rating">${vote_average || '-'}</span>
                  </div>
                </div>
            </li>`;
      }
    )
    .join('');
}

export { createMovieCards };
