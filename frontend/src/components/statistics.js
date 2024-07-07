import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../utils/constants";
import Button from "./button";
import Header from "./header";

const Statistics = () => {

    const [data, setData] = useState([]);

    const repository = {
        statistics: () => {
            return Axios
                .get(API_URL + '/statistics')
                .then(({ data }) => {
                    return data;
                });
        },
    };

    const load = () => repository.statistics().then((d) => setData(d));

    useEffect(() => { load(); }, []);

    return (
        <div className="statistics">
            <Header>Statistics</Header>
            <Button
                text="Refresh"
                onClick={load}
            />
            <br /><br />
            {data.map((d) => <div>{d.name} &rarr; <span>{d.value}</span></div>)}
        </div>
    )
};

export default Statistics;