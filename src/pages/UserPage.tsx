import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementHeading1 } from '../common/components';
import { Container, Heading1 } from '../common/styled';
import { convertDocumentToElements } from '../common/utils';
import { User } from '../interfaces';
import Layout from './Layout';

interface UserPageProps {
  userId?: string | null;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const [ inputValue, setInputValue ] = React.useState<string | undefined>(undefined);
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>(undefined);
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState(false);

  const user = useLoaderData() as User;

  if (user) {
    return <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
      <Container>
        <EditableElementHeading1 isEditable={user.id === props.userId}
                                 id='NAME'
                                 value={user.name ?? 'Anonymous'}
                                 editingId={editingValue}
                                 inputValue={inputValue}
                                 onClickEdit={setEditingValue}
                                 onChange={setInputValue}
                                 onClickSave={() => { console.log('TODO') }}
                                 onClickCancel={[ setInputValue, setEditingValue ]}
                                 isWorking={false}
                                 placeholder='User Name'
                                 errorMessage='Error Message' />
        {convertDocumentToElements(user.biography)}
      </Container>
    </>;
  } else {
    return<>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
      <Container>
        <Heading1>User not found</Heading1>
      </Container>
    </>;
  }
}

export default UserPage;
