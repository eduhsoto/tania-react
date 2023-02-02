import {
  FooterH,
  FooterGrid,
  FooterItem,
  FooterLink,
  FooterButton,
} from '../assets/styled-components/Footer';

const Footer = () => {
  return (
    <>
      <FooterH>
        <FooterGrid>
          <FooterItem className='area_1'>
            <p className='footer__contact'>Contacta conmigo en:</p>
          </FooterItem>

          <FooterItem className='area_2'>
            <img
              src='/img/phone-contact.png'
              className='icon__contact'
              alt='phone number'
            />
            <FooterLink href='tel:3311387789'>33 11 38 77 89</FooterLink>
          </FooterItem>

          <FooterItem className='area_3'>
            <FooterButton
              href='https://www.linkedin.com/in/tania-jimenezm/'
              target='”_blank”'
              className='footer__button'
            >
              LinkedIn
            </FooterButton>
          </FooterItem>

          <FooterItem className='area_4'>
            <img
              src='/img//brand-logo.jpg'
              className='footer__image'
              alt='brand logo'
            />
          </FooterItem>

          <FooterItem className='area_5'>
            <img
              src='/img/email-contact.png'
              className='icon__contact'
              alt='email'
            />
            <FooterLink
              href='mailto:taniaraquel.jimenezm@gmail.com'
              className='footer__link'
            >
              taniaraquel.jimenezm@gmail.com
            </FooterLink>
          </FooterItem>
        </FooterGrid>
        <div className='rights'>
          <p>Copyright Inc. Tania Jiménez Márquez. © 2022</p>
        </div>
      </FooterH>
    </>
  );
};

export default Footer;
