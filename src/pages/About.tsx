import React from 'react';
import { Container, Heading1, Heading2, Overlay, Paragraph, Placeholder } from '../common/styled';
import Layout from './Layout';

interface AboutPageProps {
  userId?: string | null;
}

const About = (props: AboutPageProps) => {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickLoader = () => {
    setIsLoading(true);
  }

  return (
    <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Container>
        <Heading1>About</Heading1>
        <Heading2>Asino Puzzles</Heading2>
        <Paragraph>Asino Puzzles is a puzzle framework created by Lotographia. The original assignment was to make a game similar to Sim City, but more puzzle-y. The result was a minor flop, but the attempt to make this game had the byproduct of this flexible puzzle framework that can be used for the creation of a wide variety of other bespoke puzzles.</Paragraph>
        <Heading2>Miscellany</Heading2>
        <Paragraph>Also on this website will be a couple of other minor distractions devised by Lotographia.</Paragraph>
        <Heading2>Lotographia</Heading2>
        <Paragraph>Lotographia lives in Aotearoa New Zealand. They grew up with an Amiga 1000 and had ambitions to grow up to make Amiga games for a living. Sadly the Amiga system did not survive the 1990's and it is impossible to earn a living making games for a dead computer. Now they make proper adult software for a living and web games in their spare time. They are also trying to write a novel about making computer games for the Amiga computer.</Paragraph>
        <Paragraph>Their IRL name is David Thomsen.</Paragraph>
      </Container>
      {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
    </>
  );
};

export default About;
