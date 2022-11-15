import React from 'react';
import { Heading1, Paragraph } from '../common/styled';
import Layout from './Layout';

interface HomePageProps {
  userId?: string | null;
}

const Home = (props: HomePageProps) => {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  return <>
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
    <Heading1>Asino Puzzles</Heading1>
    <Paragraph>Coming soon? A framework for designing custom logic games. Have an idea for a Sudoku variant on a 10x10 grid? Asino Puzzles will allow you do this. Watch this space... slowly.</Paragraph>
  </>;
};

export default Home;
