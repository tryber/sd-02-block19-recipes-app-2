import React, { useContext } from 'react';
import UserIcon from '../images/user.svg';
import SearchIcon from '../images/search.svg';
import { RecipesAppContext } from '../context/RecipesAppContext';
import '../styles/Header.css';

export default function Header() {
  const {
    headerTitle: [headerTitle],
    displayHeader: [displayHeader],
  } = useContext(RecipesAppContext);

  return displayHeader ? (
    <div className="header-container">
      <nav>
        <div>
          <img data-testid="profile-top-btn" src={UserIcon} alt="Ícone de usuário" />
        </div>
        <div>
          <span data-testid="page-title">
            {headerTitle}
          </span>
        </div>
        <div>
          <img data-testid="search-top-btn" src={SearchIcon} alt="Ícone de busca" />
        </div>
      </nav>
    </div>
  ) : null;
}
