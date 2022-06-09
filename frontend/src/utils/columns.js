import React from "react";
import { render } from "react-dom";
import { TagBox } from "devextreme-react";

const idColumn = {
  caption: "ID",
  dataField: "id",
  allowEditing: false,
  allowUpdating: false,
  visible: false,
  formItem: {
    visible: false,
  },
};

const numberColumn = {
  caption: "#",
  dataType: "number",
  width: 50,
  allowEditing: false,
  cellTemplate: (c, e) => {
    c.append(
      e.component.pageIndex() * e.component.pageSize() + (e.rowIndex + 1)
    );
  },
  formItem: {
    visible: false,
  },
};

const titleColumn = {
  caption: "Title",
  dataField: "title",
  validationRules: [{ type: "required" }],
};

const releaseDateColumn = {
  caption: "Release Date",
  dataField: "releaseDate",
  dataType: "date",
  format: "yyyy-MM-dd",
  width: 100,
};

const descriptionColumn = {
  caption: "Description",
  dataField: "description",
  dataType: "text",
  editorType: "dxTextArea",
  visible: false,
};

const genresColumn = (genresDictionary = []) => {
  return {
    caption: "Genre(s)",
    dataField: "genres",
    cellTemplate: (c, e) => {
      /** @todo this can be done better */
      let text = "";
      if (e.value !== undefined && e.value !== null && e.value.length) {
        e.value.forEach((genre) => {
          let _text = genre;
          genresDictionary.forEach((_genre) => {
            if (_genre.name === genre) {
              _text = _genre.display;
              return false;
            }
          });
          text += (text ? " \u2022 " : "") + _text;
        });
      }
      c.append(text);
    },
    editCellTemplate: (c, e) => {
      /** @todo this should be moved as separate component/function */
      const val = [];
      e.value &&
        e.value.length &&
        e.value.forEach((genre) => {
          val.push(genre);
        });
      render(
        <TagBox
          dataSource={genresDictionary}
          valueExpr="name"
          displayExpr="display"
          showSelectionControls={true}
          onInitialized={(a) => {
            a.component.option("value", val);
          }}
          onValueChanged={(a) => {
            e.setValue(a.value || []);
          }}
        />,
        c
      );
    },
  };
};

const ratingColumn = {
  caption: "Rating",
  dataField: "rating",
  dataType: "number",
  width: 100,
  alignment: "center",
  editorOptions: {
    min: 0,
    max: 10,
    showSpinControls: true,
    showSpinButtons: true,
  },
};

const favouriteColumn = {
  caption: "Favourite",
  dataField: "isFavourite",
  dataType: "boolean",
  width: 100,
  editorOptions: {
    cssClass: "dx-checkbox--favourite",
  },
  cssClass: "dx-checkbox--favourite",
};

const saveWithoutValidationColumn = {
  caption: "Save without validation",
  dataField: "ignoreValidation",
  dataType: "boolean",
  visible: false,
  calculateCellValue: () => false,
};

const buyColumn = {
  caption: "To Buy",
  dataField: "toBuy",
  dataType: "boolean",
  width: 100,
  editorOptions: {
    cssClass: "dx-checkbox--to-buy",
  },
  cssClass: "dx-checkbox--to-buy",
};

const authorColumn = {
  caption: "Author",
  dataField: "author",
  dataType: "string",
  width: 100,
  editorOptions: {
    maxLength: 30,
  },
};

const listenColumn = {
  caption: "To Listen",
  dataField: "toListen",
  dataType: "boolean",
  width: 100,
  editorOptions: {
    cssClass: "dx-checkbox--to-listen",
  },
  cssClass: "dx-checkbox--to-listen",
};

const readColumn = {
  caption: "To Read",
  dataField: "toRead",
  dataType: "boolean",
  width: 100,
  editorOptions: {
    cssClass: "dx-checkbox--to-watch",
  },
  cssClass: "dx-checkbox--to-watch",
};

const playColumn = {
  caption: "To Play",
  dataField: "toPlay",
  dataType: "boolean",
  width: 100,
  editorOptions: {
    cssClass: "dx-checkbox--to-watch",
  },
  cssClass: "dx-checkbox--to-watch",
};

const completedColumn = {
  caption: "Completed",
  dataField: "completed",
  dataType: "boolean",
  width: 100,
  editorOptions: {
    cssClass: "dx-checkbox--completed",
  },
  cssClass: "dx-checkbox--completed",
};

const watchColumn = {
  caption: "To Watch",
  dataField: "toWatch",
  dataType: "boolean",
  width: 100,
  editorOptions: {
    cssClass: "dx-checkbox--to-watch",
  },
  cssClass: "dx-checkbox--to-watch",
};

export {
  idColumn,
  numberColumn,
  titleColumn,
  releaseDateColumn,
  descriptionColumn,
  genresColumn,
  ratingColumn,
  favouriteColumn,
  saveWithoutValidationColumn,
  buyColumn,
  authorColumn,
  listenColumn,
  readColumn,
  playColumn,
  completedColumn,
  watchColumn,
};
