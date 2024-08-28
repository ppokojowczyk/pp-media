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
import makeNewItem from "../utils/new-item-factory";
import View from "./view";
import ListFilters from "./list-filters";
import { getConfigOption, saveConfigOption } from "../utils/config";
import { uploadRepository } from "../utils/uploads-repository";
import Choice from "./choice";

const ListWrapper = ({ mediaType = "" }) => {
  const [columns, setColumns] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [imdbVisible, setImdbVisible] = useState(false);
  const [edited, setEdited] = useState({});
  const [refreshList, setRefreshList] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const repository = dataSource(getMediaStoreUrl(mediaType));
  const uploadRepo = uploadRepository();
  const [viewItem, setViewItem] = useState(null);
  const defaultFilters = getConfigOption('filters', {});
  const [filters, setFilters] = useState({
    sort: defaultFilters.sort || 'title',
    order: defaultFilters.order || 'ASC',
    own: defaultFilters.own || '',
  });
  const [editIsProcessing, setEditIsProcessing] = useState(false);
  const [mode, setMode] = useState(getConfigOption('mode', ''));

  repository.filters = function (value) {
    if (typeof this._filters === 'undefined') {
      this._filters = {};
    }
    this._filters = value;
  };
  repository.filters(filters);

  useEffect(() => {
    Promise.all([
      getGenres(mediaType),
      getLanguages(),
    ]).then(([genres, languages]) => {
      setGenres(genres);
      setColumns(makeListColumns(mediaType, genres, (id) => {
        history.push(`/${mediaType}s/${id}`);
      }, handleDelete, languages, handleView));
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
      }) : callback(makeNewItem(mediaType));
  }

  const handleView = (id) => repository.byKey(id).then(({ data }) => setViewItem(data.data[0]));

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

  const handleSave = (data) => {
    setEditIsProcessing(true);

    const func = data.id
      ? () => {
        return repository.update(data.id, data);
      } : () => {
        return repository.insert(data);
      };

    const { images, removeImages = [] } = data;

    func()
      .then(({ data }) => {
        if (data.id) {
          return uploadRepo.upload(
            mediaType,
            data.id,
            images,
            removeImages,
          );
        } else {
          return Promise.resolve();
        }
      }).then(() => {
        closeEdit();
        refresh();
      }).catch((err) => {
        alert(err.toString());
      }).finally(() => {
        setEditIsProcessing(false);
      });
  }

  const closeEdit = () => {
    setEditVisible(false);
    setEdited({});
    history.push(`/${mediaType}s`);
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
          includeImdb={true}
          extraClass={`${mediaType}-list`}
          refresh={refreshList}
          addNew={() => {
            handleEdit(null);
          }}
          onImdbClick={onImdbClick}
          addToPanel={
            [<ListFilters
              mediaType={mediaType}
              filters={filters}
              update={(filters) => {
                setFilters(filters);
                saveConfigOption('filters', filters);
                repository.filters(filters);
                refresh();
              }}
            />,
            <Choice
              data={[
                { name: 'Default', value: '' },
                { name: 'Gallery', value: 'gallery' },
              ]}
              noDefault={true}
              value={mode}
              onChange={(mode) => {
                setMode(mode);
                saveConfigOption('mode', mode);
              }}
            />
            ]
          }
          mode={mode}
          edit={(id) => {
            history.push(`/${mediaType}s/${id}`);
          }}
        />
        {viewItem && (
          <Modal
            title='View'
            onClosing={() => setViewItem(null)}
          >
            <View
              fields={editableColumns()}
              cancel={() => setViewItem(null)}
              data={viewItem}
            />
          </Modal>
        )}
        {editVisible && (
          <Modal
            title={prepareTitle(edited)}
            onClosing={closeEdit}
          >
            <Edit
              fields={editableColumns()}
              cancel={closeEdit}
              data={edited}
              save={handleSave}
              isProcessing={editIsProcessing}
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

export default ListWrapper;
