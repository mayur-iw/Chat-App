import React from 'react';
import logo from "../assets/logo.png";



const Logo = ({children}) => {
  return (
    <>
    <header className='flex justify-center items-center py-3 h-20 shadow-md'>
      <img 
      src={logo}
      alt='logo'
      width={180}
      height={80}
      />
    </header>
    {children}
    </>
  )
}

export default Logo;
