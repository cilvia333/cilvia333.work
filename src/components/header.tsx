import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import BackArrow from '~/images/back-arrow.inline.svg';
import wave01 from '~/images/wave-white_01.png';
import wave02 from '~/images/wave-white_02.png';
import wave03 from '~/images/wave-white_03.png';

import { media } from '~/styles';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <CustomHeader>
      <Wrapper>
        <NavWrapper isOpen={isOpen}>
          <NavBG isOpen={isOpen} />
          <Nav isOpen={isOpen}>
            <Menu>
              <li>
                <MenuLink
                  isActive={path === '/'}
                  onClick={e => setIsOpen(path === '/')}
                  to="/"
                >
                  TOP
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  isActive={path.includes('/works')}
                  onClick={e => setIsOpen(path === '/works')}
                  to="/works"
                >
                  WORKS
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  isActive={path === '/profile'}
                  onClick={e => setIsOpen(path === '/profile')}
                  to="/profile"
                >
                  PROFILE
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  isActive={path === '/contacts'}
                  onClick={e => setIsOpen(path === '/contacts')}
                  to="/contacts"
                >
                  CONTACTS
                </MenuLink>
              </li>
            </Menu>
          </Nav>
          <WaveWrapper isOpen={isOpen}>
            <Wave />
            <Wave />
            <Wave />
          </WaveWrapper>
        </NavWrapper>
        <ButtonWrapper>
          <Button onClick={e => setIsOpen(!isOpen)}>
            <Hamburger />
          </Button>
        </ButtonWrapper>
        <PageInfoWrapper>
          <PageTitle isWhite={false}>{path.split('/')[1]}</PageTitle>
          <PageSubTitle isWhite={false}>
            {path.split('/')[2] && path.split('/')[2] !== 't'
              ? `/${path.split('/')[2]}`
              : ''}
          </PageSubTitle>
          <Link to="/works">
            <WorksBackButton
              isWhite={false}
              isActive={
                path.split('/')[1] === 'works' &&
                path.split('/')[2] !== 't' &&
                path.split('/')[2]
              }
            />
          </Link>
        </PageInfoWrapper>
      </Wrapper>
    </CustomHeader>
  );
};

const fadeIn = keyframes`
  0% {
    display: none;
    opacity:0;
  }

  1% {
    display: grid;
    opacity:1;
  }

  100% {
    display: grid;
    opacity:1;
  }
`;

const fadeOut = keyframes`
  0% {
    display: grid;
    opacity:1;
  }

  99% {
    display: grid;
    opacity:1;
  }

  100% {
    display: none;
    opacity:0;
  }
`;

const waveKeyframe = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-1920px);
  }
`;

const CustomHeader = styled.header`
  ${tw`fixed w-full z-20`}
`;

const Wrapper = styled.div`
  ${tw`w-full relative`}
`;

const NavWrapper = styled.div<{ isOpen: boolean }>`
  ${tw`absolute overflow-hidden h-16 w-16 grid grid-flow-col gap-4 transition-all ease-in delay-500`}
  top:0;
  right: 0;
  transition-duration: 1ms;
  grid-template-rows: repeat(8, minmax(0, 1fr));

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${tw`w-full h-screen`}
      transition-delay: 0ms;
    `}
`;

const NavBG = styled.div<{ isOpen: boolean }>`
  ${tw`absolute rounded-circle h-16 w-16 bg-primary-500 transition-all duration-300 ease-in`}
  right: 2rem;
  top: 2rem;

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${tw`w-full h-full rounded-none ease-out`}
      right: 0;
      top: 0;
    `}
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  ${tw`w-full transition-opacity duration-500 ease-out opacity-0 px-8 py-8 row-start-2 row-end-5`}

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${tw`opacity-100`}
    `}
`;

const Menu = styled.ul`
  ${tw`flex items-end justify-around flex-col space-y-1 text-right w-full`}
`;

const MenuLink = styled(({ isActive, ...props }: any) => <Link {...props} />)`
  ${tw`font-header font-bold text-6xl text-base-200 relative text-shadow-ivoly`}

  &::after {
    ${tw`absolute m-auto rounded-full bg-base-200 transition-all duration-500 ease-out`}
    content: '';
    height: 4px;
    width: 0;
    bottom: 0;
    right: 0;

    ${media.md`
      bottom: 8px;
    `}
  }

  ${({ isActive }) =>
    isActive &&
    css`
      &::after {
        width: 100%;
      }
    `}
`;

const WaveWrapper = styled.div<{ isOpen: boolean }>`
  ${tw`relative w-full h-full row-start-7 opacity-0 transition-opacity duration-100 ease-out delay-100`}

  grid-row-end: 9;

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${tw`opacity-100`}
      transition-delay: 0;
    `}
`;

const Wave = styled.div`
  ${tw`absolute h-full row-start-4 row-end-5`}
  animation: ${waveKeyframe} 12s linear infinite 0s;
  background: top left/1920px repeat-x ;
  min-width: 3840px;
  width: 200%;
  top: 0;
  transform: translateX(10px);

  &:nth-child(1) {
    background-image:  url(${wave03});
    left: 240px;
  }

  &:nth-child(2) {
    background-image:  url(${wave02});
    left: 120px;
  }
  &:nth-child(3) {
    background-image:  url(${wave01});
    left: 0;
  }
`;

const ButtonWrapper = styled.div`
  ${tw`absolute px-8 py-8 mx-0 my-auto`}
  right: 0;
  top: 0;

  ${media.sm`
    ${tw`px-4 py-4`}
  `}
`;

const Button = styled.div`
  ${tw`bg-primary-500 rounded-circle h-16 w-16 relative flex items-center justify-center text-right cursor-pointer`}
`;

const Hamburger = styled.div`
  ${tw`absolute rounded-full px-4 bg-base-200`}
  padding-top: 3px;
  padding-bottom: 3px;

  &::before {
    ${tw`absolute m-auto rounded-full px-4 bg-base-200`}
    content: '';
    padding-top: 3px;
    padding-bottom: 3px;
    top: -14px;
    right: 0;
    left: 0;
  }

  &::after {
    ${tw`absolute m-auto rounded-full px-4 bg-base-200`}
    content: '';
    padding-top: 3px;
    padding-bottom: 3px;
    bottom: -14px;
    right: 0;
    left: 0;
  }
`;

const PageInfoWrapper = styled.div`
  ${tw`absolute px-8 py-8 mx-0 my-auto`}
  left: 0;
  top: 0;
`;

const PageTitle = styled.div<{ isWhite: boolean }>`
  ${tw`font-header font-bold text-4xl text-gray-900 relative uppercase inline-block`}

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`text-base-200`}
    `}
`;

const PageSubTitle = styled.div<{ isWhite: boolean }>`
  ${tw`font-header font-bold text-2xl text-gray-900 italic relative lowercase inline-block ml-2`}

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`text-base-200`}
    `}
`;

const WorksBackButton = styled(({ isActive, isWhite, ...props }: any) => (
  <BackArrow {...props} />
))`
  ${tw`hidden h-12 w-12 text-gray-900 fill-current cursor-pointer`}

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`text-base-200`}
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      ${tw`block`}
    `}
`;

export default Header;
