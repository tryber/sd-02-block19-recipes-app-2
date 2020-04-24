import React from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import '../styles/HorizontalCard.css';

const HorizontalCard = ({ index, type, id, image, name, category, area, alcoholicOrNot,
  doneDate, tags }) => {
  const inDoneRecipes = document.URL.includes('receitas-feitas');

  return (
    <div className="horizontal-card">
      <div className="lado-esquerdo">
        <img alt="" src={image} />
      </div>
      <div className="lado-direito">
        <div className="parte-de-cima">
          <div>
            <h3>
              {(type === 'comida') ? `${area} - ${category}` : alcoholicOrNot}
            </h3>
            <h2>{name}</h2>
          </div>
          {inDoneRecipes && <ShareButton index={index} id={id} type={type} />}
        </div>
        {inDoneRecipes ?
          <div className="parte-de-baixo">
            <h3>{`Feita em: ${doneDate}`}</h3>
            <div>
              {(type === 'comida') && tags.map((tag) => <h2 key={tag}>{tag}</h2>)}
            </div>
          </div> :
          <div className="parte-de-baixo">
            <ShareButton index={index} id={id} type={type} />
            <FavoriteButton index={index} id={id} category={category} image={image} />
          </div>
        }
      </div>
    </div>
  );
};

HorizontalCard.propTypes = {
  type: PropTypes.oneOf(['comida', 'bebida']).isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

HorizontalCard.defaultProps = {
  area: null,
  alcoholicOrNot: null,
  doneDate: null,
  tags: null,
};

export default HorizontalCard;
