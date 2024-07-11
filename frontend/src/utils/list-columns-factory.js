import {
  authorColumn,
  completedColumn,
  coverColumn,
  descriptionColumn,
  developerColumn,
  favouriteColumn,
  genresColumn,
  idColumn,
  languageColumn,
  numberColumn,
  optionsColumn,
  ownColumn,
  playColumn,
  priceColumn,
  publisherColumn,
  quantityColumn,
  ratingColumn,
  releaseDateColumn,
  remarksColumn,
  saveWithoutValidationColumn,
  seriesColumn,
  titleColumn,
  watchColumn,
} from "./columns";
import { ALBUM_TYPE, BOOK_TYPE, GAME_TYPE, MOVIE_TYPE } from "./constants";

const makeListColumns = (mediaType = "", genresDictionary, handleEdit, handleDelete, languages, handleView = null) => {
  return [
    idColumn,
    numberColumn,
    titleColumn,
    (mediaType === BOOK_TYPE || mediaType === ALBUM_TYPE) && authorColumn,
    (mediaType === GAME_TYPE) && developerColumn,
    publisherColumn,
    seriesColumn,
    releaseDateColumn,
    languageColumn(languages),
    descriptionColumn,
    genresColumn(genresDictionary),
    quantityColumn,
    mediaType === BOOK_TYPE && coverColumn,
    ratingColumn,
    priceColumn,
    favouriteColumn,
    saveWithoutValidationColumn({}),
    ownColumn,
    mediaType === MOVIE_TYPE && watchColumn,
    mediaType === GAME_TYPE && playColumn,
    completedColumn,
    remarksColumn,
    optionsColumn(handleEdit, handleDelete, handleView),
  ].filter((column) => {
    return column;
  });
};

export { makeListColumns };
