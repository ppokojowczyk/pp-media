import React from "react";
import Choice from "./choice";
import { ALBUM_TYPE, BOOK_TYPE } from "../utils/constants";

const ListFilters = ({
    mediaType,
    filters,
    update,
}) => {

    const sort = [
        { name: 'Title', value: 'title' },
        { name: 'ID', value: 'id' },
        { name: 'Release Date', value: 'release_date' },
    ];

    if (mediaType === ALBUM_TYPE || mediaType === BOOK_TYPE) {
        sort.push({ name: 'Author', value: 'author' });
    }

    const order = [
        { name: 'Ascending', value: 'ASC', },
        { name: 'Descending', value: 'DESC', },
    ];

    const own = [
        { name: 'All', value: '', },
        { name: 'Yes', value: '1', },
        { name: 'No', value: '0', },
    ];

    const handleUpdate = (filter, value) => update({ ...filters, [filter]: value });

    return (
        <div className="list-filters">
            <Choice
                value={filters.sort}
                data={sort}
                onChange={(newValue) => handleUpdate('sort', newValue)}
                noDefault
            />
            <Choice
                value={filters.order}
                data={order}
                onChange={(newValue) => handleUpdate('order', newValue)}
                noDefault
            />
            <Choice
                value={filters.own}
                data={own}
                onChange={(newValue) => handleUpdate('own', newValue)}
                noDefault
            />
        </div>
    );
};

export default ListFilters;
