import { ALBUM_TYPE, BOOK_TYPE, GAME_TYPE, MOVIE_TYPE } from "./constants";

export default function remapMediaType(mediaType) {
    switch (mediaType) {
        case MOVIE_TYPE:
            return MOVIE_TYPE;
        case BOOK_TYPE:
            return BOOK_TYPE;
        case ALBUM_TYPE:
            return ALBUM_TYPE;
        case GAME_TYPE:
            return GAME_TYPE;
        default:
            throw new Error('Invalid media type.');
    }
};
