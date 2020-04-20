import React, { useState } from 'react';
import propTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import '../styles/ShareButton.css';

const ShareButton = ({ index, id, type }) => {
  const [tooltipText, setTooltipText] = useState('Copiar link');

  const copyToClipboard = () => {
    // const pageURL = document.URL;
    const link = `http://localhost:3000/receitas/${type}/${id}`;
    navigator.clipboard.writeText(link);
    setTooltipText('Link copiado!');
  };

  return (
    <div className="share-button">
      <button
        onClick={copyToClipboard}
        data-testid={(index !== null) ? `${index}-horizontal-share-btn` : 'share-btn'}
      >
        <span className="tooltip-text" data-testid="tooltip-text" >{tooltipText}</span>
        <img alt="" src={ShareIcon} />
      </button>
    </div>
  );
};

ShareButton.propTypes = {
  index: propTypes.number,
  id: propTypes.string.isRequired,
  type: propTypes.oneOf(['comidas', 'bebidas']).isRequired,
};

ShareButton.defaultProps = {
  index: null,
};

export default ShareButton;
