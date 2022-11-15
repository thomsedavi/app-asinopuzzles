import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementHeading1 } from '../common/components';
import { Container, Heading1 } from '../common/styled';
import { convertDocumentToElements, tidyString } from '../common/utils';
import { User } from '../interfaces';
import Layout from './Layout';

interface UserPageProps {
  userId?: string | null;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();

  const [ user, setUser ] = React.useState<User>(useLoaderData() as User);

  const saveName = (): void => {
    if (isWorking) {
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);

    let name = tidyString(inputValue);

    fetch(`api/user/${props.userId}`, { method: 'PUT', body: JSON.stringify({ name: name }) })
      .then((response: Response) => {
        if (response.status === 200) {
          setUser({...user, name: name});
          setEditingValue(undefined);
          setInputValue(undefined);
          setIsWorking(false);
        } else {
          setIsWorking(false);
          setErrorMessage('Unknown Error');
        }
      })
      .catch(() => {
        setIsWorking(false);
        setErrorMessage('Unknown Error');
      });
  }

  if (user) {
    return <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
      <Container>
        <EditableElementHeading1 isEditable={user.id === props.userId}
                                 id='NAME'
                                 value={user.name ?? 'Anonymous'}
                                 editingId={editingValue}
                                 inputValue={inputValue}
                                 onClickEdit={() => { setEditingValue('NAME'); setInputValue(user.name ?? 'Anonymous'); }}
                                 onChange={(value: string) => setInputValue(value)}
                                 onClickSave={saveName}
                                 onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
                                 isWorking={isWorking}
                                 placeholder='User Name'
                                 errorMessage={errorMessage} />
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
