import React from "react";
import { useState } from "react";

const specialCharacters = ["!", "#", "$", "%", "^", "&", "*", "(", ")"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SignInForm = ({ btnStyle, setCurrentPage }) => {
  const [error, setError] = useState({});
  //styling

  const input =
    "w-full px-4 py-2 bg-white/60 rounded-lg border border-sky-800 inset-shadow-sm inset-shadow-indigo-400 focus:inset-shadow-none focus:border-2 focus:border-sky-800 outline-none";
  const errorStyle =
    "text-red-500 text-[12px] font-bold text-[Poppins] tracking-wider";
  // functions
  const validateUsername = (username) => {
    if (username.length === 0) {
      setError((prev) => ({ ...prev, username: "This field is required!" }));
      return false;
    }
    setError((prev) => ({ ...prev, username: "" }));
    return true;
  };

  const validatePassword = (password) => {
    if (password.length === 0) {
      setError((prev) => ({ ...prev, password: "This field is required!" }));
      return false;
    }

    const hasNumber = numbers.some((num) => password.includes(num));
    const hasSpecial = specialCharacters.some((special) =>
      password.includes(special),
    );

    if (password.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters!",
      }));
      return false;
    }

    if (!hasNumber || !hasSpecial) {
      setError((prev) => ({
        ...prev,
        password:
          "Password must contain at least one number and one special characters! ",
      }));
      return false;
    }
    setError((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const username = data.get("username");
    const password = data.get("password");

    if (!validateUsername(username) || !validatePassword(password)) {
      return false;
    }
    setCurrentPage("signIn");
  };

  return (
    <div className="max-w-[350px] mx-auto">
      <form onSubmit={handleSignIn} className="flex flex-col gap-3 mb-10">
        <label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={input}
          ></input>
        </label>
        {error.username ? <p className={errorStyle}>{error.username}</p> : null}
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={input}
          ></input>
        </label>
        {error.password ? <p className={errorStyle}>{error.password}</p> : null}
        <button type="submit" className={btnStyle}>
          Sign In
        </button>
      </form>

      <p className="font-[Poppins] text-[14px] text-sky-700 mt-3 tracking-wider">
        Create your account right
        <button
          onClick={() => setCurrentPage("newAccount")}
          className="underline font-bold pl-2"
        >
          here
        </button>
      </p>
    </div>
  );
};

export default SignInForm;

// SALVARE DATE USER IN BACKEND
