import React, { useState } from 'react';
import ShareIcon from '../images/shareIcon.svg';
import '../styles/ShareButton.css';

const ShareButton = () => {
  const [tooltipText, setTooltipText] = useState('Copiar link');

  const copyToClipboard = () => {
    const pageURL = document.URL;
    navigator.clipboard.writeText(pageURL);
    setTooltipText('Link copiado!');
  };

  return (
    <div className="share-button">
      <button onClick={copyToClipboard}>
        <span className="tooltip-text" >{tooltipText}</span>
        <img alt="sdfsdfsfsfsfds" src={ShareIcon} />
      </button>
    </div>
  );
};

export default ShareButton;
