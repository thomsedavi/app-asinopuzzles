import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, HeaderLinkExternal, HeaderLinkInternal, Navigation } from '../common/styled';
import { User } from '../interfaces';

interface LayoutProps {
  showPlaceholder: () => void;
  me?: User | null;
  isBurgerOpen: boolean;
  setIsBurgerOpen: (isBurgerOpen: boolean) => void;
  onClickHeaderLink: () => void;
}

const Layout = (props: LayoutProps) => {
  const test: React.MouseEventHandler<HTMLAnchorElement> = (event: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>): void => {
    console.log('event', event);
  }

  return (
    <>
      <Navigation className={props.isBurgerOpen ? '' : 'burger-closed'}>
        <Container>
          <svg className='burger'
               viewBox='0 0 30 30'
               height='2.35em'
               xmlns='http://www.w3.org/2000/svg'
               onClick={() => props.setIsBurgerOpen(!props.isBurgerOpen)}>
            {props.isBurgerOpen && <path d='M9,6L11,6L16,11L21,6L23,6L26,9L20,15L26,21L23,24L21,24L16,19L11,24L9,24L6,21L12,15L6,9Z'
                                         className='burger-accent'/>}
            {!props.isBurgerOpen && <path d='M7,7L25,7L25,11L7,11Z'
                                          className='burger-accent'/>}
            {!props.isBurgerOpen && <path d='M7,13L25,13L25,17L7,17Z'
                                          className='burger-accent'/>}
            {!props.isBurgerOpen && <path d='M7,19L25,19L25,23L7,23Z'
                                          className='burger-accent'/>}
            {props.isBurgerOpen && <path d='M9,7L15,13L21,7L23,9L17,15L23,21L21,23L15,17L9,23L7,21L13,15L7,9Z'
                                         className='burger-fill'/>}
            {!props.isBurgerOpen && <path d='M8,8L22,8L22,10L8,10Z'
                                          className='burger-fill'/>}
            {!props.isBurgerOpen && <path d='M8,14L22,14L22,16L8,16Z'
                                          className='burger-fill'/>}
            {!props.isBurgerOpen && <path d='M8,20L22,20L22,22L8,22Z'
                                          className='burger-fill'/>}
          </svg>
          <HeaderLinkInternal to='/' className='logo' onClick={props.onClickHeaderLink}>
            <svg className='logo-large'
                viewBox='0 0 80 30'
                 xmlns='http://www.w3.org/2000/svg'>
              <path d='M0,30L24,0L26,0L26,30L22,30L22,20L18,25L14,25L12,15L16,10L18,20L22,15L22,10L6,30Z'
                     className='logo-accent' />
              <path d='M30,30L30,25L34,25L32,20L34,15L42,15L40,20L36,20L38,25L36,30Z'
                    className='logo-accent' />
              <path d='M40,30L46,15L50,15L44,30Z'
                    className='logo-accent' />
              <path d='M48,10L50,5L54,5L52,10Z'
                    className='logo-accent' />
              <path d='M48,30L54,15L62,15L64,20L60,30L56,30L60,20L56,20L52,30Z'
                    className='logo-accent' />
              <path d='M68,30L66,25L70,15L78,15L80,20L76,30L68,30L66,25L74,25L76,20L72,20Z'
                   className='logo-accent' />
              <path d='M0,30L24,0L24,30L20,30L20,20L16,25L12,25L12,15L16,10L16,20L20,15L20,10L4,30Z'
                    className='logo-fill' />
              <path d='M28,30L28,25L32,25L30,20L32,15L40,15L38,20L34,20L36,25L34,30Z'
                    className='logo-fill' />
              <path d='M38,30L44,15L48,15L42,30Z'
                    className='logo-fill' />
              <path d='M46,10L48,5L52,5L50,10Z'
                    className='logo-fill' />
              <path d='M46,30L52,15L60,15L62,20L58,30L54,30L58,20L54,20L50,30Z'
                    className='logo-fill' />
              <path d='M66,30L64,25L68,15L76,15L78,20L74,30L66,30L64,25L72,25L74,20L70,20Z'
                    className='logo-fill' />
            </svg>
            <svg className='logo-small'
                 viewBox='0 0 68 15'
                 xmlns='http://www.w3.org/2000/svg'>
              <path d='M4,15L2,10L6,0L18,0L12,15L4,15L2,10L10,10L12,5L8,5Z'
                    className='logo-accent' />
              <path d='M16,15L18,10L22,10L20,5L22,0L30,0L28,5L24,5L26,10L24,15Z'
                    className='logo-accent' />
              <path d='M28,15L34,0L38,0L32,15Z'
                    className='logo-accent' />
              <path d='M36,15L42,0L50,0L52,5L48,15L44,15L48,5L44,5L40,15Z'
                     className='logo-accent' />
              <path d='M56,15L54,10L58,0L66,0L68,5L64,15L56,15L54,10L62,10L64,5L60,5Z'
                    className='logo-accent' />
              <path d='M2,15L0,10L4,0L16,0L10,15L2,15L0,10L8,10L10,5L6,5Z'
                     className='logo-fill' />
              <path d='M14,15L16,10L20,10L18,5L20,0L28,0L26,5L22,5L24,10L22,15Z'
                    className='logo-fill' />
              <path d='M26,15L32,0L36,0L30,15Z'
                    className='logo-fill' />
              <path d='M34,15L40,0L48,0L50,5L46,15L42,15L46,5L42,5L38,15Z'
                    className='logo-fill' />
              <path d='M54,15L52,10L56,0L64,0L66,5L62,15L54,15L52,10L60,10L62,5L58,5Z'
                    className='logo-fill' />
            </svg>
          </HeaderLinkInternal>
          <HeaderLinkInternal to='/about' onClick={props.onClickHeaderLink}>ABOUT</HeaderLinkInternal>
          {props.me && <HeaderLinkInternal to={`/users/${props.me!.id}`} onClick={test}>PROFILE</HeaderLinkInternal>}
          {props.me && <HeaderLinkExternal href='/logout' onClick={props.showPlaceholder}>LOGOUT</HeaderLinkExternal>}
          {!props.me && <HeaderLinkExternal href='/login' onClick={props.showPlaceholder}>LOGIN</HeaderLinkExternal>}
        </Container>
      </Navigation>
      <Container>
        <Outlet />
      </Container>
    </>
  )
};

export default Layout;
