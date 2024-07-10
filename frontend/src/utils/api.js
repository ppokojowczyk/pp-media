import Axios from "axios";
import {
  ALBUM_TYPE,
  API_URL,
  BOOK_TYPE,
  GAME_TYPE,
  MOVIE_TYPE,
} from "./constants";

const getApiUrl = (route = "") => {
  return API_URL + route;
};

const getRouteBase = (type = "") => {
  if (type === MOVIE_TYPE) return "/movies";
  if (type === GAME_TYPE) return "/games";
  if (type === BOOK_TYPE) return "/books";
  if (type === ALBUM_TYPE) return "/albums";
  throw Error("Invalid media type.");
};

const getMediaStoreUrl = (type = "") => {
  const route = getRouteBase(type);
  if (!route) throw Error("Invalid route.");
  return getApiUrl(route);
};

const getGenresStoreUrl = (type = "") => {
  const route = getRouteBase(type);
  if (!route) throw Error("Invalid route.");
  return route + "-genres";
};

const fetch = (route) => {
  return Axios
    .get(getApiUrl(route))
    .then(({ data }) => {
      return data;
    });
}

const getLanguages = () => {
  return fetch('/languages');
}

const getGenres = (mediaType) => {
  return fetch(getGenresStoreUrl(mediaType));
}

const getCsvTemplate = (mediaType) => fetch(`/csv-template/${mediaType}`);

export {
  getApiUrl,
  getMediaStoreUrl,
  getGenresStoreUrl,
  getLanguages,
  getGenres,
  getCsvTemplate,
};
