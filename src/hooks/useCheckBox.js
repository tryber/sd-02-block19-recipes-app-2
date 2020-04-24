import { useState, useEffect } from 'react';

const useCheckBox = () => {
  const [checkbox, setCheckbox] = useState([]);

  return [checkbox, setCheckbox];
};

export default useCheckBox;
