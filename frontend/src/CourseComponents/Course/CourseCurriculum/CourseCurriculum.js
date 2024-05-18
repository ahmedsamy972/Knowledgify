import React from 'react';
import "./CourseCurriculum.css";
import { Link } from 'react-router-dom';

function CourseCurriculum({ courseId, modules }) {
    return (
        <div className="course-curriculum">
            <h1>Course Curriculum</h1>
            <div className="modules">
                {modules && modules.map(module => (
                    <div key={module.ID} className="module">
                        <h2>{module.num}</h2>

                        <Link to={`/courses/${courseId}/sections/${module.ID}`}>
                            <h3>{module.title}</h3>
                        </Link>
                        
                        <p>{module.description} Modules</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseCurriculum;
