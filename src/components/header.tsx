import { Link } from 'gatsby';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

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
        <NavWrapper>
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
                  isActive={path === '/works'}
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
        </NavWrapper>
        <ButtonWrapper>
          <Button onClick={e => setIsOpen(!isOpen)}>
            <Hamburger />
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </CustomHeader>
  );
};

const CustomHeader = styled.header`
  ${tw`fixed w-full`}
`;

const Wrapper = styled.div`
  ${tw`w-full relative`}
`;

const NavWrapper = styled.div`
  ${tw`absolute w-full h-screen`}
`;

const NavBG = styled.div<{ isOpen: boolean }>`
  ${tw`absolute rounded-circle h-24 w-24 bg-primary-500 transition-all duration-300 ease-in`}
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
  ${tw`w-full transition-opacity duration-500 ease-out opacity-0 px-8 py-8`}

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${tw`opacity-100`}
    `}
`;

const Menu = styled.ul`
  ${tw`flex items-end justify-around flex-col space-y-1 text-right w-full mt-24`}
`;

const MenuLink = styled(Link)<{ isActive: boolean }>`
  ${tw`font-header font-bold text-6xl text-base-200 relative`}

  &::after {
    ${tw`absolute m-auto rounded-full bg-base-200 transition-all duration-500 ease-out`}
    content: '';
    height: 4px;
    width: 0;
    bottom: 0;
    right: 0;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      &::after {
        width: 50vw;
      }
    `}
`;

const ButtonWrapper = styled.div`
  ${tw`absolute px-8 py-8 mx-0 my-auto`}
  right: 0;
  top: 0;
`;

const Button = styled.div`
  ${tw`bg-primary-500 rounded-circle h-24 w-24 relative flex items-center justify-center text-right cursor-pointer`}
`;

const Hamburger = styled.div`
  ${tw`absolute rounded-full py-1 px-6 bg-base-200`}

  &::before {
    ${tw`absolute m-auto rounded-full py-1 px-6 bg-base-200`}
    content: '';
    top: -1rem;
    right: 0;
    left: 0;
  }

  &::after {
    ${tw`absolute m-auto rounded-full py-1 px-6 bg-base-200`}
    content: '';
    bottom: -1rem;
    right: 0;
    left: 0;
  }
`;

export default Header;
