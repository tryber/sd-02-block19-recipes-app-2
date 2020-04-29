import React, { useContext } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
import '../styles/Profile.css';

const setPageElements = (
  setHeaderTitle,
  setDisplayHeader,
  setDisplaySearchButton,
  setDisplayFooter,
) => {
  setHeaderTitle('Perfil');
  setDisplayHeader(true);
  setDisplaySearchButton(false);
  setDisplayFooter(true);
};

const logout = () => {
  localStorage.clear();
};

const renderProfileButtons = () => (
  <div className="profile-buttons">
    <a href="/receitas-feitas">
      <button data-testid="profile-done-btn">
        Receitas Feitas
      </button>
    </a>
    <a href="/receitas-favoritas">
      <button data-testid="profile-favorite-btn">
        Receitas Favoritas
      </button>
    </a>
    <a href="/">
      <button onClick={logout} data-testid="profile-logout-btn">
        Sair
      </button>
    </a>
  </div>
);

const Profile = () => {
  const {
    headerTitle: [, setHeaderTitle],
    displayHeader: [, setDisplayHeader],
    displaySearchButton: [, setDisplaySearchButton],
    displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);

  setPageElements(setHeaderTitle, setDisplayHeader, setDisplaySearchButton, setDisplayFooter);

  const email = (JSON.parse(localStorage.getItem('user')) || {}).email;

  return (
    <div className="profile">
      <p data-testid="profile-email">{email}</p>
      {renderProfileButtons()}
    </div>
  );
};

export default Profile;
