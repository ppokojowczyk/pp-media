import {
  authorColumn,
  completedColumn,
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
  ratingColumn,
  releaseDateColumn,
  remarksColumn,
  saveWithoutValidationColumn,
  seriesColumn,
  titleColumn,
  watchColumn,
} from "./columns";
import { ALBUMS_TYPE, BOOKS_TYPE, GAMES_TYPE, MOVIES_TYPE } from "./constants";

const makeListColumns = (mediaType = "", genresDictionary, handleEdit, handleDelete) => {
  return [
    idColumn,
    numberColumn,
    titleColumn,
    (mediaType === BOOKS_TYPE || mediaType === ALBUMS_TYPE) && authorColumn,
    (mediaType === GAMES_TYPE) && developerColumn,
    publisherColumn,
    seriesColumn,
    releaseDateColumn,
    descriptionColumn,
    genresColumn(genresDictionary),
    languageColumn,
    ratingColumn,
    favouriteColumn,
    saveWithoutValidationColumn,
    ownColumn,
    mediaType === MOVIES_TYPE && watchColumn,
    mediaType === GAMES_TYPE && playColumn,
    completedColumn,
    priceColumn,
    remarksColumn,
    optionsColumn(handleEdit, handleDelete),
  ].filter((column) => {
    return column;
  });
};

export { makeListColumns };
