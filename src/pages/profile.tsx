import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Profile: React.FC = () => {
  return (
    <Layout>
      <SEO title="profile" />
      <div>
        <h1>Kairi Shiomi / Cilvia333</h1>
        <h3>塩見 海怜</h3>
      </div>
      <div>
        <p>
          1999年3月17日生まれ。岡山県出身・東京都在住。
          津山高専情報工学科を卒業後、武蔵野美術大学造形学部デザイン情報学科2年次へ編入。
          DTPやグラフィックデザインを学びながら、webフロントエンドや電子工作などもおこなっている。
        </p>
      </div>
      <div>
        <h2>Skills</h2>
        <p>
          1999年3月17日生まれ。岡山県出身・東京都在住。
          津山高専情報工学科を卒業後、武蔵野美術大学造形学部デザイン情報学科2年次へ編入。
          DTPやグラフィックデザインを学びながら、webフロントエンドや電子工作などもおこなっている。
        </p>
      </div>
    </Layout>
  );
};

export default Profile;
