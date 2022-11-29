import React from 'react';
import { ButtonGroup, ButtonLink, Container, Heading1, Heading2, Overlay, Paragraph, Placeholder, TextLink } from '../common/styled';
import Layout from './Layout';

interface MiscellanyProps {
  userId?: string | null;
}

const Miscellany = (props: MiscellanyProps) => {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickLoader = () => {
    setIsLoading(true);
  }

  return (
    <>
      {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Container>
        <Heading1>Miscellany</Heading1>
        <Heading2>Lexicologer</Heading2>
        <Paragraph>Specify a set of words and challenge writers to compose something under a particular word count that uses all the words.</Paragraph>
        {!props.userId && <Paragraph><TextLink href='/login'>Log in</TextLink> to create a new Lexicologer game.</Paragraph>}
        {props.userId && <ButtonGroup>
          <ButtonLink to="/lexicologers/create">Create Lexicologer Game</ButtonLink>
        </ButtonGroup>}
      </Container>
    </>
  );
};

export default Miscellany;
