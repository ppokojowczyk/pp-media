import {
  authorColumn,
  completedColumn,
  descriptionColumn,
  favouriteColumn,
  genresColumn,
  idColumn,
  languageColumn,
  listenColumn,
  numberColumn,
  optionsColumn,
  ownColumn,
  playColumn,
  priceColumn,
  ratingColumn,
  releaseDateColumn,
  remarksColumn,
  saveWithoutValidationColumn,
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
    mediaType === GAMES_TYPE && completedColumn,
    mediaType === ALBUMS_TYPE && listenColumn,
    priceColumn,
    remarksColumn,
    optionsColumn(handleEdit, handleDelete),
  ].filter((column) => {
    return column;
  });
};

export { makeListColumns };
