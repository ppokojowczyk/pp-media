import { authorColumn, completedColumn, coverColumn, descriptionColumn, favouriteColumn, genresColumn, languageColumn, ownColumn, priceColumn, publisherColumn, quantityColumn, ratingColumn, releaseDateColumn, remarksColumn, saveWithoutValidationColumn, seriesColumn, titleColumn, watchColumn } from "./columns";
import { BOOK_TYPE } from "./constants";

const makeNewItem = (type) => {
    const data = {
        [titleColumn.dataField]: '',
        [publisherColumn.dataField]: '',
        [seriesColumn.dataField]: '',
        [releaseDateColumn.dataField]: '',
        [descriptionColumn.dataField]: '',
        [genresColumn.dataField]: [],
        language: '',
        [ratingColumn.dataField]: 0,
        [favouriteColumn.dataField]: false,
        [saveWithoutValidationColumn.dataField]: false,
        [ownColumn.dataField]: false,
        [watchColumn.dataField]: false,
        [completedColumn.dataField]: false,
        [priceColumn.dataField]: 0,
        [remarksColumn.dataField]: '',
        [quantityColumn.dataField]: 0,
        images: [],
    };

    if (type === BOOK_TYPE) {
        data[authorColumn.dataField] = '';
        data[coverColumn.dataField] = '';
    }

    return data;
};

export default makeNewItem;