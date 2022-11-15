import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, ErrorMessage, Heading1 } from '../common/styled';
import { convertDocumentToElements } from '../common/utils';
import { User } from '../interfaces';
import Layout from './Layout';

interface UserPageProps {
  userId?: string | null;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const user = useLoaderData() as User;

  var [ name, setName ] = React.useState(user.name ?? '?');
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  if (user) {
    if (user.id === props.userId) {

      return <>
        <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
        <Container>
          <Heading1>{user.name}</Heading1>
          {convertDocumentToElements(user.biography)}
          <div onClick={() => setName(name + '?')}>{name}</div>
        </Container>
      </>;
    } else {
      return <>
        <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
        <Heading1>{user.name}</Heading1>
        {convertDocumentToElements(user.biography)}
      </>;
    }
  } else {
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
    return <ErrorMessage>User not found</ErrorMessage>;
  }
}

export default UserPage;
