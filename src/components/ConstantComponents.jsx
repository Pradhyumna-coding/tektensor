import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './ConstantComponents.css';


export const Navbar = () => {
    const [click, setClick] = useState(false);

    function handleClick() {
      if (window.innerWidth>900)
      {return;}
      
      if (click) {
          document.body.style.overflowY = 'auto'
      }else{
          document.body.style.overflowY = 'hidden'
      }

      setClick(!click);
    } 

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className='logo-link'>
                    <img src="/tektensor_logo.svg" className='logo navbar' />
                </Link>

                
                <div className='menu-icon' onClick={handleClick}>
                    <span class="material-symbols-outlined">
                        {click?"close":"menu"}
                    </span>
                </div>
                
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={handleClick}>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <a href="https://github.com/Pradhyumna-coding" target="_blank" className='nav-links' onClick={handleClick}>Github</a>
                    </li>
                    <li className='nav-item'>
                        <a href="https://www.youtube.com/@codingExplorerPradhyumna" target="_blank" className='nav-links' onClick={handleClick}>Youtube</a>
                    </li>

                </ul>

            </div>
        </nav>
        </>
    );
}

