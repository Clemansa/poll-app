import React from "react";

const Logo = () => {
  return (
    <div className="flex font-bold gap-2">
      <img
        src="/src/images/logo-img.png"
        alt="Logo"
        className="w-5 h-5 md:w-8 md:h-8"
      />
      <p className="font-['Chewy'] text-5 text-sky-900 md:text-[24px]">
        funnyVote
      </p>
    </div>
  );
};

export default Logo;
