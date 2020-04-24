import React, { useEffect, useState } from 'react';

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

const handleClick = ({ checked }, setCheckbox, checkbox, index) => {
  setCheckbox([{ ...checkbox[0], [index]: checked }]);
};

const renderCheckBox = (inputsCheckbox, checkbox, setCheckbox) => {
  return (
    inputsCheckbox.map((el, index) => (
      <label htmlFor={el[0]}>
        <input
          type="checkbox"
          name={el[0]}
          id={el[0]}
          checked={checkbox[0][index]}
          onChange={({ target }) => handleClick(target, setCheckbox, checkbox, index)}
        />
        {`- ${el[0]} - ${el[1]}`}
      </label>
    ))
  );
};

const CheckBox = ({ foods, allIngredients, typeFood }) => {
  const inputsCheckbox = allIngredients(foods);
  const id = foods[0][`id${typeFood}`];
  const [checkbox, setCheckbox] = useState(setInitialArray(inputsCheckbox, id));
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
  }, [checkbox, id]);
  return (
    <div>
      {renderCheckBox(inputsCheckbox, checkbox, setCheckbox)}
    </div>
  );
};

export default CheckBox;
