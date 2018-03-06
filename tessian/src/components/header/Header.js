/* Simple header
   @params: Null
   @Returns: Null
*/
import React from 'react';
import logo from '../../static/tessian.jpg';
import name from '../../static/header.png';
import './Header.css';

const Header = (props) =>{
    return (
      <div>
        <header className="Header">
          <img src={logo} className="Header-logo" alt="logo" />
          <img src={name} className="Header-name" alt="name" />
        </header>
      </div>
    );
}

export default Header;
