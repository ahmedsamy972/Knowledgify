import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SectionModal from './SectionModal/SectionModal';
import './CourseSections.css';

function CourseSections({ courseId }) {
    const [showModal, setShowModal] = useState(false);

    const [sections, setSections] = useState([]);

    return (
        <div className="course-sections">

            {
                sections && sections.map((section, index) => {
                    return (
                        <div className="section" key={index}>
                            <p>{section.num}</p>

                            <Link to={`/courses/${courseId}/sections/${section.ID}`}>
                                <p>{section.title}</p>
                            </Link>
                            
                            <p>{section.description}</p>
                        </div>
                    )
                })
            }
            
            <button className="add-section" onClick={() => { setShowModal(true); }}>Add Section</button>
            
            {showModal && <SectionModal onClose={() => { setShowModal(false); }} setSections={setSections} courseId={courseId} />}
        
        </div>
    );
}

export default CourseSections;
