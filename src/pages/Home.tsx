import React from 'react';
import { Container, Heading1, Overlay, Paragraph, Placeholder } from '../common/styled';
import Layout from './Layout';

interface HomePageProps {
  userId?: string | null;
}

const Home = (props: HomePageProps) => {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickLoader = () => {
    setIsLoading(true);
  }

  return <>
    {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      <div>Saved!</div>
      <Heading1>Asino Puzzles</Heading1>
      <Paragraph>Coming soon? A framework for designing custom logic games. Have an idea for a Sudoku variant on a 10x10 grid? Asino Puzzles will allow you do this. Watch this space... slowly.</Paragraph>
    </Container>
  </>;
};

export default Home;
