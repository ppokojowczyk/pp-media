import React from 'react';

const StatCard = ({ name, value }) => {
    // return <div>{name} &rarr; <span>{value}</span></div>;

    return <div className="stat-card">
        <div className="stat-card-name">{name}</div>
        <div className="stat-card-value">{value}</div>
    </div>
};

export default StatCard;