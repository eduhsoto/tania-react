import { useState } from 'react';
import {
  Nav,
  NavContainer,
  NavA,
  NavSocial,
  NavItem,
} from '../../assets/styled-components/navbar/Nav';
import Hamburger from './Hamburger';

const NavBar = (): JSX.Element => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (): void => {
    setClicked(!clicked);
  };

  return (
    <Nav>
      <NavContainer>
        <a href='/'>
          <img
            src='/img/brand-logo.jpg'
            alt='brand_logo'
            className='brand__logo'
          />
        </a>

        <div className='burger'>
          <Hamburger clicked={clicked} handleClick={handleClick} />
        </div>

        <div className={`nav__responsive ${clicked ? 'show' : ''}`}>
          <NavItem>
            <NavA to='/'>Acerca de mí</NavA>
            <NavA to='/my-path'>Mi trayectoria</NavA>
            <NavA to='/portafolio'>Mi portafolio</NavA>
          </NavItem>

          <div>
            <NavSocial
              href='https://www.instagram.com/tikichi_jimarq/'
              target='_blank'
            >
              <img
                src='/img/instagram-network.png'
                alt='instagram link'
                className='social__image'
              />
            </NavSocial>
            <NavSocial
              href='https://www.linkedin.com/in/tania-jimenezm/'
              target='_blank'
            >
              <img
                src='/img/linkedIn-network.png'
                alt='linkedin link'
                className='social__image'
              />
            </NavSocial>
            <NavSocial
              href='https://www.behance.net/taniaRjimenez'
              target='_blank'
            >
              <img
                src='/img/behance-portafolio.png'
                alt='behance link'
                className='social__image'
              />
            </NavSocial>
          </div>
        </div>
      </NavContainer>
    </Nav>
  );
};

export default NavBar;
