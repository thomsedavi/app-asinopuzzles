import React from 'react';
import { ErrorMessage, Heading1, Placeholder } from '../common/styled';
import { convertDocumentToElements } from '../common/utils';
import { User } from '../interfaces';

interface UserPageProps {
  user?: User;
  errorMessage?: string;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  if (props.errorMessage) {
    return <ErrorMessage>{props.errorMessage}</ErrorMessage>;
  } else if (!props.user) {
    return <ErrorMessage>User not found</ErrorMessage>;
  } else {
    return <>
      <Heading1>{props.user.name}</Heading1>
      {convertDocumentToElements(props.user.biography)}
    </>;
  }
}

export default UserPage;
