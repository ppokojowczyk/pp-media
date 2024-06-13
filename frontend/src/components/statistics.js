import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../utils/constants";

const Statistics = () => {

    const [data, setData] = useState([]);

    const repository = {
        statistics: () => {
            return Axios
                .get(API_URL + '/statistics')
                .then(({ data }) => {
                    return data;
                });
        }
    };

    useEffect(() => {
        repository
            .statistics()
            .then((d) => {
                setData(d);
            })
    }, []);

    return (
        <div className="statistics">
            {
                data.map((d) => {
                    return <div>{d.name} &rarr; <span>{d.value}</span></div>
                })
            }
        </div>
    )
};

export default Statistics;