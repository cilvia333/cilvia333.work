import { useLocation } from '@reach/router';
import { Link, navigate } from 'gatsby';
import React, { useEffect, useState, useContext } from 'react';
import { useWindowSize } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import Wave from '~/components/wave';
import { layoutContext } from '~/hooks';

import BackArrow from '~/images/back-arrow.inline.svg';
import CrossSvg from '~/images/cross.inline.svg';

import { media } from '~/styles';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const [path, setPath] = useState<string[]>([]);
  const { width, height } = useWindowSize();
  const location = useLocation();
  const ctx = useContext(layoutContext);

  const worksRegex = RegExp('(^[0-9]$)|(^t$)');

  const onAnimationEnd = () => {
    setIsAnimation(false);
  };

  const getPage = () => {
    const page = Math.floor(ctx.workPosition / 12);

    return page > 0 ? `/${page + 1}` : '';
  };

  useEffect(() => {
    const path = location.pathname.split('/');
    path.shift();
    setPath(path);
    if (path[1] && !worksRegex.test(path[1])) {
      setIsAnimation(true);
    }
  }, [location]);

  return (
    <CustomHeader>
      <Wrapper>
        <NavWrapper isOpen={isOpen}>
          <NavBG isOpen={isOpen} length={width >= height ? width : height} />
          <Nav isOpen={isOpen}>
            <Menu>
              <li>
                <MenuLink
                  isActive={path[0] === ''}
                  onClick={e => setIsOpen(path[0] === '')}
                  to="/"
                >
                  TOP
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  isActive={path[0] === 'works'}
                  onClick={e => setIsOpen(path[0] === 'works')}
                  to="/works"
                >
                  WORKS
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  isActive={path[0] === 'profile'}
                  onClick={e => setIsOpen(path[0] === 'profile')}
                  to="/profile"
                >
                  PROFILE
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  isActive={path[0] === 'contacts'}
                  onClick={e => setIsOpen(path[0] === 'contacts')}
                  to="/contacts"
                >
                  CONTACTS
                </MenuLink>
              </li>
            </Menu>
          </Nav>
          <StyledWave isOpen={isOpen} color="white" />
        </NavWrapper>
        <ButtonWrapper>
          <Button
            onClick={e => setIsOpen(!isOpen)}
            isWhite={ctx.white && !isOpen}
          >
            <Hamburger isWhite={ctx.white && !isOpen} />
          </Button>
        </ButtonWrapper>
        <PageInfoWrapper>
          <PageTitle
            isWhite={ctx.white || isOpen || !path[0]}
            isActive={path[0] || isOpen}
          >
            {ctx.pageTitle}
          </PageTitle>
          <WorksTagBadge isActive={path[1] === 't'}>
            {`#${path[2] ?? ''}`}
            <WorksTagCross onClick={() => navigate('/works')} />
          </WorksTagBadge>
          <PageSubTitle
            isWhite={ctx.white || isOpen}
            isAnimation={isAnimation}
            onAnimationEnd={onAnimationEnd}
          >
            {path[1] && !worksRegex.test(path[1]) ? `/${path[1]}` : ''}
          </PageSubTitle>
          <WorkBackLink
            to={`${ctx.workBack.path}${
              ctx.workBack.path === '/' ? ctx.workBack.scroll : ''
            }${getPage()}`}
            isActive={
              path[0] === 'works' && !worksRegex.test(path[1]) && path[1]
            }
          >
            <WorkBackButton
              isWhite={ctx.white || isOpen}
              isActive={
                path[0] === 'works' && !worksRegex.test(path[1]) && path[1]
              }
            />
            <WorkBackButton
              isWhite={ctx.white || isOpen}
              isActive={
                path[0] === 'works' && !worksRegex.test(path[1]) && path[1]
              }
            />
          </WorkBackLink>
        </PageInfoWrapper>
      </Wrapper>
    </CustomHeader>
  );
};

const TextAppearKeyframes = keyframes`
  0%{
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  50%{
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  100%{
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

const TextAppearOverlayKeyframes = keyframes`
  0%{
    clip-path: polygon(0 0, 0 0, -10% 100%, -10% 100%);
  }
  50%{
    clip-path: polygon(0 0, 110% 0, 100% 100%, -10% 100%);
  }
  100%{
    clip-path: polygon(110% 0, 110% 0, 100% 100%, 100% 100%);
  }
`;

const CustomHeader = styled.header`
  ${tw`fixed w-full z-20`}
`;

const Wrapper = styled.div`
  ${tw`w-full relative`}
`;

const NavWrapper = styled.div<{ isOpen: boolean }>`
  ${tw`absolute overflow-hidden h-16 w-16 grid grid-flow-col gap-4 transition-all ease-in delay-300 top-0 right-0`}
  transform: translate(0);
  transition-duration: 1ms;
  grid-template-rows: repeat(8, minmax(0, 1fr));

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${tw`w-full h-screen`}
      transform: translate(0);
      transition-duration: 0ms;
      transition-delay: 0ms;
    `}
`;

const NavBG = styled.div<{ isOpen: boolean; length: number }>`
  ${tw`absolute rounded-circle h-16 w-16 bg-primary-500 transition-all duration-300 ease-in`}
  right: 2rem;
  top: 2rem;
  transform: scale(1);
  transform-origin: center;

  ${media.sm`
    right: 1rem;
    top: 1rem;
  `}

  ${({ isOpen, length }) =>
    isOpen &&
    css`
      ${tw`ease-out`}
      transform: scale(${length / 32});
    `};
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
    ${tw`absolute m-auto rounded-full bg-base-200 transition-all duration-300 ease-out inset-y-0 left-0 w-0`}
    content: '';
    height: 4px;
  }

  &:hover {
    &::after {
      ${tw`w-full`}
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      &::after {
        ${tw`w-full`}
      }
    `}
`;

const StyledWave = styled(({ isOpen: boolean, ...props }) => (
  <Wave {...props} />
))`
  ${tw`h-full row-start-7 opacity-0 transition-opacity duration-100 ease-out delay-100`}

  grid-row-end: 9;

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${tw`opacity-100`}
      transition-delay: 0;
    `}
`;

const ButtonWrapper = styled.div`
  ${tw`absolute px-8 py-8 mx-0 my-auto`}
  right: 0;
  top: 0;

  ${media.sm`
    ${tw`px-4 py-4`}
  `}
`;

const Button = styled.div<{ isWhite: boolean }>`
  ${tw`bg-primary-500 rounded-circle h-16 w-16 relative flex items-center justify-center text-right cursor-pointer transition-all duration-300 ease-out`}

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`bg-base-200`}
    `}
`;

const Hamburger = styled.div<{ isWhite: boolean }>`
  ${tw`absolute rounded-full px-4 bg-base-200 transition-all duration-300 ease-out`}
  padding-top: 3px;
  padding-bottom: 3px;

  &::before,
  &::after {
    ${tw`absolute m-auto rounded-full px-4 bg-base-200 transition-all duration-300 ease-out`}
    content: '';
    padding-top: 3px;
    padding-bottom: 3px;
    right: 0;
    left: 0;
  }

  &::before {
    top: -14px;
  }

  &::after {
    bottom: -14px;
  }

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`bg-gray-900`}

      &::before, &::after {
        ${tw`bg-gray-900`}
      }
    `}
`;

const PageInfoWrapper = styled.div`
  ${tw`absolute px-8 py-8 mx-0 my-auto`}
  left: 0;
  top: 0;

  ${media.sm`
    ${tw`px-4 py-4`}
  `}
`;

const PageTitle = styled.div<{ isWhite: boolean; isActive: boolean }>`
  ${tw`font-header font-bold text-4xl text-gray-900 relative uppercase inline-block transition-all duration-300 ease-out opacity-0`}

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`text-base-200`}
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      ${tw`opacity-100`}
    `}
`;

const PageSubTitle = styled.div<{ isWhite: boolean; isAnimation: boolean }>`
  ${tw`relative font-header font-bold text-2xl text-gray-900 italic lowercase inline-block ml-2`}

  animation: 600ms ease-in-out forwards;
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);

  &::after {
    ${tw`absolute bg-gray-900 inset-0 m-auto`}
    content: "";
    animation: 600ms ease-in-out forwards;
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }

  ${media.sm`
    ${tw`text-lg`}
  `}

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`text-base-200`}

      &::after {
        ${tw`bg-base-200`}
      }
    `}

  ${({ isAnimation }) =>
    isAnimation
      ? css`
          animation-name: ${TextAppearKeyframes};

          &::after {
            animation-name: ${TextAppearOverlayKeyframes};
          }
        `
      : css`
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

          &::after {
            clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
          }
        `}
`;

const WorkBackButton = styled(({ isActive, isWhite, ...props }) => (
  <BackArrow {...props} />
))`
  ${tw`absolute opacity-0 h-8 w-8 text-gray-900 fill-current cursor-pointer transition-none duration-300 ease-out`}

  &:nth-child(1) {
    ${tw`text-gray-900`}
  }
  &:nth-child(2) {
    ${tw`text-primary-500`}
    clip-path: circle(0%);
  }

  ${({ isWhite }) =>
    isWhite &&
    css`
      &:nth-child(1) {
        ${tw`text-gray-200`}
      }
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      ${tw`opacity-100 transition-all`}
    `}
`;

const WorkBackLink = styled(({ isActive, isAnimate, ...props }) => (
  <Link {...props} />
))`
  ${tw`hidden h-8 w-8 mt-2 relative`}

  ${({ isActive }) =>
    isActive &&
    css`
      ${tw`block`}
    `}

  &:hover {
    ${WorkBackButton} {
      &:nth-child(1) {
        ${tw`text-primary-500`}
      }
      &:nth-child(2) {
        ${tw`text-primary-500`}
        clip-path: circle(101%);
      }
    }
  }
`;

const WorksTagBadge = styled.div<{ isActive: boolean }>`
  ${tw`hidden relative text-base-200 rounded-full bg-primary-500 px-4 ml-4 mb-4 align-middle`}

  ${({ isActive }) =>
    isActive &&
    css`
      ${tw`inline-block`}
    `}
`;

const WorksTagCross = styled(CrossSvg)`
  ${tw`inline-block text-base-200 fill-current ml-2 cursor-pointer`}
`;

export default Header;
