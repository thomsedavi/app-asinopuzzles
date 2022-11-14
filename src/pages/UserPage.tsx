import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, ErrorMessage, Heading1 } from '../common/styled';
import { convertDocumentToElements } from '../common/utils';
import { User } from '../interfaces';
import Layout from './Layout';

interface UserPageProps {
  me?: User | null;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const user = useLoaderData() as User;

  var [ name, setName ] = React.useState(user.name ?? '?');

  if (user) {
    if (user.id === props.me?.id) {

      return <>
        <Layout showPlaceholder={() => {}} me={props.me} isBurgerOpen={false} setIsBurgerOpen={() => {}} />
        <Container>
          <Heading1>{user.name}</Heading1>
          {convertDocumentToElements(user.biography)}
          <div onClick={() => setName(name + '?')}>{name}</div>
        </Container>
      </>;
    } else {
      return <>
        <Heading1>{user.name}</Heading1>
        {convertDocumentToElements(user.biography)}
      </>;
    }
  } else {
    return <ErrorMessage>User not found</ErrorMessage>;
  }
}

export default UserPage;
