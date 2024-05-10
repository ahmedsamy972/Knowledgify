import React from 'react';
import './PointsSummary.css';

function PointsSummary({ points }) {
    return (
        <div className="points-summary">
            <div className="points-box">
                <h3>Total Points</h3>
                <p>{points.total}</p>
            </div>
            <div className="points-box">
                <h3>Available Points</h3>
                <p>{points.available}</p>
            </div>
        </div>
    );
}

export default PointsSummary;
