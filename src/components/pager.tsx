import { Link } from 'gatsby';
import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

interface Props {
  pageContext?: any;
}

const Pager: React.FC<Props> = ({ pageContext }: Props) => {
  const buttons = [];

  for (let i = 0; i < pageContext.numberOfPages; i++) {
    buttons.push(i);
  }

  return (
    <>
      <Wrapper>
        {buttons.map((button, i) => (
          <Button
            to={`/works${i + 1}`}
            key={`pager_${i}`}
            isCurrent={i === pageContext.pageNumber}
          >
            {i + 1}
          </Button>
        ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`flex justify-center items-center`}
`;

const Button = styled(Link)<{ isCurrent?: boolean }>`
  ${tw`bg-gray-400 text-gray-900 text-sm font-header font-bold rounded-circle py-2 text-center w-8 h-8 leading-none mx-1`}

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      ${tw`bg-primary-500`}
    `}
`;

const Dots = styled.div`
  ${tw`flex justify-center items-center`}

  div {
    ${tw`bg-gray-400 w-2 h-2 rounded-circle`}

    margin:0 2px;
  }
`;

export default Pager;
