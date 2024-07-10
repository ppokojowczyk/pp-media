import Axios from "axios";
import {
  ALBUMS_TYPE,
  API_URL,
  BOOKS_TYPE,
  GAMES_TYPE,
  MOVIES_TYPE,
} from "./constants";

const getApiUrl = (route = "") => {
  return API_URL + route;
};

const getRouteBase = (type = "") => {
  if (type === MOVIES_TYPE) return "/movies";
  if (type === GAMES_TYPE) return "/games";
  if (type === BOOKS_TYPE) return "/books";
  if (type === ALBUMS_TYPE) return "/albums";
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
