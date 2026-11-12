import React from "react";

const Logo = () => {
  return (
    <div className="flex font-bold gap-2">
      <img src="/src/images/logo-img.png" alt="Logo" className="w-5 h-5" />
      <p className="font-['Chewy'] text-5 text-sky-900">funnyVote</p>
    </div>
  );
};

export default Logo;
