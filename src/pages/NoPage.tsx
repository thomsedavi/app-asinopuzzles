import React from 'react';
import { Container, Heading1 } from '../common/styled';
import Layout from './Layout';

interface NoPageProps {
  userId?: string | null;
}

const NoPage = (props: NoPageProps) => {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  const onClickLoader = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log(event);
  }

  return <>
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      <Heading1>404</Heading1>
    </Container>
  </>;
};

export default NoPage;
