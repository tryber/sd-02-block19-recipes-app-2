import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import HorizontalCard from '../components/HorizontalCard';
import App from '../App';
import RecipesAppProvider from '../context/RecipesAppContext';
import DoneRecipes from '../pages/DoneRecipes';
import imagemTeste from '../images/imagemTeste.svg';

// global.document.URL = 'http://localhost/receitas-feitas'

afterEach(cleanup);

test('renderiza todos os elementos do card', () => {
  const { getByTestId, history } = render(
    <RecipesAppProvider>
      <HorizontalCard
        index={2} type="comida" id="453"
        image={imagemTeste}
        name="Chelsea Buns" category="Dessert" area="British"
        doneDate="01/12/2019" tags={['bun', 'baking']}
      />
    </RecipesAppProvider>,
  );

  // console.log(history.location.pathname)

  const image = getByTestId('2-horizontal-image');
  expect(image).toBeInTheDocument();

  const topText = getByTestId('2-horizontal-top-text');
  expect(topText).toBeInTheDocument();

  const name = getByTestId('2-horizontal-name');
  expect(name).toBeInTheDocument();

  // const doneDate = getByTestId('2-horizontal-done-date');
  // expect(doneDate).toBeInTheDocument();
});
