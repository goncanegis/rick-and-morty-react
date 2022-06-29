import React from 'react';
import { Character } from '../interfaces';

const CharacterCard: React.FC<Character> = ({ id, image, name, location }) => {
  return (
    <div className="char-card">
      <img src={image} alt={name} />
      <div className="card-data">
        <div className="card-data-id">
          <p>id: #{id}</p>
        </div>
        <div className="card-data-content">
          <p>
            Name: <span>{name}</span>
          </p>
          {location !== undefined && (
            <p>
              Location: <span>{location.name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
