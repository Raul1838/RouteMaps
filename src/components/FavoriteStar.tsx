import React from 'react';

interface FavoriteStarProps {
    isFavorite: boolean;
    onToggle: () => void;
}


const FavoriteStar: React.FC<FavoriteStarProps> = ({ isFavorite, onToggle }) => {
    const handleClick = () => {
        onToggle();
    };

    return (
        <i
            className={isFavorite ? 'fas fa-star' : 'far fa-star'}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        ></i>
    );
};

export default FavoriteStar;

