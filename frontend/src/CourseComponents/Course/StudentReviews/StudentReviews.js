import React from 'react';

import "./StudentReviews.css";

function StudentReviews({ reviews }) {
    return (
        <div className="student-reviews">
            <h2>Student Reviews</h2>
            {reviews.map(review => (
                <div key={review.id} className="review">
                    <strong>{review.author}</strong>
                    <p>{review.content}</p>
                </div>
            ))}
        </div>
    );
}

export default StudentReviews;
