import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ErrorMessage, Heading1 } from '../common/styled';
import { convertDocumentToElements } from '../common/utils';
import { User } from '../interfaces';

const UserPage = (): JSX.Element => {
  try {
    const user = useLoaderData() as User;

    if (user) {
      return <>
        <Heading1>{user.name}</Heading1>
        {convertDocumentToElements(user.biography)}
      </>;
    } else {
      return <ErrorMessage>User not found</ErrorMessage>;
    }
  } catch (error: unknown) {
    return <ErrorMessage>User not found</ErrorMessage>;
  }
}

export default UserPage;
