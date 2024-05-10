import React from 'react';

import "./ModuleDescription.css";

function ModuleDescription({ module }) {
    return (
        <div className="module-description">
            <h2>Module 1: {module.title}</h2>
            <p>{module.description}</p>
        </div>
    );
}

export default ModuleDescription;
