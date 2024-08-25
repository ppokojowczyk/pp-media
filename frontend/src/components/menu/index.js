import React from "react";
import Button from "../button";
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
    {
      title: "Statistics",
      icon: "statistics",
      url: "/statistics",
      className: "button-statistics",
    },
    {
      title: "Inventory",
      icon: "inventory",
      url: "/inventory",
      className: "button-inventory",
    },
    {
      title: "Import",
      icon: "import",
      url: "/import",
      className: "button-import",
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
