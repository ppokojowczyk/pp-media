import React, { useEffect, useState } from "react";
import { numberColumn } from "../../utils/columns";
import Button from "../button";
import Input from "../input";

const ListNew = ({
  repository = {},
  columns = [],
  includeImdb = false,
  extraClass = "",
  refresh = false,
  addNew = null,
}) => {
  const [data, setData] = useState([]);
  const [opacity, setOpacity] = useState(1);

  const doRefresh = () => {
    setOpacity(0.3);
    repository
      .load({})
      .then((data) => {
        setData(data);
        setOpacity(1);
      });
  }

  useEffect(() => {
    doRefresh();
  }, []);

  useEffect(() => {
    refresh === true && doRefresh();
  }, [refresh]);

  return (
    <div className="list" style={{ opacity }}>
      <div className="list-panel">
        {includeImdb && <Button text="+ IMDb" />}
        <Button
          text="+ Add New"
          onClick={() => {
            addNew();
          }}
        />
        <Button
          text="Refresh"
          onClick={() => doRefresh()} />
        <Input placeholder="Search..." onChange={() => { }} />
      </div>
      <table className="list-wrapper">
        <thead className="list-header">
          <tr>
            {columns
              .filter((column) => {
                return (
                  typeof column.visible === "undefined" || column.visible === true
                );
              })
              .map((column) => {
                return <th className="list-header-cell">{column.caption}</th>;
              })}
          </tr>
        </thead>
        <tbody className="list-body">
          {data.length ?
            data.map((datum, index) => {
              return (
                <tr className="list-body-row">
                  {columns
                    .filter((column) => {
                      return (
                        typeof column.visible === "undefined" ||
                        column.visible === true
                      );
                    })
                    .map((column) => {
                      let content = '';

                      if (typeof column.content === 'function') {
                        content = column.content(
                          column,
                          datum,
                          datum[column.dataField]
                        );
                      } else if (column === numberColumn) {
                        content = (index + 1);
                      } else {
                        content = datum[column.dataField];
                      }

                      return <td className={
                        "list-body-cell " + column.className
                      } style={(() => {
                        const style = column.style || {}
                        if (column.alignment) {
                          style.textAlign = column.alignment;
                        }

                        return style;
                      })()}>{content}</td>;
                    })}
                </tr>
              )
            }) : ''}
        </tbody>
      </table>
    </div>
  );
};

export default ListNew;
