import React from 'react';
import './SectionInfo.css';

function SectionInfo({ section }) {
    return (
        <div className="section-info">
            <h1>{section.num}</h1>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
        </div>
    );
}

export default SectionInfo;
