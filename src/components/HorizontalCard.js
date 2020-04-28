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
        <a to={`/receitas/${type}/${id}`}>
          <img alt="" src={image} data-testid={`${index}-horizontal-image`} />
        </a>
      </div>
      <div className="lado-direito">
        <div className="parte-de-cima">
          <div>
            <p data-testid={`${index}-horizontal-top-text`} className="top-text">
              {(type === 'comida') ? `${area} - ${category}` : alcoholicOrNot}
            </p>
            <p data-testid={`${index}-horizontal-name`} className="name">
              <a to={`/receitas/${type}/${id}`}>
                {name}
              </a>
            </p>
          </div>
          {inDoneRecipes && <ShareButton index={index} id={id} type={type} />}
        </div>
        {inDoneRecipes ?
          <div className="parte-de-baixo-in-done-recipes">
            <p data-testid={`${index}-horizontal-done-date`} className="done-date">
              {`Feita em: ${doneDate}`}
            </p>
            <div className="tags">
              {(type === 'comida') && tags.map((tag) => <p key={tag}>{tag}</p>)}
            </div>
          </div> :
          <div className="parte-de-baixo-in-favorite-recipes">
            <ShareButton index={index} id={id} type={type} />
            <FavoriteButton
              index={index} id={id} category={category} image={image} area={area}
              alcoholicOrNot={alcoholicOrNot} name={name} type={type}
            />
          </div>
        }
      </div>
    </div>
  );
};

HorizontalCard.propTypes = {
  index: PropTypes.number.isRequired,
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
