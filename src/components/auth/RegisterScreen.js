import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { starRegisterWithEmail } from "../../actions/auth";
const initialState = {
  name: "nacho",
  email: "nachoprueba@hotmail.com",
  password: "123456",
  password2: "123456",
};

export const RegisterScreen = () => {
  const [values, handleInputChange] = useForm(initialState);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(starRegisterWithEmail(initialState));
    }
  };
  const dispatch = useDispatch();

  const { name, password, password2, email } = values;

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characters and match each other"
        )
      );
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form
        onSubmit={handleOnSubmit}
        className="animate__animated animate__fadeIn animate__fast"
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={values.name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={values.email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={values.password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={values.password2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
