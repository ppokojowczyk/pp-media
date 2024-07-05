import { ALBUMS_TYPE, BOOKS_TYPE, BOOK_TYPE, GAMES_TYPE, GAME_TYPE, MOVIES_TYPE, MOVIE_TYPE, MUSIC_TYPE } from "./constants";

export default function remapMediaType(mediaType) {
    switch (mediaType) {
        case MOVIE_TYPE:
            return MOVIES_TYPE;
        case BOOK_TYPE:
            return BOOKS_TYPE;
        case MUSIC_TYPE:
            return ALBUMS_TYPE;
        case GAME_TYPE:
            return GAMES_TYPE;
        default:
            throw new Error('Invalid media type.');
    }
};
