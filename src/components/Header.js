import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import { RecipesAppContext } from '../context/RecipesAppContext';
import '../styles/Header.css';

export default function Header() {
  const {
    headerTitle: [headerTitle],
    displayHeader: [displayHeader],
    displaySearchBar: [displaySearchBar, setDisplaySearchBar],
    displayProfileButton: [displayProfileButton],
  } = useContext(RecipesAppContext);

  const toggleSearchBar = () => setDisplaySearchBar(!displaySearchBar);

  return displayHeader ? (
    <div className="header-container">
      <nav>
        {displayProfileButton && (
        <div>
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={ProfileIcon} alt="Ícone do Perfil" />
          </Link>
        </div>
        )}
        <div>
          <span data-testid="page-title">
            {headerTitle}
          </span>
        </div>
        <div>
          <button data-testid="search-top-btn" type="button" onClick={toggleSearchBar}>
            <img src={SearchIcon} alt="Ícone de busca" />
          </button>
        </div>
      </nav>
    </div>
  ) : null;
}
