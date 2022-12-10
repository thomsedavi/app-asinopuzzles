import React from 'react';
import Modal from 'react-modal';
import { useLoaderData } from 'react-router-dom';
import { EditableElementDocument, EditableElementHeading1, EditToggleButton } from '../common/components';
import { putUser } from '../common/fetchers';
import { Icon } from '../common/icons';
import { useState } from '../common/saveState';
import { Container, Heading1, Overlay, Placeholder, Flash, Heading2, Table, TableRow, TableHeader, ColumnGroup, Column, TableCell, TableCellAction, TextLink, TableCellLink, ButtonGroup, Button, Paragraph, Emphasis, ErrorMessage } from '../common/styled';
import { convertDocumentToString, convertStringToDocument, formatDate, tidyString } from '../common/utils';
import { LexicologerGame, LexicologerSummary, User } from '../interfaces';
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
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();
  const [ user, setUser ] = React.useState<User>(useLoaderData() as User);
  const [ lexicologerSortColumn, setLexicologerSortColumn ] = React.useState<'title' | 'date'>('title');
  const [ lexicologerSortOrder, setLexicologerSortOrder ] = React.useState<'descending' | 'ascending'>('descending');
  const [ lexicologerToDelete, setLexicologerToDelete ] = React.useState<string | undefined>(undefined);
  const state = useState();

  const saveName = (): void => {
    if (isWorking) {
      return;
    }

    let name = tidyString(inputValue);

    if (name === user.name) {
      setEditingValue(undefined);
      setInputValue(undefined);
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);

    putUser({ id: props.userId!, name: name })
      .then((response: User | undefined | string) => {
        if (response && typeof response !== 'string') {
          setUser({...response, name: name});
          setEditingValue(undefined);
          setInputValue(undefined);
          setIsWorking(false);
          state.showFlash('Name Updated!', 'opposite');
        } else if (response && typeof response === 'string') {
          setIsWorking(false);
          setErrorMessage(response);
          state.showFlash('Error!', 'failure');
        } else {
          setIsWorking(false);
          setErrorMessage('Unknown Error');
          state.showFlash('Error!', 'failure');
        }
      })
      .catch(() => {
        setIsWorking(false);
        setErrorMessage('Unknown Error');
        state.showFlash('Error!', 'failure');
      });
  }

  const saveBiography = (): void => {
    if (isWorking) {
      return;
    }

    const biography = convertStringToDocument(inputValue);

    if (biography === user.biography) {
      setEditingValue(undefined);
      setInputValue(undefined);
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);

    putUser({ id: props.userId!, biography: biography })
      .then((response: User | undefined | string) => {
        if (response && typeof response !== 'string') {
          setUser({...response, biography: biography});
          setEditingValue(undefined);
          setInputValue(undefined);
          setIsWorking(false);
          state.showFlash('Biography Updated!', 'opposite');
        } else if (response && typeof response === 'string') {
          setIsWorking(false);
          setErrorMessage(response);
          state.showFlash('Error!', 'failure');
        } else {
          setIsWorking(false);
          setErrorMessage('Unknown Error');
          state.showFlash('Error!', 'failure');
        }
      })
      .catch(() => {
        setIsWorking(false);
        setErrorMessage('Unknown Error');
        state.showFlash('Error!', 'failure');
      });
  }

  const deleteLexicologer = () => {
    if (lexicologerToDelete === undefined)
      return;

    setErrorMessage(undefined);
    setIsWorking(true);

    fetch(`/api/lexicologers/${lexicologerToDelete}`, { method: 'DELETE'})
      .then((response: Response) => {
        if (response.status === 200) {
          const lexicologers = user.lexicologers ?? [];

          const lexicologer = lexicologers.find(lexicologer => lexicologer.id === lexicologerToDelete)!;
          const index = lexicologers.indexOf(lexicologer);
          
          lexicologers.splice(index, 1);

          setUser({...user, lexicologers: lexicologers});
          setIsWorking(false);
          setLexicologerToDelete(undefined);
          state.showFlash('Lexicologer Deleted!', 'opposite');
        } else {
          setIsWorking(false);
          setErrorMessage('Unknown Error');
          state.showFlash('Error!', 'failure');
        }
      })
      .catch(() => {
        setIsWorking(false);
        setErrorMessage('Unknown Error');
        state.showFlash('Error!', 'failure');
      });
  }

  const onClickLoader = () => {
    setIsLoading(true);
  }

  const toggleLexicologerSort = (columnName: 'title' | 'date') => {
    if (columnName === 'title') {
      if (lexicologerSortColumn === 'title') {
        setLexicologerSortOrder(value => value === 'ascending' ? 'descending' : 'ascending');
      } else {
        setLexicologerSortColumn('title');
        setLexicologerSortOrder('descending');
      }
    } else {
      if (lexicologerSortColumn === 'date') {
        setLexicologerSortOrder(value => value === 'ascending' ? 'descending' : 'ascending');
      } else {
        setLexicologerSortColumn('date');
        setLexicologerSortOrder('descending');
      }
    }
  }

  const lexicologerSort = (a: LexicologerGame, b: LexicologerGame): number => {
    if (lexicologerSortColumn === 'title') {
      if (lexicologerSortOrder === 'ascending') {
        return (a.title ?? '') > (b.title ?? '') ? 1 : -1;
      } else {
        return (a.title ?? '') > (b.title ?? '') ? -1 : 1;
      }
    } else {
      if (lexicologerSortOrder === 'ascending') {
        return (a.dateCreated ?? '') > (b.dateCreated ?? '') ? 1 : -1;
      } else {
        return (a.dateCreated ?? '') > (b.dateCreated ?? '') ? -1 : 1;
      }
    }
  }

  if (user) {
    return <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Container>
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
        {state.flash.state !== 'hide' && <Flash color={state.flash.color} isFading={state.flash.state === 'fade'}>{state.flash.message}</Flash>}
        {user.id === props.userId && (user.lexicologers?.length ?? 0) > 0 && <>
          <Heading2>Lexicologers</Heading2>
          <Table>
            <ColumnGroup>
              <Column smallWidth='10.2em' mediumWidth='24.2em' largeWidth='26.2em' />
              <Column smallWidth='6.2em' mediumWidth='6.2em' largeWidth='6.2em' />
              <Column width='4.6em' />
            </ColumnGroup>
            <thead>
            <TableRow>
              <TableHeader clickable title='Title' onClick={() => toggleLexicologerSort('title')}>Title{lexicologerSortColumn === 'title' ? [' ', <Icon key='titleSort' title='sort' type={lexicologerSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='titleBlank' title='sort' />]}</TableHeader>
              <TableHeader clickable title='Date' onClick={() => toggleLexicologerSort('date')}>Date{lexicologerSortColumn === 'date' ? [' ', <Icon key='dateSort' title='sort' type={lexicologerSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='dateBlank' title='sort' />]}</TableHeader>
              <TableHeader title='Actions'>Actions</TableHeader>
            </TableRow>
            </thead>
            <tbody>
              {user.lexicologers?.sort(lexicologerSort).map((lexicologer: LexicologerSummary, index: number) => <TableRow key={`lexicologer${index}`}>
                <TableCell>
                  <TextLink href={`/lexicologers/${lexicologer.id}`} onClick={onClickLoader}>{lexicologer.title}</TextLink>
                </TableCell>
                  <TableCell textAlign='center'>
                  {lexicologer.dateCreated !== undefined ? formatDate(lexicologer.dateCreated) : '(unknown)'}
                </TableCell>
                <TableCell textAlign='center'>
                  <TableCellLink marginRight href={`/lexicologers/${lexicologer.id}/edit`} onClick={onClickLoader}><Icon title='edit' type='pencil' fillSecondary='--accent' /></TableCellLink>
                  <TableCellAction onClick={() => setLexicologerToDelete(lexicologer.id)}><Icon title='delete' fillSecondary='--opposite' type='delete'/></TableCellAction>
                </TableCell>
              </TableRow>)}
            </tbody>
          </Table>
        </>}
        {user.id !== props.userId && (user.lexicologers?.length ?? 0) > 0 && <>
          <Heading2>Lexicologers</Heading2>
          <Table>
            <ColumnGroup>
              <Column smallWidth='14.8em' mediumWidth='28.8em' largeWidth='30.8em' />
              <Column smallWidth='6.2em' mediumWidth='6.2em' largeWidth='6.2em' />
            </ColumnGroup>
            <thead>
              <TableRow>
                <TableHeader clickable title='Title' onClick={() => toggleLexicologerSort('title')}>Title{lexicologerSortColumn === 'title' ? [' ', <Icon key='titleSort' title='sort' type={lexicologerSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='titleBlank' title='sort' />]}</TableHeader>
                <TableHeader clickable title='Date' onClick={() => toggleLexicologerSort('date')}>Date{lexicologerSortColumn === 'date' ? [' ', <Icon key='dateSort' title='sort' type={lexicologerSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='dateBlank' title='sort' />]}</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {user.lexicologers?.sort(lexicologerSort).map((lexicologer: LexicologerSummary, index: number) => <TableRow key={`lexicologer${index}`}>
                <TableCell>
                  <TextLink href={`/lexicologers/${lexicologer.id}`} onClick={onClickLoader}>{lexicologer.title}</TextLink>
                </TableCell>
                <TableCell>
                  {lexicologer.dateCreated !== undefined ? formatDate(lexicologer.dateCreated) : '(unknown)'}
                </TableCell>
              </TableRow>)}
            </tbody>
          </Table>
        </>}
      </Container>
      {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
      <Modal
        isOpen={lexicologerToDelete !== undefined}
        onRequestClose={() => setLexicologerToDelete(undefined)}
        className="modal"
        overlayClassName="modal-overlay"
        style={{}}
        contentLabel="Delete Lexicologer"
      >
        <Heading2>Delete Lexicologer</Heading2>
        <Paragraph>Are you sure you want to delete <Emphasis>{user.lexicologers?.find(l => l.id === lexicologerToDelete)?.title}</Emphasis>?</Paragraph>
        <ButtonGroup>
          <Button disabled={isWorking} onClick={deleteLexicologer}>Delete</Button>
          <Button disabled={isWorking} onClick={() => { setErrorMessage(undefined); setLexicologerToDelete(undefined) ;}}>Cancel</Button>
        </ButtonGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Modal>
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
