import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementDocument, EditableElementHeading1, SingleNumberInput } from '../common/components';
import { Container, Heading1, InputGroup } from '../common/styled';
import { convertDocumentToString, convertStringToDocument, tidyString } from '../common/utils';
import { LexicologerGame } from '../interfaces';
import Layout from './Layout';

interface LexicologerProps {
  userId?: string | null;
  mode: 'create' | 'read' | 'update';
}

const Lexicologer = (props: LexicologerProps): JSX.Element => {
  const defaultGame: LexicologerGame | undefined = props.userId !== undefined && props.userId !== null ? {
    userId: props.userId,
    title: 'Lexicologer Game',
    characterLimit: 140,
    details: { sections: [ { type: 'PARAGRAPH', element: { text: 'Try to write something within the character limit that makes use of all the words listed below' } } ] }
  } : undefined;

  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isWorking ] = React.useState<boolean>(false);
  const [ errorMessage ] = React.useState<string | undefined>();
  const [ lexicologerGame, setLexicologerGame ] = React.useState<LexicologerGame>(
    useLoaderData() as LexicologerGame ??
    (props.mode === 'create' && defaultGame) ??
    undefined
  );

  if (lexicologerGame === undefined) {
    return <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
      <Heading1>Please log in to create a Lexicologer game</Heading1>
    </>
  } else if (props.mode === 'update' && (props.userId === undefined || props.userId === null || props.userId !== lexicologerGame.userId)) {
    return <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
      <Heading1>401</Heading1>
    </>
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

  const setCharacterLimit = (value: string) => {
    const characterLimit = Number(value);

    if (!isNaN(characterLimit)) {
      setLexicologerGame({ ...lexicologerGame, characterLimit: characterLimit });
    }
  }

  const isEditable = props.mode !== 'read' && props.userId !== undefined && props.userId !== null && lexicologerGame.userId === props.userId;

  return <>
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
    <Container>
      <EditableElementHeading1 isEditable={isEditable}
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
      <EditableElementDocument isEditable={isEditable}
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
      {isEditable && <InputGroup>
        <SingleNumberInput id='CharacterLimit'
                           label='Character Limit'
                           value={lexicologerGame.characterLimit ?? 140}
                           onChange={(value: string) => setCharacterLimit(value)} />}
      </InputGroup>
    </Container>
  </>;
}

export default Lexicologer;
