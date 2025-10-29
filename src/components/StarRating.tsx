
import React from 'react';

interface StarRatingProps {
  rating: number;
  onRating: (rating: number) => void;
}

const StarRating = ({ rating, onRating }: StarRatingProps) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="star-rating">
            {stars.map(star => (
                <span
                    key={star}
                    className={star <= rating ? 'star-filled' : 'star-empty'}
                    onClick={() => onRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
