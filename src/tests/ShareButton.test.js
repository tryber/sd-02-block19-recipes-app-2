import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ShareButton from '../components/ShareButton';

afterEach(cleanup);

test('renderiza o botão quando não se passa "index" como prop', () => {
  const { getByTestId } = render(<ShareButton id="385" type="bebidas" />);

  const button = getByTestId('share-btn');
  expect(button).toBeInTheDocument();
});

test('renderiza o botão quando se passa "index" como prop', () => {
  const { getByTestId, getByText } = render(<ShareButton id="454" type="comidas" index={0} />);

  const button = getByTestId('0-horizontal-share-btn');
  expect(button).toBeInTheDocument();

  // const tooltipTextBefore = getByTestId('tooltip-text');
  let tooltipText = getByText('Copiar link');
  expect(tooltipText).toBeInTheDocument();

  // fireEvent.click(button);

  // tooltipText = getByText('Link copiado!');
  // expect(tooltipText).toBeInTheDocument();
});
