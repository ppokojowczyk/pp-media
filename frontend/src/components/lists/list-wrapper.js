import React, { useEffect, useState } from "react";
import { getGenresStoreUrl, getMediaStoreUrl } from "../../utils/api";
import { makeListColumns } from "../../utils/list-columns-factory";
import List from "./list";
import Axios from "axios";

const ListWrapper = ({ mediaType = "", className = "" }) => {
  const [columns, setColumns] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    Axios.get(getGenresStoreUrl(mediaType)).then(({ data: genres }) => {
      setGenres(genres);
      setColumns(makeListColumns(mediaType, genres));
      setLoaded(true);
    });
  }, []);

  return (
    loaded && (
      <List
        storeUrl={getMediaStoreUrl(mediaType)}
        genres={genres}
        columns={columns}
        withImdb
        className={className}
      />
    )
  );
};

export default ListWrapper;
