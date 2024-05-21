import { useState } from "react";

export const LoginControler = () => {
  const isValidPassword = (value: string | undefined): boolean => {
    // const passwordRegExp = new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$");
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const validPassword = passwordRegExp.test(value);
    return validPassword;
  };
  const isValidEmail = (value: string | undefined): boolean => {
    const emailRegExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const validEmail = emailRegExp.test(value);
    return validEmail;
  };
  const [showErrors, setShowErrors] = useState(false);

  return { isValidPassword, showErrors, setShowErrors, isValidEmail };
};
