import React, { useState } from "react";
import { dataSource } from "../../utils/data-source.js";
import Grid from "../grid";
import GridImdb from "../../utils/grid-imdb";

const List = ({
  storeUrl = "",
  genres = [],
  className = "",
  withImdb = false,
  columns = [],
}) => {
  const [genresDictionary] = useState(genres);
  const [gridInstance, setGridInstance] = useState(null);

  const createDataSource = () => {
    let ds = dataSource({
      key: "id",
      url: storeUrl,
    });
    return ds;
  };

  const onInitNewRow = (e) => {
    e.data.title = "";
    e.data.author = "";
    e.data.description = "";
    e.data.rating = 0;
    e.data.releaseDate = new Date();
    e.data.isFavourite = false;
    e.data.ignoreValidation = false;
    e.data.toWatch = false;
    e.data.toPlay = false;
    e.data.toRead = false;
    e.data.toBuy = false;
    e.data.toListen = false;
    e.data.completed = false;
  };

  const onGridInitialized = (e) => {
    setGridInstance(e);
  };

  const onToolbarPreparing = (e) => {
    e.toolbarOptions.items.unshift({
      location: "after",
      widget: "dxButton",
      options: {
        text: "Add new item",
        icon: "add",
        onClick: () => {
          e.component.addRow();
        },
      },
    });
  };

  return (
    <>
      <Grid
        dataSource={createDataSource()}
        searchPanel={{
          visible: true,
        }}
        paging={{
          pageSize: 100,
        }}
        columns={columns}
        onInitialized={onGridInitialized}
        onInitNewRow={onInitNewRow}
        editing={{
          mode: "form",
          allowDeleting: true,
          allowUpdating: true,
        }}
        className={className}
        onToolbarPreparing={onToolbarPreparing}
      />
      {withImdb && (
        <GridImdb gridInstance={gridInstance} genres={genresDictionary} />
      )}
    </>
  );
};

export default List;
