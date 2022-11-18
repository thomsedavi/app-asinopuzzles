import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementDocument, EditableElementHeading1, SingleNumberInput } from '../common/components';
import { Container, Heading1 } from '../common/styled';
import { convertDocumentToString, convertStringToDocument, tidyString } from '../common/utils';
import { LexicologerGame } from '../interfaces';
import Layout from './Layout';

interface LexicologerProps {
  userId?: string | null;
  mode: 'create' | 'read' | 'update';
}

const Lexicologer = (props: LexicologerProps): JSX.Element => {
  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isWorking ] = React.useState<boolean>(false);
  const [ errorMessage ] = React.useState<string | undefined>();
  const [ lexicologerGame, setLexicologerGame ] = React.useState<LexicologerGame>(
    useLoaderData() as LexicologerGame ??
    (props.mode === 'create' && props.userId !== undefined && props.userId !== null && { userId: props.userId, title: 'Lexicologer Game', details: { sections: [ { type: 'PARAGRAPH', element: { text: 'Try to write something within the character limit that makes use of all the words listed below' } } ] } }) ??
    undefined
  );

  if (lexicologerGame === undefined) {
    return <Heading1>404</Heading1>
  } else if (props.mode === 'update' && (props.userId === undefined || props.userId === null || props.userId !== lexicologerGame.userId)) {
    return <Heading1>401</Heading1>
  }

  const saveName = () => {
    setLexicologerGame({ ...lexicologerGame, title: tidyString(inputValue) });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const saveDetails = () => {
    setLexicologerGame({ ...lexicologerGame, details: convertStringToDocument(inputValue) });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  return <>
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
    <Container>
      <EditableElementHeading1 isEditable={props.userId !== undefined && props.userId !== null && lexicologerGame.userId === props.userId}
                               isEditing={editingValue === 'TITLE'}
                               value={lexicologerGame.title ?? 'Lexicologer Game'}
                               inputValue={inputValue}
                               onClickEdit={() => { setEditingValue('TITLE'); setInputValue(lexicologerGame.title ?? 'Lexicologer Game'); }}
                               onChange={(value: string) => setInputValue(value)}
                               onClickSave={saveName}
                               onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
                               isWorking={isWorking}
                               placeholder='Lexicologer Game Title'
                               errorMessage={errorMessage} />
      <EditableElementDocument isEditable={props.userId !== undefined && props.userId !== null && lexicologerGame.userId === props.userId}
                               isEditing={editingValue === 'DETAILS'}
                               value={lexicologerGame.details ?? {}}
                               inputValue={inputValue}
                               onClickEdit={() => { setEditingValue('DETAILS'); setInputValue(convertDocumentToString(lexicologerGame.details ?? {})); }}
                               onChange={(value: string) => setInputValue(value)}
                               onClickSave={saveDetails}
                               onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
                               isWorking={isWorking}
                               placeholder='Lexicologer Game Information'
                               errorMessage={errorMessage} />
      <SingleNumberInput />
    </Container>
  </>;
}

export default Lexicologer;
