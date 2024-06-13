import { completedColumn, descriptionColumn, favouriteColumn, genresColumn, languageColumn, ownColumn, priceColumn, publisherColumn, ratingColumn, releaseDateColumn, remarksColumn, saveWithoutValidationColumn, seriesColumn, titleColumn, watchColumn } from "./columns";

const makeNewItem = (type) => {
    return {
        [titleColumn.dataField]: '',
        [publisherColumn.dataField]: '',
        [seriesColumn.dataField]: '',
        [releaseDateColumn.dataField]: '',
        [descriptionColumn.dataField]: '',
        [genresColumn.dataField]: [],
        [languageColumn.dataField]: '',
        [ratingColumn.dataField]: 0,
        [favouriteColumn.dataField]: false,
        [saveWithoutValidationColumn.dataField]: false,
        [ownColumn.dataField]: false,
        [watchColumn.dataField]: false,
        [completedColumn.dataField]: false,
        [priceColumn.dataField]: 0,
        [remarksColumn.dataField]: '',
    }
};

export default makeNewItem;