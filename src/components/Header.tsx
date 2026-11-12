import React from "react";
import Logo from "./Logo";

const Header = ({ isMobile }: { isMobile: boolean }) => {
  return <div className="fixed">{isMobile ? <Logo /> : <Logo />}</div>;
};

export default Header;
