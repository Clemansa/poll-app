import React from "react";

const CreateAccountPage = ({
  containerStyle,
  pollTitles,
  input,
  numbers,
  specialCharacters,
  setCurrentPage,
}) => {
  const [createAccountError, setCreateAccountError] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //  Validations

  // Email validation
  const validateEmail = (email) => {
    if (!email || email.length === 0) {
      setCreateAccountError((prev) => ({
        ...prev,
        email: "This field is required!",
      }));
      return false;
    }

    // email length
    if (email.length < 6) {
      setCreateAccountError((prev) => ({ ...prev, email: "Invalid email!" }));
      return false;
    }

    // @
    let numberOfAronds = 0;

    for (let i = 0; i < email.length; i++) {
      if (email[i] === "@") {
        numberOfAronds++;
      }
    }

    if (numberOfAronds !== 1) {
      setCreateAccountError((prev) => ({
        ...prev,
        email: "Email must contain a least one @!",
      }));
      return false;
    }

    const indexOfArond = email.indexOf("@");

    if (email[indexOfArond - 1 === "_"] || email[indexOfArond - 1] === "-") {
      setCreateAccountError((prev) => ({ ...prev, email: "Invalid email!" }));
      return false;
    }

    if (email[indexOfArond + 1 === "_"] || email[indexOfArond + 1] === "-") {
      setCreateAccountError((prev) => ({ ...prev, email: "Invalid email!" }));
      return false;
    }
    setCreateAccountError((prev) => ({ ...prev, email: "" }));
    return true;
  };

  // Password validate
  const validatePassword = (password) => {
    const hasNumber = numbers.some((num) => password.includes(num));
    const hasSpecial = specialCharacters.some((special) =>
      password.includes(special),
    );
    if (!password || password.length === 0) {
      setCreateAccountError((prev) => ({
        ...prev,
        password: "This field is required!",
      }));
      return false;
    }

    if (password.length < 8) {
      setCreateAccountError((prev) => ({
        ...prev,
        password: "The password must contain at least 8 characters!",
      }));
      return false;
    }

    if (!hasNumber || !hasSpecial) {
      setCreateAccountError((prev) => ({
        ...prev,
        password:
          "Password must contain at least one number and one special character!",
      }));
      return false;
    }

    setIsLoading((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const createNewAccount = async (e) => {
    e.preventDefault();
    setServerError("");

    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/singup", {
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
        throw new Error(result.message || "Autentificarea a esuat!");

        if (result.token) {
          localStorage.setItem("token,result.token");
        }
      }

      setCurrentPage("signIn");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`${containerStyle}  mt-20 mx-auto flex flex-col gap-5 `}>
      <div className="flex flex-col gap-3 ">
        {/* Header */}
        <h1 className="text-[24px] font-['Chewy'] text-sky-800">
          {" "}
          New funnyVote account
        </h1>
        <p className="text-[18px] font-['Poppins'] text-sky-700 font-medium">
          It takes a few seconds...
        </p>
      </div>

      {/* form container */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 items-start justify-center">
          <button>Continue with Google</button>
          <button>Continue with Facebook</button>
        </div>

        <div className="flex items-center w-full my-1">
          <div className="flex-grow h-[2px] bg-gradient-to-r from-pink-300 to-indigo-400"></div>
          <span className="px-3 text-sm font-['Poppins'] text-sky-500 font-medium">
            or
          </span>
          <div className="flex-grow h-[2px] bg-gradient-to-l from-pink-300 to-indigo-400"></div>
        </div>

        <form
          onSubmit={createNewAccount()}
          className="flex flex-col gap-3 justify-center"
        >
          <label>
            <input
              className={input}
              type="email"
              name="email"
              placeholder="Email"
            ></input>
          </label>

          {createAccountError.email ? <p>{createAccountError.email}</p> : null}

          <label>
            <input
              className={input}
              type="password"
              name="password"
              placeholder="Password"
            ></input>
          </label>

          {createAccountError.password ? (
            <p>{createAccountError.password}</p>
          ) : null}

          <button
            onClick={createNewAccount()}
            type="submit"
            className="w-full py-3 px-6 mt-6 text-white font-bold tracking-wider bg-sky-700 rounded-xl hover:bg-pink-500 transition-all duration-300 cursor-pointer"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;

// TO DO:
// STILIZARE PAGINA
// FUNCTIONALITATE BUTOANE SI FORMULAR

// RESPONSIVE
// ADAUGARE BUTON PT CLOSE
