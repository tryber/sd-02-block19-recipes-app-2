import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../images/user.svg';
import SearchIcon from '../images/search.svg';
import { RecipesAppContext } from '../context/RecipesAppContext';
import '../styles/Header.css';

export default function Header() {
  const {
    headerTitle: [headerTitle],
    displayHeader: [displayHeader],
    displaySearchBar: [displaySearchBar, setDisplaySearchBar],
  } = useContext(RecipesAppContext);

  return displayHeader ? (
    <div className="header-container">
      <nav>
        <div>
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={UserIcon} alt="Ícone de usuário" />
          </Link>
        </div>
        <div>
          <span data-testid="page-title">
            {headerTitle}
          </span>
        </div>
        <div>
          <button type="button" onClick={() => setDisplaySearchBar(!displaySearchBar)}>
            <img data-testid="search-top-btn" src={SearchIcon} alt="Ícone de busca" />
          </button>
        </div>
      </nav>
    </div>
  ) : null;
}
