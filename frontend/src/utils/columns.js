import React from "react";
import { formatDate } from "./helpers";
import Check from "../components/check";

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
  alignment: 'center',
};

const titleColumn = {
  caption: "Title",
  dataField: "title",
  validationRules: [{ type: "required" }],
  className: "item-title",
};

const releaseDateColumn = {
  caption: "Release Date",
  dataField: "releaseDate",
  dataType: "date",
  format: "yyyy-MM-dd",
  width: 100,
  alignment: 'center',
  content: (column, data, value) => {
    return formatDate(value);
  }
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
    fieldType: "select",
    data: genresDictionary,
    content: (c, e, v) => {
      let text = "";

      if (v !== undefined && v !== null && v) {
        v.forEach((genre) => {
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

      return text;
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
  content: (column, data, value) => {
    return <Check value={value === true} />
  },
  alignment: 'center',
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
  content: (column, data, value) => {
    return <Check value={value === true} />
  },
  alignment: 'center',
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
  content: (column, data, value) => {
    return <Check value={value === true} />
  },
  alignment: 'center',
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
  content: (column, data, value) => {
    return <Check value={value === true} />
  },
  alignment: 'center',
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
  content: (column, data, value) => {
    return <Check value={value === true} />
  },
  alignment: 'center',
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
  content: (column, data, value) => {
    return <Check value={value === true} />
  },
  alignment: 'center',
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
  content: (column, data, value) => {
    return <Check value={value === true} />
  },
  alignment: 'center',
};

const optionsColumn = (handleEdit, handleDelete) => {
  return {
    caption: "Options",
    alignment: 'center',
    allowEditing: false,
    content: (column, data) => {
      return (
        [
          <a className="list-link" href="#" onClick={() => handleEdit(data.id)}>Edit</a>,
          <a className="list-link" href="#" onClick={() => handleDelete(data.id)}>Delete</a>
        ]
      );
    }
  };
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
  optionsColumn,
};
