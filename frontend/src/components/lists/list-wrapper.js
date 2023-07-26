import React, { useEffect, useState } from "react";
import { getGenresStoreUrl, getMediaStoreUrl } from "../../utils/api";
import { makeListColumns } from "../../utils/list-columns-factory";
import Axios from "axios";
import ListNew from "./list-new";
import { dataSource } from "../../utils/data-source";
import Edit from "../edit";

const ListWrapper = ({ mediaType = "", className = "" }) => {
  const [columns, setColumns] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const [listVisible, setListVisible] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const [edited, setEdited] = useState({});
  const [refreshList, setRefreshList] = useState(false);

  const repository = dataSource({
    key: "id",
    url: getMediaStoreUrl(mediaType),
  });

  useEffect(() => {
    Axios.get(getGenresStoreUrl(mediaType)).then(({ data: genres }) => {
      setGenres(genres);
      setColumns(makeListColumns(mediaType, genres, handleEdit, handleDelete));
      setLoaded(true);
    });
  }, []);

  const handleEdit = (id = null) => {
    const callback = (data = {}) => {
      setEdited(data);
      setEditVisible(true);
    }

    id ? repository
      ._store
      .byKey(id)
      .then(({ data }) => {
        callback(data.data[0]);
      }) : callback({});
  }

  const handleDelete = () => {
  }

  const handleSave = (data) => {
    const func = data.id
      ? () => {
        return repository._store.update(data.id, data);
      } : () => {
        return repository._store.insert(data);
      };

    func()
      .then(() => {
        closeEdit();
        setRefreshList(true);
        setTimeout(() => {
          setRefreshList(false);
        }, 1);
      }).catch((err) => {
        alert(err.toString());
      })
  }

  const closeEdit = () => {
    setEditVisible(false);
  }

  const editableColumns = () => {
    return columns.filter((e) => {
      return typeof e.allowEditing === 'undefined' || e.allowEditing === true;
    });
  }

  return (
    loaded && (
      <div>
        {listVisible && (
          <ListNew
            repository={repository}
            genres={genres}
            columns={columns}
            includeImdb={true}
            extraClass={className}
            refresh={refreshList}
            addNew={() => {
              handleEdit({});
            }}
          />
        )}
        {editVisible && (
          <>
            <div className="overlay"></div>
            <div className="edit-container">
              <Edit
                fields={editableColumns()}
                cancel={closeEdit}
                data={edited}
                save={handleSave}
              />
            </div>
          </>
        )}
      </div>
    )
  )
};

export default ListWrapper;
