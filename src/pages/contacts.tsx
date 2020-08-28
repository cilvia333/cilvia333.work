import { Link } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import { useWindowSize, useLockBodyScroll, useToggle } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import SEO from '~/components/seo';

import { layoutContext } from '~/hooks';

import { media } from '~/styles';

type Form = {
  name: string;
  email: string;
  message: string;
};

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const ContactsPage: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [formState, setFormState] = useState<Form>({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    message: false,
  });
  const { width, height } = useWindowSize();
  const [attentionOpen, toggleAttentionOpen] = useToggle(false);
  const ctx = useContext(layoutContext);

  useEffect(() => {
    ctx.setIsWhite(attentionOpen);
    ctx.setPageTitle('CONTACTS');
  }, [attentionOpen]);

  const onSubmit = async e => {
    setIsSent(true);
    if (formState.name === '') {
      setError({ ...error, name: true });
    } else if (formState.email === '') {
      setError({ ...error, email: true });
    } else if (formState.message === '') {
      setError({ ...error, message: true });
    } else {
      e.preventDefault();
      const form = e.target;
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': form.getAttribute('name'),
            ...formState,
          }),
        });
        setIsSent(true);
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  return (
    <>
      <SEO title="CONTACTS" />
      <Wrapper isOpen={attentionOpen}>
        <Contacts>
          <Header>
            <h2>ご依頼を受け付けています</h2>
            <p>
              webデザインやウェブフロントエンド開発(CMSなど)、DTPデザインなど、制作のご依頼は下記のメールアドレスまたは、コンタクトフォームからご連絡ください。
              作品の感想もお待ちしております！
            </p>
          </Header>
          <BeforeContactButton
            isMobile={width <= 1024}
            onClick={e => toggleAttentionOpen()}
          >
            ご依頼いただく前に...
          </BeforeContactButton>
          <Email>
            E-MAIL: <wbr />
            <a href="mailto:cilvia333x@gmail.com">cilvia333x@gmail.com</a>
          </Email>
          <FormContainer>
            <h3>CONTACT FORM:</h3>
            <FormWrapper>
              <Form
                name="contact"
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={onSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <noscript>
                  <p>This form won’t work with Javascript disabled.</p>
                </noscript>
                <Input>
                  <label htmlFor="name">
                    お名前・会社<Required>*</Required>
                  </label>
                  <InputText
                    type="text"
                    required
                    name="name"
                    id="name"
                    placeholder="your name & company"
                    onChange={e => {
                      setFormState({ ...formState, name: e.target.value });
                      setError({ ...error, name: false });
                    }}
                  />
                </Input>
                <Input>
                  <label htmlFor="email">
                    メールアドレス<Required>*</Required>
                  </label>
                  <InputText
                    type="email"
                    name="email"
                    id="email"
                    placeholder="e-mail"
                    onChange={e => {
                      setFormState({ ...formState, email: e.target.value });
                      setError({ ...error, email: false });
                    }}
                  />
                </Input>
                <Input>
                  <label htmlFor="message">
                    メッセージ<Required>*</Required>
                  </label>
                  <TextArea
                    name="message"
                    id="message"
                    required
                    placeholder="message here"
                    onChange={e => {
                      setFormState({ ...formState, message: e.target.value });
                      setError({ ...error, message: false });
                    }}
                  />
                </Input>
                <Button type="submit">送信！</Button>
              </Form>
              <ThankYou isActive={isSent}>
                <ThankYouTextWrapper>
                  <ThankYouText isActive={isSent}>THANK YOU</ThankYouText>
                  <ThankYouAttention isActive={isSent}>
                    返信は３日以内におこないます。しばらくお待ちください。
                  </ThankYouAttention>
                </ThankYouTextWrapper>
                <ThankYouEffectWrapper>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                  <ThankYouEffect isActive={isSent}>
                    <span />
                  </ThankYouEffect>
                </ThankYouEffectWrapper>
              </ThankYou>
            </FormWrapper>
          </FormContainer>
        </Contacts>
        <AttentionWrapper isOpen={attentionOpen}>
          <Attention>
            <h3>ご依頼の流れ</h3>
            <ol>
              <AttentionItem>
                <h4>① ご依頼・ご相談</h4>
                <p>
                  納期、予算を明記のうえ、メールもしくはコンタクトフォームよりご連絡ください。
                </p>
              </AttentionItem>
              <AttentionItem>
                <h4>② 見積もり</h4>
                <p>
                  いただいた内容やヒヤリングを通して、作業内容とスケジュールを見積もりします。
                </p>
              </AttentionItem>
              <AttentionItem>
                <h4>③ 着手</h4>
                <p>
                  お見積もりに問題がなければ、受注となります。スケジュールに従って、作業をしていきます。
                </p>
              </AttentionItem>
            </ol>
          </Attention>
          <Attention>
            <h3>ご相談いただけること</h3>
            <ul>
              <AttentionItem>
                <h4>ウェブサイト作成</h4>
                <ul>
                  <li>デザイン〜アニメーション〜実装</li>
                  <li>デザインのみ</li>
                  <li>既存デザインに合わせたフロントエンド開発</li>
                </ul>
              </AttentionItem>
              <AttentionItem>
                <h4>書籍・同人誌のデザイン</h4>
                <ul>
                  <li>表紙などの装丁デザイン</li>
                  <li>本文のエディトリアルデザイン</li>
                </ul>
              </AttentionItem>
              <AttentionItem>
                <h4>そのほか</h4>
                <ul>
                  <li>ロゴデザイン</li>
                  <li>電子回路ふくめたハードウェア制作</li>
                </ul>
              </AttentionItem>
            </ul>
          </Attention>
          <AttentionCloseButton
            isMobile={width <= 1024}
            onClick={e => toggleAttentionOpen()}
          >
            承知しました
          </AttentionCloseButton>
        </AttentionWrapper>
      </Wrapper>
    </>
  );
};

const effectKeyframes = keyframes`
  from{
    transform: translateY(100%);
  }
  to {
    transform: translateY(-100%);
  }
`;

const textApearAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.4);
  }
  50% {
    opacity: 1;
    transform: translateY(-10%) scale(1.2);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Wrapper = styled.div<{ isOpen: boolean }>`
  ${tw`w-full pt-32 px-16 grid gap-16 m-auto`}

  max-width: 1280px;

  grid-template-columns: minmax(0, 1.414fr) minmax(0, 1fr);

  ${media.lg`
    ${tw`block`}
  `}
`;

const Contacts = styled.section`
  ${tw`col-start-1 col-end-2`}
`;

const Header = styled.div`
  ${tw`text-gray-900 mb-12`}

  h2 {
    ${tw`font-header font-bold text-3xl mb-2`}
  }

  p {
    ${tw`font-text text-sm mb-2`}
    line-height: 35px;
  }
`;

const Email = styled.div`
  ${tw`relative w-full col-start-1 col-end-2 text-gray-900 font-header font-bold text-2xl mb-6`}

  a {
    ${tw`relative text-primary-500 underline`}
  }
`;

const FormContainer = styled.div`
  ${tw`relative w-full pt-6`}

  &::before {
    ${tw`absolute w-full m-0 top-0 left-0 bg-gray-900 rounded-full`}

    content: "";
    height: 4px;
  }

  h3 {
    ${tw`text-gray-900 font-header font-bold text-2xl mb-4`}
  }
`;

const FormWrapper = styled.div`
  ${tw`relative w-full`}
`;

const Form = styled.form`
  ${tw`relative w-full text-center`}
`;

const Input = styled.div`
  ${tw`mb-4 text-left`}

  label {
    ${tw`text-gray-900 font-header font-medium text-base`}
  }
`;

const Required = styled.span`
  ${tw`text-red-600 ml-1`}
`;

const InputText = styled.input`
  ${tw`w-full rounded-full text-gray-900 font-text text-sm border-transparent focus:border-primary-500 border-solid border outline-none py-2`}
  text-indent: 1em;
`;

const TextArea = styled.textarea`
  ${tw`w-full h-64 text-gray-900 font-text text-sm border-transparent focus:border-primary-500 border-solid border outline-none resize-none px-3 py-2`}
  border-radius: 1rem;
`;

const Button = styled.button`
  ${tw`bg-primary-500 text-gray-900 font-header font-bold rounded-full w-full py-2 text-center m-auto`}
  max-width: 256px;

  ${media.md`
    max-width: 100%;
  `}
`;

const AttentionWrapper = styled.section<{ isOpen: boolean }>`
  ${tw`w-full h-full col-start-2 col-end-3 bg-white px-8 py-8 transition-all duration-300 ease-out`}

  border-radius: 1rem;

  ${media.lg`
    ${tw`fixed top-0 right-0 left-0 overflow-scroll z-10 px-16 py-32 bg-primary-500`}
    left: -110%;
    transform: translateX(0);
    border-radius: 0;

    ${({ isOpen }) =>
      isOpen &&
      css`
        transform: translateX(110%);
      `}
  `}

  ${media.sm`
    ${tw`px-8 py-32`}
  `}
`;

const Attention = styled.div`
  ${tw`w-full text-gray-900 font-text text-sm mb-6 `}

  ${media.lg`
    ${tw`text-base-200`}
  `}

  h3 {
    ${tw`relative font-header font-bold text-xl`}

    &::before {
      ${tw`absolute w-full m-0 bottom-0 left-0 bg-primary-500 rounded-full`}

      content: "";
      height: 2px;
      max-width: 256px;

      ${media.lg`
        ${tw`bg-base-200`}
      `}
    }
  }

  & > ul,
  & > ol {
    ${tw`mt-4`}
  }
`;

const AttentionItem = styled.li`
  ${tw`text-gray-900 text-sm mb-2`}

  ${media.lg`
      ${tw`text-base-200`}
    `}

  h4 {
    ${tw`font-bold font-header`}
  }

  ul {
    ${tw`list-disc list-inside ml-2`}
  }
`;

const BeforeContactButton = styled.button<{ isMobile: boolean }>`
  ${tw`bg-primary-500 text-gray-900 mb-12 w-full font-bold font-header p-4 rounded-full text-center hidden`}

  ${({ isMobile }) =>
    isMobile &&
    css`
      ${tw`block`}
    `}
`;

const AttentionCloseButton = styled.button<{ isMobile: boolean }>`
  ${tw`bg-base-200 text-gray-900 border-primary-500 border-solid border mt-12 w-full font-bold font-header p-4 rounded-full text-center hidden`}

  ${({ isMobile }) =>
    isMobile &&
    css`
      ${tw`block`}
    `}

  ${media.lg`
    max-width: 256px;
  `}

  ${media.md`
    max-width: 100%;
  `}
`;

const ThankYou = styled.div<{ isActive: boolean }>`
  ${tw`absolute w-full h-full inset-0 m-auto bg-transparent pointer-events-none`}

  ${({ isActive }) =>
    isActive &&
    css`
      ${tw`bg-base-200`}
    `}
`;

const ThankYouTextWrapper = styled.div`
  ${tw`absolute inset-x-0 m-auto text-center`}
  top: 45%;
`;

const ThankYouText = styled.div<{ isActive: boolean }>`
  ${tw`text-gray-900 font-bold font-header text-4xl inline-block text-center leading-none opacity-0`}

  animation: 1s ease-in-out forwards;

  ${({ isActive }) =>
    isActive &&
    css`
      animation-name: ${textApearAnimation};
    `}
`;

const ThankYouAttention = styled.p<{ isActive: boolean }>`
  ${tw`text-gray-900 font-text text-center leading-loose opacity-0 mt-8 transition-all duration-300 ease-out`}

  transform: translateY(10%);
  transition-delay: 1s;

  ${({ isActive }) =>
    isActive &&
    css`
      ${tw`opacity-100`}
      transform: translateY(0);
    `}
`;

const ThankYouEffectWrapper = styled.div`
  ${tw`absolute inset-x-0 mx-auto `}

  top: 35%;
  width: 50%;
  height: 80%;
`;

const ThankYouEffect = styled.div<{ isActive: boolean }>`
  ${tw`absolute`}

  bottom:0;
  left: calc(50% - 1.5px);
  width: 3px;
  height: 100%;
  transform-origin: center bottom;

  &:nth-child(2) {
    transform: rotate(5deg);
  }
  &:nth-child(3) {
    transform: rotate(10deg);
  }
  &:nth-child(4) {
    transform: rotate(15deg);
  }
  &:nth-child(5) {
    transform: rotate(20deg);
  }
  &:nth-child(6) {
    transform: rotate(-5deg);
  }
  &:nth-child(7) {
    transform: rotate(-10deg);
  }
  &:nth-child(8) {
    transform: rotate(-15deg);
  }
  &:nth-child(9) {
    transform: rotate(-20deg);
  }

  span {
    ${tw`block overflow-hidden w-full`}
    height: 5%;

    &::after {
      ${tw`block w-full h-full bg-primary-500`}

      content: '';
      transform: translateY(100%);
      animation: 2.4s ease-in-out 1s infinite;

      ${({ isActive }) =>
        isActive &&
        css`
          animation-name: ${effectKeyframes};
        `}
    }
  }
`;

export default ContactsPage;
