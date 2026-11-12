import React from "react";
import { useState } from "react";

const specialCharacters = ["!", "#", "$", "%", "^", "&", "*", "(", ")"];
const numbers = ["0", "1", "3", "4", "5", "6", "7", "8", "9"];
const SignInForm = ({ btnStyle }) => {
  const [error, setError] = useState("");
  //styling
  const input =
    "w-full px-4 py-2 bg-white/60 rounded-lg border border-sky-800 inset-shadow-sm inset-shadow-indigo-400 focus:inset-shadow-none focus:border-2 focus:border-sky-800 outline-none";

  // functions

  return (
    <div className="max-w-[350px] mx-auto">
      <form className="flex flex-col gap-3 mb-10">
        <label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={input}
          ></input>
        </label>

        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={input}
          ></input>
        </label>
      </form>
      <button className={btnStyle}>Sign In</button>
      <p className="font-[Poppins] text-[14px] text-sky-700 mt-3 tracking-wider">
        Create your account right
        <button className="underline font-bold pl-2">here</button>
      </p>
    </div>
  );
};

export default SignInForm;

// de adaugat erorile de completare
// de facut submit pagini
// de facut pagina pt creare cont
// de facut buton inchidere aplicatie
