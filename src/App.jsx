import React from 'react'
import { useState } from 'react';
import { useMediaQuery } from '@custom-react-hooks/use-media-query';
import Header from './components/Header';
import WelcomePage from './components/WelcomePage';
import WelcomePoll from './components/WelcomePoll';
import MenuPage from './components/MenuPage';
import CreateAccountPage from './components/CreateAccountPage';

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");

  // special characters 
  
const specialCharacters = ["!", "#", "$", "%", "^", "&", "*", "(", ")"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  
  // DESIGN 
  // backgrounds
  const bgStyle = "bg-[url('/src/images/bg-img.png')]"
  //  titles and paragraphs
  const pollTitles="font-['Chewy'] text-left text-[32px] text-sky-800"
  const titleStyle="font-['Chewy'] text-center text-[36px] text-sky-900"
  
  // inputs
  const input =
    "w-full px-4 py-2 bg-white/60 rounded-lg border border-sky-800 inset-shadow-sm inset-shadow-indigo-400 focus:inset-shadow-none focus:border-2 focus:border-sky-800 outline-none";
  // buttons
  const btnStyle = "px-6 py-2 w-full border-2 border-sky-800 rounded-lg text-sky-800 font-[Poppins] tracking-wider font-medium cursor-pointer hover:bg-sky-800 hover:border-pink-300 hover:text-white" 
  
  // Containers
  const containerStyle=
    "relative w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all bg-white px-5 py-6 sm:px-8 sm:py-8 rounded-2xl shadow-[inset_0_0_10px_rgba(79,70,230,0.5)]"
  // MEDIA QUERRY
  const isMobile = useMediaQuery('(max-width:376px)');
  const isTablet = useMediaQuery('(min-width:768px)');
 const isLaptop=useMediaQuery('(min-width:1024px)')

  return (
    <>
      <section className={`${bgStyle} z-10 min-h-dvh  w-full bg-cover bg-center bg-no-repeat  ${isMobile ?"px-10 py-8":"px-20 py-20"} lg:px-30 lg:py-30`}>
        
        {/* Header */}
        <Header isMobile={isMobile} />
       

        {/* Welcome page */}
        {currentPage === "welcome" &&
          <WelcomePage titleStyle={titleStyle}
            btnStyle={btnStyle}
            isLaptop={isLaptop}
          isTablet={isTablet}
          setCurrentPage={setCurrentPage}
          input={input}
          specialCharacters={specialCharacters}
          numbers={numbers}
          
          />}
        
       {/* Menu Page */}
        {currentPage === "signIn" &&
          <MenuPage />}
        
        {/* Create account page */}
        {currentPage === "newAccount" && <CreateAccountPage setCurrentPage={set} containerStyle={containerStyle} pollTitles={pollTitles} input={ input} numbers={numbers} specialCharacters={specialCharacters} />}

        {/* Modal Page */}

        {currentPage === "modal" && <WelcomePoll containerStyle={containerStyle} currentPage={ currentPage} setCurrentPage={setCurrentPage} />}
        

       
       

        
      </section>
    
    </>
  )
}

export default App
