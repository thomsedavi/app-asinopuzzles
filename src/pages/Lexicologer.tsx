import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementDocument, EditableElementHeading1, SingleNumberInput } from '../common/components';
import { Container, Heading1, Information, InputGroup, Table, Td, Th, Tr } from '../common/styled';
import { convertDocumentToString, convertStringToDocument, tidyString } from '../common/utils';
import { LexicologerGame, LexicologerRequiredWord } from '../interfaces';
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
    details: { sections: [ { type: 'PARAGRAPH', element: { text: 'Try to write something within the character limit that makes use of all the words listed below' } } ] },
    requiredWords: []    
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

  const addRequiredWord = () => {
    const requiredWords = lexicologerGame.requiredWords ?? [];
    const randomWord = exampleRequiredWords[Math.floor(Math.random() * exampleRequiredWords.length)];

    requiredWords.push(randomWord);

    setLexicologerGame({ ...lexicologerGame, requiredWords: requiredWords });
  }

  const deleteRequiredWord = (index: number) => {
    const requiredWords = lexicologerGame.requiredWords ?? [];

    index < requiredWords.length && (requiredWords.splice(index, 1));

    setLexicologerGame({ ...lexicologerGame, requiredWords: requiredWords });
  }

  const isEditable = props.mode !== 'read' && props.userId !== undefined && props.userId !== null && lexicologerGame.userId === props.userId;

  const requiredWords: JSX.Element[] | undefined = lexicologerGame?.requiredWords?.map((word: LexicologerRequiredWord, index: number) => {
    return <Tr key={`requiredWordRow${index}`}>
      <Td>{word.primaryWord}</Td>
      <Td>{word.secondaryWords?.join(', ')}</Td>
      <Td>{deleteRequiredWord(index)}</Td>
    </Tr>;
  });

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
      {isEditable && <>
        <InputGroup>
          <SingleNumberInput id='CharacterLimit'
                             label='Character Limit'
                             value={lexicologerGame.characterLimit ?? 140}
                             onChange={(value: string) => setCharacterLimit(value)} />
        </InputGroup>
        <Information>
          The Primary Word will display in the list of Required Words (for example, "love")<br />
          Secondary Words is a comma separated list of alternative words that will also match (for example, "lover, loving")<br />
          Use the '*' symbol as a wildcard match in the Secondary Words (for example, "lov*" will match "loved" and "loving")<br />
          Word matching is case insensitive
        </Information>
        <Table>
          <Tr>
            <Th oneFifth title='Primary Word'>Primary Word</Th>
            <Th threeFifths title='Secondary Words'>Secondary Words</Th>
            <Th oneFifth title='Actions'>Actions</Th>
          </Tr>
          {requiredWords}
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td><span onClick={addRequiredWord} style={{ cursor: 'pointer' }}>➕</span></Td>
          </Tr>
        </Table>
      </>}
    </Container>
  </>;
}

export default Lexicologer;

const exampleRequiredWords: LexicologerRequiredWord[] = [
  {primaryWord: 'love', secondaryWords: ['lov*']},
  {primaryWord: 'loss', secondaryWords: ['lose']},
  {primaryWord: 'hope', secondaryWords: ['hope*', 'hoping']},
  {primaryWord: 'magic', secondaryWords: ['magic*']},
  {primaryWord: 'cold', secondaryWords: ['cold*']},
];
