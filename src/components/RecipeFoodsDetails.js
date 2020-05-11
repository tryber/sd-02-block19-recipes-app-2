import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import YouTube from 'react-youtube';

import { RecipesAppContext } from '../context/RecipesAppContext';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import RenderCarousel from './RenderCarousel';
import ImgCatTitleDetails from './ImgCatTitleDetails';
import CurrentDetailsButton from './CurrentDetailsButton';
import RenderShareFavorite from './RenderShareFavorite';
import useFoodById from '../hooks/useFoodById';
import '../styles/RecipeMealDetails.css';
import '../styles/RecipeFoodsDetails.css';

const renderVideo = (youtube) => (
  (youtube) && (
    <div className="video-content">
      <div className="video-title">Video:</div>
      <div>
        <div className="video-details" data-testid="video">
          <YouTube className="video-youtube" videoId={youtube.split('=')[1]} />
        </div>
      </div>
    </div>
  )
);

const RecipeFoodDetails = ({ id, typeFood }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [carousel, setCarousel] = useState({ isLoading: false, data: [] });
  const detailsRecipe = useFoodById(id, typeFood) || [];
  const { setDisplay, displaySearchBar: [, setDisplaySearchBar] } = useContext(RecipesAppContext);

  useEffect(() => {
    setDisplay(false, false, false);
    if (detailsRecipe.length > 0) setIsLoading(false);
    setDisplaySearchBar(false);
  }, [setDisplay, detailsRecipe, setDisplaySearchBar]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="details-container">
      <ImgCatTitleDetails foods={detailsRecipe} typeFood={typeFood} />
      <Ingredients foods={detailsRecipe} />
      <Instructions instructions={detailsRecipe[0].strInstructions} />
      {renderVideo(detailsRecipe[0].strYoutube || detailsRecipe[0].strVideo)}
      <RenderCarousel carousel={carousel} setCarousel={setCarousel} typeFood={typeFood} />
      <CurrentDetailsButton
        id={Number(id)}
        typeFood={typeFood}
        renderInProgress={false}
        recipe={detailsRecipe}
      />
      <RenderShareFavorite id={id} typeFood={typeFood} detailsRecipe={detailsRecipe} />
    </div>
  );
};

RecipeFoodDetails.propTypes = {
  id: propTypes.string,
  typeFood: propTypes.string,
}.isRequired;

export default RecipeFoodDetails;
