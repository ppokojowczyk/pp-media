import React, { useEffect, useState } from "react";
import Header from "../components/header";
import FileUpload from "../components/file-upload";
import Choice from "../components/choice";
import mediaTypes from "../utils/media-types";
import Button from "../components/button";
import Axios from "axios";
import { getApiUrl, getCsvTemplate, getGenres, getLanguages } from "../utils/api";
import { makeListColumns } from "../utils/list-columns-factory";
import { importActionType, saveColumn, saveWithoutValidationColumn } from "../utils/columns";
import ListWrapperImport from "../components/list-wrapper-import";
import ImportResult from "../components/import-result";
import Modal from "../components/modal";

const Import = () => {

    /** @todo remove after dev along with test related functions */
    const IS_TEST = 0; // 1 or 0

    const [mediaType, setMediaType] = useState('');
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [id, setId] = useState(null);
    /** @todo fix refresh button */
    const [initialData, setInitialData] = useState(null);
    const [rfrsh, setRfrsh] = useState(0);
    const [template, setTemplate] = useState('');
    const [result, setResult] = useState(null);
    // const [columns, setColumns] = useState([]);
    // const [genres, setGenres] = useState([]);
    // const [languages, setLanguages] = useState([]);
    const [showErrors, setShowErrors] = useState(false);

    const fillData = (items, callback) => {
        items.data.map(callback);
        setData(items);
        refreshList();
    }

    const checkAllToSave = () => {
        fillData(data, (item) => {
            item.save = true;
        });
    };

    const checkAllToIgnoreValidation = () => {
        fillData(data, (item) => {
            item.ignoreValidation = true;
        });
    };

    const mediaTypesData = mediaTypes.map((item) => {
        return {
            name: item.type,
            value: item.type,
        };
    });

    const processData = (data) => {
        let id = 1;
        data && data.data && data.data.map(item => {
            item.id = `imp-${id}`; /** @todo temp id */
            id++;
        });

        const copied = JSON.parse(JSON.stringify(data));
        setInitialData(copied);

        return data;
    };

    const runImport = () => {
        if (!mediaType) {
            alert("No media type selected.");
            return;
        }
        if (!file) {
            alert("No file selected.");
            return;
        }

        setData(null);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('mediaType', mediaType);

        Axios.post(getApiUrl('/import'), formData)
            .then(({ data }) => {
                setData(processData({ data: data.data }));
                setResult({ insert: data.insert, update: data.update, total: data.total });
                // load();
            }).catch((err) => {
                alert(err.toString());
            });
    };

    const findIndex = (id) => {
        let index = null;

        data.data.forEach((item, index_) => {
            if (item.id === id) {
                index = index_;
                return false;
            }
        })

        return index;
    };

    /**
     * Improvised repository.
     * @todo do not use data state; just use repository;
     */
    const repository = {
        load: () => {
            return Promise.resolve(data);
        },
        byKey: (id) => {
            return Promise.resolve({
                data: {
                    data: [data.data[findIndex(id)]],
                },
            });
        },
        insert: (mediaType, medias) => {
            return Axios.post(getApiUrl('/batch-save'), {
                mediaType,
                medias,
            });
        },
        update: (id, values) => {
            const curr = data;
            curr.data[findIndex(id)] = values;
            setData(curr);
            return Promise.resolve(true);
        },
        remove: (id) => {
            const curr = data;
            curr.data.splice(findIndex(id), 1);
            setData(curr);
            return Promise.resolve(true);
        },
    };

    /** @todo genres, languages and columns could be injected as props into list wrapper */
    // const load = () => {
    //     const mediaType_ = remapMediaTypeFromEntityToList(mediaType);
    //     Promise.all([
    //         getGenres(mediaType_),
    //         getLanguages(),
    //     ]).then(([genres, languages]) => {
    //         setGenres(genres);
    //         setLanguages(languages);
    //         setColumns(prepareColumns());
    //     });
    // };

    /** @todo this can actually be part of list wrapper */
    const handleEdit = (id) => setId(id);

    const prepareColumns = (mediaType, genres, languages, handleDelete) => {
        const columns = makeListColumns(
            mediaType,
            genres,
            handleEdit,
            handleDelete,
            languages
        );

        const newColumns = [
            ...columns.slice(0, -1),
            {
                ...saveWithoutValidationColumn({
                    change: (id, value) => {
                        const curr = data;
                        curr.data[findIndex(id)].ignoreValidation = value;
                        setData(curr);
                        setRfrsh(rfrsh + 1);
                        setTimeout(() => {
                            setRfrsh(0);
                        }, 0);
                    },
                }), visible: true
            },
            importActionType,
            saveColumn({
                change: (id, value) => {
                    const curr = data;
                    curr.data[findIndex(id)].save = value;
                    setData(curr);
                    setRfrsh(rfrsh + 1);
                    setTimeout(() => {
                        setRfrsh(0);
                    }, 0);
                    // setRfrsh((new Date).getTime());
                },
            }),
            ...columns.slice(-1)
        ];

        // columns.push(duplicateExistsColumn);
        // columns.push(saveColumn);

        return newColumns;
    };

    const save = () => {
        setResult(null);
        repository
            .insert(mediaType, data.data)
            .then(({
                data: result,
            }) => {
                setResult(result);
            }).catch(err => alert('Import failed. ' + err.toString()));
    };

    useEffect(() => {
        if (!mediaType) {
            setTemplate('');
            return;
        }
        getCsvTemplate(mediaType).then(template => {
            setTemplate(template);
        });
    }, [mediaType]);

    // TEST
    const [test, setTest] = useState(IS_TEST);
    useEffect(() => {
        if (test === 1) {
            setMediaType('album');
        }
    }, []);
    useEffect(() => {
        if (!mediaType || test !== 1) {
            return;
        }
        const data = { "data": [{ "genreClass": "App\\Entity\\AlbumGenre", "author": "megadeth", "id": null, "title": "rust in peace", "description": null, "releaseDate": "2024-07-04T00:00:00+00:00", "genres": [], "rating": null, "isFavourite": null, "releaseYear": "2024", "ignoreValidation": null, "price": null, "own": false, "remarks": null, "language": null, "publisher": null, "completed": null, "series": null, "createdAt": null, "updatedAt": null, "duplicate": true }, { "genreClass": "App\\Entity\\AlbumGenre", "author": "metallica", "id": null, "title": "killem all", "description": null, "releaseDate": "2024-07-04T00:00:00+00:00", "genres": [], "rating": null, "isFavourite": null, "releaseYear": "2024", "ignoreValidation": null, "price": null, "own": false, "remarks": null, "language": null, "publisher": null, "completed": null, "series": null, "createdAt": null, "updatedAt": null, "duplicate": false }, { "genreClass": "App\\Entity\\AlbumGenre", "author": "Metallica", "id": null, "title": "Master of Puppets", "description": null, "releaseDate": "2024-07-04T00:00:00+00:00", "genres": [], "rating": null, "isFavourite": null, "releaseYear": "2024", "ignoreValidation": null, "price": null, "own": false, "remarks": null, "language": null, "publisher": null, "completed": null, "series": null, "createdAt": null, "updatedAt": null, "duplicate": false }, { "genreClass": "App\\Entity\\AlbumGenre", "author": "Sepultura", "id": null, "title": "Morbid Visions", "description": null, "releaseDate": "2024-07-04T00:00:00+00:00", "genres": [], "rating": null, "isFavourite": null, "releaseYear": "2024", "ignoreValidation": null, "price": null, "own": false, "remarks": null, "language": null, "publisher": null, "completed": null, "series": null, "createdAt": null, "updatedAt": null, "duplicate": true }] };
        setData(processData(data));
        // load();
        setTest(0);
    }, [mediaType]);

    const refreshData = () => {
        setData(JSON.parse(JSON.stringify(initialData)));
        refreshList();
    };

    const refreshList = () => {
        setRfrsh(rfrsh + 1);
        setTimeout(() => setRfrsh(0), 0);
    };

    const reset = () => {
        setData(null);
        setInitialData(null);
        setMediaType('');
        setFile(null);
        setId(null);
        setResult(null);
        setTemplate('');
    };

    return (
        <div className="import">
            <Header>Import</Header>
            <div>
                <Button
                    text="Reset"
                    onClick={reset}
                />
                <br />
                <br />
                <FileUpload
                    onChange={(file) => {
                        setFile(file);
                    }}
                />
                <br />
                <label>
                    Media Type:
                    <Choice
                        data={mediaTypesData}
                        value={mediaType}
                        onChange={(value) => setMediaType(value)}
                    />
                </label>
                {template && <div style={{ margin: '20px 0', color: 'white' }}>
                    Template: <span style={{
                        fontFamily: 'monospace',
                        fontSize: '1.2em',
                        border: '1px solid white',
                        borderRadius: 5,
                        padding: '10px 20px',
                        marginLeft: 10,
                    }}>{template}</span>
                </div>}
                {
                    mediaType && (<>
                        <Button
                            text="Import"
                            onClick={runImport}
                        />
                        {
                            data && <>
                                <Button
                                    text="Save"
                                    onClick={save}
                                />
                                <Button
                                    text="Mark All To Save"
                                    onClick={checkAllToSave}
                                />
                                <Button
                                    text="Mark All To Ignore Validation"
                                    onClick={checkAllToIgnoreValidation}
                                />
                                <Button
                                    text="Refresh"
                                    onClick={refreshData}
                                    disabled={true}
                                />
                            </>
                        }
                        {
                            result && <ImportResult
                                insert={typeof result.insert !== undefined ? result.insert : false}
                                update={typeof result.update !== undefined ? result.update : false}
                                total={result.total}
                                failed={result.failed}
                                saved={result.saved}
                            />
                        }
                    </>)
                }
                {
                    result && result.errors &&
                    <>
                        <Button text="Show Errors" onClick={() => {
                            setShowErrors(true);
                        }} />
                        {showErrors &&
                            <Modal
                                onClosing={() => setShowErrors(false)}
                            >
                                <Header>Errors</Header>
                                <div style={{ color: 'white', margin: '1em', whiteSpace: 'pre-wrap' }}>
                                    {result.errors.join("\n")}
                                </div>
                            </Modal>
                        }
                    </>
                }
            </div>
            {
                (data !== null && mediaType) && (
                    <div>
                        <ListWrapperImport
                            mediaType={mediaType}
                            repository={repository}
                            prepareColumns={prepareColumns}
                            id={id}
                            onEditClose={() => setId(null)}
                            includeImdb={false}
                            withAddNew={false}
                            refresh1={rfrsh}
                            withRefreshButton={false}
                        />
                    </div>
                )
            }
        </div>
    )
};

export default Import;