import React from 'react';
import './SectionInfo.css';

function SectionInfo({ section }) {
    return (
        <div className="section-info">
            <h2>{section.name}</h2>
            <p>{section.description}</p>
        </div>
    );
}

export default SectionInfo;
