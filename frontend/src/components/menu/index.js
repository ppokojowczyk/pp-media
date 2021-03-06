import React from "react";
import { Button } from "devextreme-react";
import { withRouter } from "react-router-dom";

const Menu = ({ history }) => {
  const items = [
    {
      title: "Movies",
      icon: "movie",
      url: "/movies",
      className: "button-movies",
    },
    {
      title: "Games",
      icon: "game",
      url: "/games",
      className: "button-games",
    },
    {
      title: "Books",
      icon: "book",
      url: "/books",
      className: "button-books",
    },
    {
      title: "Albums",
      icon: "album",
      url: "/albums",
      className: "button-albums",
    },
  ];

  function openUrl(url) {
    history.push(url);
  }

  function renderMenu() {
    return items.map((item, index) => {
      return (
        <Button
          key={index}
          text={item.title}
          className={(() => {
            let className = item.className;
            if (item.url === window.location.pathname) {
              className += " button-active";
            }
            return className;
          })()}
          onClick={() => {
            openUrl(item.url);
          }}
        />
      );
    });
  }

  return <div className="App-menu">{renderMenu()}</div>;
};

export default withRouter(Menu);
