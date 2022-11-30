import React from 'react';
import { Container, Heading1, Overlay, Placeholder } from '../common/styled';
import Layout from './Layout';

interface NoPageProps {
  userId?: string | null;
}

const NoPage = (props: NoPageProps) => {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickLoader = () => {
    setIsLoading(true);
  }

  return <>
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      <Heading1>404</Heading1>
    </Container>
    {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
  </>;
};

export default NoPage;
