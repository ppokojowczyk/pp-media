import React, { useEffect, useState } from "react";
import { getGenresStoreUrl, getMediaStoreUrl } from "../../utils/api";
import { makeListColumns } from "../../utils/list-columns-factory";
import List from "./list";
import Axios from "axios";

const ListWrapper = ({ mediaType = "", className = "" }) => {
  const [columns, setColumns] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      Axios.get(getGenresStoreUrl(mediaType)).then((data) => {
        setColumns(makeListColumns(mediaType, data.data));
      });
    }
  }, [loaded, mediaType]);

  return (
    <List
      storeUrl={getMediaStoreUrl(mediaType)}
      genresUrl={getGenresStoreUrl(mediaType)}
      columns={columns}
      withImdb={true}
      className={className}
    />
  );
};

export default ListWrapper;
