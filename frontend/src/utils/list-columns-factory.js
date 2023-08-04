import {
  authorColumn,
  buyColumn,
  completedColumn,
  descriptionColumn,
  favouriteColumn,
  genresColumn,
  idColumn,
  listenColumn,
  numberColumn,
  optionsColumn,
  ownColumn,
  playColumn,
  priceColumn,
  ratingColumn,
  readColumn,
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
    ratingColumn,
    favouriteColumn,
    saveWithoutValidationColumn,
    ownColumn,
    buyColumn,
    mediaType === MOVIES_TYPE && watchColumn,
    mediaType === GAMES_TYPE && playColumn,
    mediaType === GAMES_TYPE && completedColumn,
    mediaType === BOOKS_TYPE && readColumn,
    mediaType === ALBUMS_TYPE && listenColumn,
    priceColumn,
    remarksColumn,
    optionsColumn(handleEdit, handleDelete),
  ].filter((column) => {
    return column;
  });
};

export { makeListColumns };
