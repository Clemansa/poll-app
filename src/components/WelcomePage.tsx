import React, { useState } from "react";
import SignInForm from "./SignInForm";

const WelcomePage = ({ titleStyle, btnStyle, setIsModalOpen }) => {
  const [openSignInForm, setOpenSignInForm] = useState(false);
  const [isBtnContainerOpen, setIsBtnContainerOpen] = useState(true);

  // functions
  const handleOpenSignInForm = () => {
    if (isBtnContainerOpen === true) {
      setIsBtnContainerOpen(false);
      setOpenSignInForm(true);
    }
  };

  return (
    <div className=" mt-20 ">
      <h1 className="font-['Chewy'] text-center text-[36px] text-sky-900">
        What's new today ?
      </h1>

      <p className="text-[18px] tracking-wider text-sky-800 font-bold text-center  mt-4">
        The place where we resolve humanity’s greatest dilemmas it's right here.
        Let's see what you think...
        <img
          src="/src/images/emojiThinking.png"
          className="w-10 h-10 inline ml-3"
        ></img>
      </p>
      {isBtnContainerOpen ? (
        <div className="flex items-center justify-between gap-4 mt-10">
          <button onClick={() => setIsModalOpen(true)} className={btnStyle}>
            Try one
          </button>
          <button onClick={() => handleOpenSignInForm()} className={btnStyle}>
            Sign In
          </button>
        </div>
      ) : null}

      {openSignInForm ? <SignInForm btnStyle={btnStyle} /> : null}

      {/* de facut :
      1.de facut funcytionalitatea pt butonul sign in
      2.de facut pagina pt creare cont
       
       */}
    </div>
  );
};

export default WelcomePage;
