import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementDocument, EditableElementHeading1, EditToggleButton } from '../common/components';
import { Container, Heading1, Overlay, Placeholder, Saved } from '../common/styled';
import { convertDocumentToString, convertStringToDocument, tidyString } from '../common/utils';
import { User } from '../interfaces';
import Layout from './Layout';

interface UserPageProps {
  userId?: string | null;
  mode: 'read' | 'update';
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const [ mode, setMode ] = React.useState<'read' | 'update'>(props.mode);
  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();
  const [ user, setUser ] = React.useState<User>(useLoaderData() as User);
  const [ savedState, setSavedState] = React.useState<'show' | 'fade' | 'hide'>('hide');
  const [ saveFadeTimestamp, setSaveFadeTimestamp ] = React.useState<number>(Date.now());

  const saveName = (): void => {
    if (isWorking) {
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);
    const timeStamp = Date.now();
    console.log(timeStamp);

    let name = tidyString(inputValue);

    fetch(`/api/users/${props.userId}`, { method: 'PUT', body: JSON.stringify({ name: name }) })
      .then((response: Response) => {
        if (response.status === 200) {
          setUser({...user, name: name});
          setEditingValue(undefined);
          setInputValue(undefined);
          setIsWorking(false);
          setSavedState('show');

          setTimeout(() => {

            setSavedState('fade');
            setSaveFadeTimestamp(timeStamp);

            setTimeout(() => {
              console.log(saveFadeTimestamp);
              console.log(timeStamp);
              saveFadeTimestamp === timeStamp && setSavedState('hide');
            }, 5000);
          }, 1000);
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

  const saveBiography = (): void => {
    if (isWorking) {
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);

    const biography = convertStringToDocument(inputValue);

    fetch(`/api/users/${props.userId}`, { method: 'PUT', body: JSON.stringify({ biography: biography }) })
      .then((response: Response) => {
        if (response.status === 200) {
          setUser({...user, biography: biography});
          setEditingValue(undefined);
          setInputValue(undefined);
          setIsWorking(false);
        } else if (response.status === 400) {
          response.text()
            .then((error: string) => {
              if (error === 'BIOGRAPHY_TOO_LONG') {
                setIsWorking(false);
                setErrorMessage('Biography is too long');
              } else {
                setIsWorking(false);
                setErrorMessage('Unknown Error');
              }
            });
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

  const onClickLoader = () => {
    setIsLoading(true);
  }

  if (user) {
    return <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Container>
        {savedState !== 'hide' && <Saved isFading={savedState === 'fade'}>Saved!</Saved>}
        {user.id === props.userId && <EditToggleButton mode={mode} onClick={() => setMode(mode === 'read' ? 'update' : 'read')} />}
        <EditableElementHeading1 editState={mode === 'update' && user.id === props.userId ? (editingValue === 'NAME' ? 'editing' : 'editable') : 'disabled'}
                                 value={user.name ?? 'Anonymous'}
                                 inputValue={inputValue}
                                 onClickEdit={() => { setEditingValue('NAME'); setInputValue(user.name ?? 'Anonymous'); }}
                                 onChange={(value: string) => setInputValue(value)}
                                 onClickSave={saveName}
                                 onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
                                 isWorking={isWorking}
                                 placeholder='User Name'
                                 errorMessage={errorMessage} />
        <EditableElementDocument editState={mode === 'update' && user.id === props.userId ? (editingValue === 'BIOGRAPHY' ? 'editing' : 'editable') : 'disabled'}
                                 value={user.biography ?? {}}
                                 inputValue={inputValue}
                                 onClickEdit={() => { setEditingValue('BIOGRAPHY'); setInputValue(convertDocumentToString(user.biography ?? {})); }}
                                 onChange={(value: string) => setInputValue(value)}
                                 onClickSave={saveBiography}
                                 onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
                                 isWorking={isWorking}
                                 placeholder='User Biography'
                                 errorMessage={errorMessage} />
      </Container>
      {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
    </>;
  } else {
    return<>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Container>
        <Heading1>User not found</Heading1>
      </Container>
    </>;
  }
}

export default UserPage;
