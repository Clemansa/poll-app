import React, { useState } from "react";
import SignInForm from "./SignInForm";

const WelcomePage = ({
  titleStyle,
  btnStyle,
  setIsModalOpen,
  isTablet,
  isLaptop,
}) => {
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
    <div className="mt-20 mx-auto lg:flex lg:gap-15 lg:items-start lg:justify-center">
      <div className="max-w-[350px] mx-auto">
        {/* Header */}
        <div>
          <h1 className={titleStyle}>What do you think?</h1>
          <p className="text-[18px] text-[Poppins] text-center my-6 font-medium tracking-wider text-sky-800">
            The place where humanity's greatest dilemmas find their answer is
            right here.Let's see what you think...{" "}
            <img
              src="/src/images/emojiThinking.png"
              className="inline w-6 h-6"
            ></img>
          </p>
        </div>
        {/* Btns Container */}
        {isBtnContainerOpen ? (
          <div className="flex items-center justify-between gap-4 my-10 ">
            <button onClick={() => setIsModalOpen(true)} className={btnStyle}>
              Try one
            </button>
            <button onClick={() => handleOpenSignInForm()} className={btnStyle}>
              Sign In
            </button>
          </div>
        ) : null}
      </div>

      {/* Balance image */}
      {isLaptop && openSignInForm === false ? (
        <img
          src="/src/images/balance.png"
          className="h-[200px] w-[200px]"
        ></img>
      ) : null}

      {/*Sign in container display  */}

      {openSignInForm ? <SignInForm btnStyle={btnStyle} /> : null}
    </div>
  );
};

export default WelcomePage;
// {/* de facut :
//       1.de facut funcytionalitatea pt butonul sign in
//       2.de facut pagina pt creare cont

//        */}
