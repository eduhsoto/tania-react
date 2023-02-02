import { NavHamburger } from '../../assets/styled-components/navbar/Hamburger';

export const Hamburger = ({ handleClick, clicked } : HamburgerProps) => {;
  return (
    <NavHamburger>
      <div
        onClick={handleClick}
        className={`nav__hamburger ${clicked ? 'active' : ''}`}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </NavHamburger>
  );
};

export default Hamburger;

type HamburgerProps = {
  handleClick: React.MouseEventHandler<HTMLDivElement>,
  clicked: boolean,
};
