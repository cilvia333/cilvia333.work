import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

interface Props {
  siteTitle?: string;
}

const Header: React.FC<Props> = ({ siteTitle = `` }: Props) => {
  return (
    <CustomHeader>
      <Wrapper>
        <Title>
          <TitleLink to="/">cilvia333.work | {siteTitle}</TitleLink>
        </Title>
        <Menu>
          <li>
            <Link to="/works">works</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/contacts">contacts</Link>
          </li>
        </Menu>
      </Wrapper>
    </CustomHeader>
  );
};

const CustomHeader = styled.header`
  margin-bottom: 1.45rem;
  background-color: #ddd;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
`;

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  li {
    margin-left: 10px;
  }
`;

export default Header;
