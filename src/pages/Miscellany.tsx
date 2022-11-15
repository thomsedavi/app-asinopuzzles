import React from 'react';
import { Container, Heading1, Heading2, Paragraph } from '../common/styled';
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
        <Paragraph>Lexicologer was designed for Read NZ Te Pou Muramura for their weekly #RāmereShorts game. Specify a set of words and challenge writers to compose something under a particular word count that uses all words.</Paragraph>
        <Paragraph>TODO: migrate this over from the old Lotographia website.</Paragraph>
      </Container>
    </>
  );
};

export default Miscellany;
