import React, { useCallback, useEffect, useState } from "react";
import { Button, Popup, TextBox } from "devextreme-react";
import Axios from "axios";
import { API_URL } from "./constants";
import { render } from "react-dom";

const GridImdb = ({ genres, gridInstance }) => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textBox, setTextBox] = useState(null);

  const showPopup = useCallback(() => {
    setMediaId("");
    setErrorMessage("");
    setShow(true);
    setTimeout(() => textBox.focus(), 500);
  }, [textBox]);

  const hidePopup = () => {
    setShow(false);
    setMediaId("");
    setErrorMessage("");
  };

  useEffect(() => {
    if (!gridInstance) return;
    gridInstance.component.on("contentReady", () => {
      const exists = gridInstance.element.querySelector(".imdb-button");
      if (exists) return;
      const element = gridInstance.element.querySelector(
        ".dx-toolbar-items-container .dx-toolbar-after"
      );
      if (!element) return;
      const container = document.createElement("div");
      element.prepend(container);
      render(
        <Button
          text="IMDb"
          icon="add"
          onClick={() => showPopup()}
          elementAttr={{
            class: "imdb-button",
          }}
        />,
        container
      );
    });
  }, [gridInstance, showPopup]);

  const showError = (error) => {
    setErrorMessage(error);
  };

  const clearError = () => {
    setErrorMessage("");
  };

  const fetchAndAdd = () => {
    clearError();
    if (!mediaId) return showError("No id");
    setDisabled(true);
    const cb = () => setDisabled(false);
    Axios.get(API_URL + "/imdb/" + mediaId).then(
      (data) => {
        if (data.data !== undefined) addWithData(data.data);
        cb();
      },
      () => {
        showError("Failed.");
        cb();
      }
    );
  };

  const addWithData = (data) => {
    let grid = gridInstance.component;
    let mediaGenres = [];
    grid.addRow();
    if (data.name) {
      grid.cellValue(0, "title", data.name);
    }
    if (data.datePublished) {
      grid.cellValue(0, "releaseDate", new Date(data.datePublished));
    }
    if (
      typeof data.aggregateRating !== "undefined" &&
      typeof data.aggregateRating.ratingValue !== "undefined"
    ) {
      grid.cellValue(0, "rating", Math.round(data.aggregateRating.ratingValue));
    }
    if (data.summary) {
      grid.cellValue(0, "description", data.summary);
    }
    if (data.genre && data.genre.length) {
      let items = typeof data.genre === "string" ? [data.genre] : data.genre;
      items.forEach((genre) => {
        genres.forEach((_genre) => {
          if (_genre.display === genre) {
            mediaGenres.push(_genre.name);
            return false;
          }
        });
      });
    }
    grid.cellValue(0, "genres", mediaGenres);
    hidePopup();
  };

  const onTextBoxInit = (e) => {
    setTextBox(e.component);
  };

  return (
    <Popup
      visible={show}
      onHiding={hidePopup}
      dragEnabled={false}
      closeOnOutsideClick={true}
      showTitle={true}
      title="Fetch from IMDb"
      width={300}
      height="auto"
    >
      <div>
        <TextBox
          value={mediaId}
          onValueChanged={(e) => {
            clearError();
            let val = e.value || null;
            if (val && val.indexOf("imdb.com") >= 0) {
              val = val.match(/[0-9]+[0-9]/g);
              if (typeof val[0] !== undefined) val = val[0];
            }
            setMediaId(val || null);
          }}
          disabled={disabled}
          onInitialized={onTextBoxInit}
        ></TextBox>
      </div>
      <br />
      <div className="error">{errorMessage}</div>
      <br />
      <div>
        <Button
          onClick={fetchAndAdd}
          text="Find and add..."
          icon="check"
          width="100%"
          disabled={disabled}
        ></Button>
      </div>
    </Popup>
  );
};

export default GridImdb;
