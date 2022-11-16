import React from 'react';
import { Button, ButtonContainer, ButtonLink, Container, Heading1, Heading2, Paragraph, TextLink } from '../common/styled';
import Layout from './Layout';

interface MiscellanyProps {
  userId?: string | null;
}

const Miscellany = (props: MiscellanyProps) => {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  return (
    <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
      <Container>
        <Heading1>Miscellany</Heading1>
        <Heading2>Lexicologer</Heading2>
        <Paragraph>Specify a set of words and challenge writers to compose something under a particular word count that uses all the words.</Paragraph>
        {!props.userId && <Paragraph><TextLink href='/login'>Log in</TextLink> to create a new Lexicologer exercice.</Paragraph>}
        {props.userId && <ButtonContainer>
          <ButtonLink to="/lexicologers/create">Create Lexicologer Exercise</ButtonLink><Button>This Is Also A Button</Button>
        </ButtonContainer>}
      </Container>
    </>
  );
};

export default Miscellany;
