import React, { useState } from "react";

const SignInForm = ({
  btnStyle,
  setCurrentPage,
  input,
  numbers,
  specialCharacters,
}) => {
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Styling

  const errorStyle =
    "text-red-500 text-[12px] font-bold font-[Poppins] tracking-wider";

  // Validation
  const validateUsername = (username) => {
    if (!username || username.trim().length === 0) {
      setError((prev) => ({ ...prev, username: "This field is required!" }));
      return false;
    }
    setError((prev) => ({ ...prev, username: "" }));
    return true;
  };

  const validatePassword = (password) => {
    if (!password || password.length === 0) {
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
          "Password must contain at least one number and one special character!",
      }));
      return false;
    }

    setError((prev) => ({ ...prev, password: "" }));
    return true;
  };

  // Sending dates to the  Backend
  const handleSignIn = async (e) => {
    e.preventDefault();
    setServerError(""); // reset previous errors from server

    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    // check both validations before stopping execution
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);

    if (!isUsernameValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      // Înlocuiește URL-ul cu endpoint-ul real al backend-ului tău
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // We throw the error received from the backend (e.g., Invalid credentials)
        throw new Error(result.message || "Autentificarea a eșuat!");
      }

      // Optional: Save the JWT token or user data to localStorage
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // Redirect the user upon success
      setCurrentPage("signIn");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
          />
        </label>
        {error.username ? <p className={errorStyle}>{error.username}</p> : null}

        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={input}
            disabled={isLoading}
          />
        </label>
        {error.password ? <p className={errorStyle}>{error.password}</p> : null}

        {/* Display error received from the backend */}
        {serverError ? <p className={errorStyle}>{serverError}</p> : null}

        <button type="submit" className={btnStyle} disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="font-[Poppins] text-[14px] text-sky-700 mt-3 tracking-wider">
        Create your account right
        <button
          type="button"
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
