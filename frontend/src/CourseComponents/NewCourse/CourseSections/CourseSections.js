import React from 'react';
import './CourseSections.css';
import SectionModal from './SectionModal/SectionModal';

function CourseSections() {
    const [showModal, setShowModal] = React.useState(false);

    const handleAddSection = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="course-sections">
            <div className="section">
                <p>Introduction</p>
                <button>Edit</button>
            </div>
            <div className="section">
                <p>Section 1</p>
                <button>Edit</button>
            </div>
            <button className="add-section" onClick={handleAddSection}>Add Section</button>
            {showModal && <SectionModal onClose={handleCloseModal} />}
        </div>
    );
}

export default CourseSections;
