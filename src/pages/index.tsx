import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="" />
      <h1>cilvia333.work</h1>
      <Image filename="icon.jpg" alt="" />
    </Layout>
  );
};

export default IndexPage;
