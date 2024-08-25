import React, { useEffect, useState } from 'react';
import Container from '../components/container';
import Button from '../components/button';
import mediaTypes from '../utils/media-types';
import Choice from '../components/choice';
import List from '../components/list';
import { getMediaStoreUrl } from '../utils/api';
import { dataSource } from '../utils/data-source';
import { numberColumn, titleColumn } from '../utils/columns';

const Inventory = () => {

    const [mediaType, setMediaType] = useState();
    const [repository, setRepository] = useState(null);
    const [refresh_, setRefresh_] = useState(false);
    const [data, setData] = useState([]);
    const [removed, setRemoved] = useState([]);

    const clear = () => {
        setRepository(null);
        setData([]);
        setRemoved([]);

        if (mediaType) {
            const repo = dataSource(getMediaStoreUrl(mediaType));
            repo._filters = {
                own: 1,
            };
            repo.load().then(({ data }) => {
                setData(data);
                setRepository(true);
            });
        }
    };

    useEffect(() => refresh(), [data]);

    const remove = ({ id }) => {
        setData(data.filter((item) => {
            if (id === item.id) {
                setRemoved([...removed, item]);
            }
            return id !== item.id;
        }));
    };

    const undo = () => {
        if (removed.length) {
            const newRemoved = [...removed];
            const last = newRemoved.pop();
            setData([...data, last]);
            setRemoved(newRemoved);
        }
    };

    const refresh = () => {
        setRefresh_(true);
        setTimeout(() => setRefresh_(false));
    };

    useEffect(() => clear(), [mediaType]);

    const addToPanel = <>
        <label>
            Select Media Type
            <Choice
                value={mediaType}
                data={mediaTypes.map(({ type }) => {
                    return {
                        name: type,
                        value: type,
                    };
                })}
                onChange={(value) => setMediaType(value)}
            />
        </label>
        <Button
            text='Clear'
            onClick={clear}
        />
        <Button
            text='Undo'
            onClick={undo}
        />
        <Container className={'inventory-counter'}>
            <strong>Total: {data.length + removed.length} | Left: {data.length} | Done: {removed.length}</strong>
        </Container>
    </>;

    return (
        <Container className='inventory'>
            <Container className='inventory-list'>
                <List
                    repository={{
                        load: () => Promise.resolve({ data }),
                    }}
                    columns={[
                        numberColumn,
                        titleColumn,
                        {
                            caption: "Options",
                            alignment: 'center',
                            allowEditing: false,
                            content: (column, data) => [
                                <Button text='OK'
                                    onClick={() => {
                                        remove(data);
                                    }}
                                />
                            ],
                        },
                    ]}
                    withAddNew={false}
                    withRefreshButton={false}
                    refresh={refresh_}
                    addToPanel={addToPanel}
                />
            </Container>
        </Container>
    )
};

export default Inventory;
