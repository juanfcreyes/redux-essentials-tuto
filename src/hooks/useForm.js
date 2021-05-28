import { useState } from "react";

export const useForm = (form) => {
  const [values, setValues] = useState(form);

  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((state) => ({ ...state, [name]: value }));
  };

  return [values, onChangeHandle, setValues];
};
