import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
  siteTitle?: string;
}

const Header: React.FC<Props> = ({ siteTitle = `` }: Props) => {
  return (
    <CustomHeader>
      <Wrapper>
        <Nav>
          <Menu>
            <li>
              <MenuLink to="/">TOP</MenuLink>
            </li>
            <li>
              <MenuLink to="/works">WORKS</MenuLink>
            </li>
            <li>
              <MenuLink to="/profile">PROFILE</MenuLink>
            </li>
            <li>
              <MenuLink to="/contacts">CONTACTS</MenuLink>
            </li>
          </Menu>
        </Nav>
      </Wrapper>
    </CustomHeader>
  );
};

const CustomHeader = styled.header`
  ${tw`fixed`}
  margin-bottom: 1.45rem;
  background-color: #ddd;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  justify-content: space-between;
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  li {
    margin-left: 10px;
  }
`;

const MenuLink = styled(Link)`
  ${tw`font-header font-bold text-6xl`}
`;

export default Header;
