import React, { useEffect, useState } from "react";
import { getGenres, getLanguages, getMediaStoreUrl } from "../utils/api";
import { makeListColumns } from "../utils/list-columns-factory";
import List from "./list";
import { dataSource } from "../utils/data-source";
import Edit from "./edit";
import { confirm } from "../utils/helpers";
import Imdb from "./imdb";
import Modal from "./modal";
import { useParams, useHistory } from 'react-router-dom';

const ListWrapperImport = ({
  mediaType = "",
  repository,
  prepareColumns,
  id,
  onEditClose,
  includeImdb,
  withAddNew,
  refresh1,
  withRefreshButton,
}) => {
  const [columns, setColumns] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [imdbVisible, setImdbVisible] = useState(false);
  const [edited, setEdited] = useState({});
  const [refreshList, setRefreshList] = useState(false);
  // const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    Promise.all([
      getGenres(mediaType),
      getLanguages(),
    ]).then(([genres, languages]) => {
      setGenres(genres);
      setColumns(
        prepareColumns(
          mediaType,
          genres,
          languages,
          handleDelete,
        )
      );
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    id && handleEdit(id);
  }, [id]);

  const handleEdit = (id = null) => {
    const callback = (data = {}) => {
      setEdited(data);
      setEditVisible(true);
    }

    id ? repository
      .byKey(id)
      .then(({ data }) => {
        callback(data.data[0]);
      }) : callback({});
  }

  const handleDelete = (id) => {
    confirm({
      text: `Delete entry ${id}?`,
      callback: (result) => {
        return (result === true)
          ? repository.remove(id).then(() => {
            refresh();
            return Promise.resolve(result);
          })
          : Promise.resolve(result);
      },
    });
  }

  const refresh = () => {
    setRefreshList(true);
    setTimeout(() => {
      setRefreshList(false);
    }, 1);
  }

  useEffect(() => {
    refresh();
  }, [refresh1])

  const handleSave = (data) => {
    const func = data.id
      ? () => {
        return repository.update(data.id, data);
      } : () => {
        return repository.insert(data);
      };

    func()
      .then(() => {
        closeEdit();
        refresh();
      }).catch((err) => {
        alert(err.toString());
      })
  }

  const closeEdit = () => {
    setEditVisible(false);
    setEdited({});
    // history.push(`/${mediaType}`);
    onEditClose && onEditClose();
  }

  const editableColumns = () => {
    return columns.filter((e) => {
      return typeof e.allowEditing === 'undefined' || e.allowEditing === true;
    });
  }

  const onImdbClick = () => {
    setImdbVisible(true);
  }

  const prepareTitle = (item) => {
    let entity = '';
    switch (mediaType) {
      case 'movies':
        entity = 'Movie';
        break;
      case 'games':
        entity = 'Game';
        break;
      case 'books':
        entity = 'Book';
        break;
      case 'albums':
        entity = 'Album';
        break;
      default:
        break;
    }
    return `${edited.id ? 'Edit' : 'New'} ${entity}`;
  };

  return (
    loaded && (
      <div>
        <List
          repository={repository}
          genres={genres}
          columns={columns}
          includeImdb={includeImdb}
          extraClass={`${mediaType}-list`}
          refresh={refreshList}
          withAddNew={withAddNew}
          addNew={() => {
            handleEdit(null);
          }}
          onImdbClick={onImdbClick}
          withRefreshButton={withRefreshButton}
        />
        {editVisible && (
          <Modal
            title={prepareTitle(edited)}
          >
            <Edit
              fields={editableColumns()}
              cancel={closeEdit}
              data={edited}
              save={handleSave}
            />
          </Modal>
        )}
        {
          imdbVisible && (
            <>
              <div className="overlay"></div>
              <div className="edit-container">
                <Imdb
                  genres={genres}
                  isVisible={imdbVisible}
                  onCancel={() => {
                    setImdbVisible(false);
                  }}
                  onLoaded={(item) => {
                    setEdited(item);
                    setEditVisible(true);
                  }}
                />
              </div>
            </>
          )
        }
      </div>
    )
  )
};

export default ListWrapperImport;
