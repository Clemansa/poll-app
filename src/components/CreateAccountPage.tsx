import React from "react";

const CreateAccountPage = ({ containerStyle, pollTitles }) => {
  return (
    <div className={`${containerStyle} mt-20 mx-auto`}>
      <h1 className={`${pollTitles} text-[24px]`}>
        {" "}
        Create your account right here!
      </h1>
      <p>It takes a few seconds...</p>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Facebook</button>
      </div>

      <hr></hr>
      <form>
        <label>
          <input type="email" name="email" placeholder="Email"></input>
        </label>

        <label>
          <input type="password" name="password" placeholder="Password"></input>
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAccountPage;

// TO DO:
// STILIZARE PAGINA
// FUNCTIONALITATE BUTOANE SI FORMULAR

// RESPONSIVE
// ADAUGARE BUTON PT CLOSE
