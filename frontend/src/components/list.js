import React, { useEffect, useState } from "react";
import { numberColumn } from "../utils/columns";
import Button from "./button";
import Input from "./input";
import GalleryItem from "./gallery-item";
import Container from "./container";

const List = ({
  repository = {},
  columns = [],
  includeImdb = false,
  refresh = false,
  addNew = null,
  onImdbClick = null,
  withAddNew = true,
  withRefreshButton = true,
  addToPanel = null,
  edit,
  mode,
}) => {
  const [data, setData] = useState([]);
  const [opacity, setOpacity] = useState(1);
  const [filtered, setFiltered] = useState(false);
  const [search, setSearch] = useState('');

  const doRefresh = () => {
    setOpacity(0.3);
    repository
      .load({})
      .then(({ data }) => {
        setData(data);
        setOpacity(1);
        applySearchFilter(data, search);
      });
  }

  useEffect(() => {
    doRefresh();
  }, []);

  useEffect(() => {
    refresh === true && doRefresh();
  }, [refresh]);

  const itemAppliesToSearchFilter = (item, search) => {
    return (item.title && item.title.toLowerCase().indexOf(search) !== -1)
      || (item.author && item.author.toLowerCase().indexOf(search) !== -1);
  };

  const applySearchFilter = (data, search) => setFiltered(search
    ? data.filter((item) => itemAppliesToSearchFilter(item, search))
    : false
  );

  const updateSearch = (e) => {
    setSearch(e.target.value);
    applySearchFilter(data, e.target.value);
  };

  return (
    <div className="list" style={{ opacity }}>
      <div className="list-panel">
        {includeImdb && <Button text="+ IMDb" onClick={onImdbClick} />}
        {withAddNew && <Button
          text="+ Add New"
          onClick={() => {
            addNew();
          }}
        />}
        {withRefreshButton && <Button
          text="Refresh"
          onClick={() => doRefresh()} />}
        <Input placeholder="Search..." onChange={updateSearch} />
        {addToPanel}
      </div>
      {
        mode === 'gallery' ?
          <Container className='gallery'>
            {data.length || filtered !== false ?
              ((filtered !== false) ? filtered : data).map((datum, index) => {
                return (<GalleryItem
                  onClick={() => {
                    edit(datum.id);
                  }}
                  title={datum.title}
                  cover={
                    datum?.images[0] ? `url('http://localhost:8081/image/thumb/${datum?.images[0].id}')` : ''
                  }
                />)
              }) : ''
            }
            <hr style={{ clear: 'both', border: 'none' }} />
          </Container>
          : (
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
                {data.length || filtered !== false ?
                  ((filtered !== false) ? filtered : data).map((datum, index) => {
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
          )
      }
    </div>
  );
};

export default List;
