import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';

import '../styles/Checkbox.css';
import { RecipesAppContext } from '../context/RecipesAppContext';

export const verifyAllChecked = (id, setDisabled) => {
  const newArray = (JSON.parse(localStorage.getItem('checkbox')) || []);
  const verifyArray = newArray.filter((el) => el[id]);
  const resp = Object.values(verifyArray[0][id][0]);
  setDisabled(!resp.every((ele) => ele));
};

const verifyLocalStorage = (id) => {
  const existId = (JSON.parse(localStorage.getItem('checkbox')) || [])
    .findIndex((el) => el[id]);
  return existId;
};

const addLocalStorage = (id, checkbox) => {
  const newArray = JSON.parse(localStorage.getItem('checkbox'));
  const index = verifyLocalStorage(id);
  newArray[index] = {
    [id]: [...checkbox],
  };
  localStorage.setItem('checkbox', JSON.stringify(newArray));
};

const setInitialArray = (inputsCheckbox, id) => {
  const locaStorageInitialArray = (JSON.parse(localStorage.getItem('checkbox')) || [])
    .filter((el) => el[id]);
  const initialArray = inputsCheckbox.reduce((acc, cur, index) => {
    const startChecked = { [index]: false };
    return [{ ...acc[0], ...startChecked }];
  }, []);
  return (
    (locaStorageInitialArray.length === 0)
      ? initialArray
      : locaStorageInitialArray[0][id]
  );
};

const handleClick = (target, setCheckbox, checkbox, index) => {
  setCheckbox([{ ...checkbox[0], [index]: target.checked }]);
};

const renderCheckBox = (inputsCheckbox, checkbox, setCheckbox) => (
  inputsCheckbox.map((el, index) => (
    <label key={el} className="label-checkbox" htmlFor={`- ${el[0]} - ${el[1]}`}>
      <input
        data-testid={`- ${el[0]} - ${el[1]} - ingredients`}
        className="input-checkbox"
        type="checkbox"
        name={`- ${el[0]} - ${el[1]}`}
        id={`- ${el[0]} - ${el[1]}`}
        checked={checkbox[0][index]}
        onChange={({ target }) => (
          handleClick(target, setCheckbox, checkbox, index))}
      />
      <span className={(checkbox[0][index]) ? 'checkbox-text' : ''}>
        {`- ${el[0]} - ${el[1]}`}
      </span>
    </label>
  ))
);

const CheckBox = ({ foods, allIngredients, typeFood }) => {
  const inputsCheckbox = allIngredients(foods);
  const id = foods[0][`id${typeFood}`];
  const [checkbox, setCheckbox] = useState(setInitialArray(inputsCheckbox, id));
  const { disabled: [, setDisabled] } = useContext(RecipesAppContext);
  useEffect(() => {
    if (verifyLocalStorage(id) === -1) {
      const existLocalStorage = JSON.parse(localStorage.getItem('checkbox')) || [];
      const newArray = [
        { [id]: checkbox },
      ];
      localStorage.setItem('checkbox', JSON.stringify([...existLocalStorage, ...newArray]));
    } else {
      addLocalStorage(id, checkbox);
    }
    verifyAllChecked(id, setDisabled);
  }, [checkbox, id, setDisabled]);
  return (
    <div className="checkbox-container">
      {renderCheckBox(inputsCheckbox, checkbox, setCheckbox, id, setDisabled)}
    </div>
  );
};

CheckBox.propTypes = {
  foods: propTypes.instanceOf(Array).isRequired,
  allIngredients: propTypes.func.isRequired,
  typeFood: propTypes.string.isRequired,
};

export default CheckBox;
