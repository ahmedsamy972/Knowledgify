import React from 'react';
import "./CourseCurriculum.css";

function CourseCurriculum({ modules }) {
    return (
        <div className="course-curriculum">
            <h2>Course Curriculum</h2>
            <div className="modules">
                {modules.map(module => (
                    <div key={module.id} className="module">
                        <h3>{module.name}</h3>
                        <p>{module.modulesCount} Modules</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseCurriculum;
