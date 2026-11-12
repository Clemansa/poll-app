import React from 'react'
import { useState } from 'react';
import { useMediaQuery } from '@custom-react-hooks/use-media-query';
import Header from './components/Header';
import WelcomePage from './components/WelcomePage';
import WelcomePoll from './components/WelcomePoll';
function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // DESIGN 
  // backgrounds
  const bgStyle = "bg-[url('/src/images/bg-img.png')]"
  //  titles and paragraphs
  const pollTitles="font-['Chewy'] text-left text-[32px] text-sky-800"
  const titleStyle="font-['Chewy'] text-center text-[36px] text-sky-900"
  
  // buttons
  const btnStyle="px-6 py-2 w-full border-2 border-sky-800 rounded-lg text-sky-800 font-[Poppins] tracking-wider font-medium cursor-pointer hover:bg-sky-800 hover:border-pink-300 hover:text-white" 
  // MEDIA QUERRY
  const isMobile = useMediaQuery('(max-width:376px)');
  const isTablet=useMediaQuery('(min-width:768px')
 const isLaptop=useMediaQuery('(min-width:1024px)')

  return (
    <>
      <section className={`${bgStyle} z-10 min-h-dvh  w-full bg-cover bg-center bg-no-repeat  ${isMobile ?"px-10 py-8":"px-20 py-20"} lg:px-30 lg:py-30`}>
        <Header isMobile={isMobile} />
        {/* <WelcomePage titleStyle={titleStyle}/> */}
       
        {isModalOpen ? <WelcomePoll isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} pollTitles={pollTitles} isChecked={isChecked} setIsChecked={setIsChecked} /> : <WelcomePage titleStyle={titleStyle} setIsModalOpen={setIsModalOpen} btnStyle={btnStyle} isLaptop={isLaptop} isTablet={isTablet } />}        
      </section>
    
    </>
  )
}

export default App
