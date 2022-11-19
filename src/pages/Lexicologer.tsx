import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementDocument, EditableElementHeading1, EditableTableCellParagraph, SingleNumberInput } from '../common/components';
import { Container, EditIcon, Heading1, Information, InputGroup, Table, TableCell, TableCellAction, TableHeader, TableRow } from '../common/styled';
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

  const createRequiredWord = () => {
    const requiredWords = lexicologerGame.requiredWords ?? [];

    requiredWords.push({});

    setLexicologerGame({ ...lexicologerGame, requiredWords: requiredWords });
  }

  const randomiseWord = (index: number) => {
    const randomWord = exampleRequiredWords[Math.floor(Math.random() * exampleRequiredWords.length)];

    const requiredWords = lexicologerGame.requiredWords ?? [];

    index < requiredWords.length && (requiredWords.splice(index, 1, randomWord));

    setLexicologerGame({ ...lexicologerGame, requiredWords: requiredWords });
  }

  const deleteRequiredWord = (index: number) => {
    const requiredWords = lexicologerGame.requiredWords ?? [];

    index < requiredWords.length && (requiredWords.splice(index, 1));

    setLexicologerGame({ ...lexicologerGame, requiredWords: requiredWords });
  }

  const savePrimaryWord = (index: number) => {
    const requiredWords = lexicologerGame.requiredWords ?? [];

    index < requiredWords.length && (requiredWords[index].primaryWord = tidyString(inputValue));

    setLexicologerGame({ ...lexicologerGame, requiredWords: requiredWords });
  }

  const isEditable = props.mode !== 'read' && props.userId !== undefined && props.userId !== null && lexicologerGame.userId === props.userId;

  const requiredWords: JSX.Element[] | undefined = lexicologerGame?.requiredWords?.map((word: LexicologerRequiredWord, index: number) => {
    return <TableRow key={`requiredWordRow${index}`}>
      <EditableTableCellParagraph
        editState={isEditable ? (editingValue === `PRIMARY_WORD_${index}` ? 'editing' : 'editable') : 'disabled'}
        value={word.primaryWord ?? ''}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue(`PRIMARY_WORD_${index}`); setInputValue(lexicologerGame.title ?? 'Lexicologer Game'); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={() => savePrimaryWord(index)}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
      />
      <TableCell>{word.secondaryWords?.join(', ')} <EditIcon>✏️</EditIcon></TableCell>
      <TableCell>
        <TableCellAction onClick={() => randomiseWord(index)}>🎲</TableCellAction>
        <TableCellAction onClick={() => deleteRequiredWord(index)}>➖</TableCellAction>
      </TableCell>
    </TableRow>;
  });

  return <>
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
    <Container>
      <EditableElementHeading1
        editState={isEditable ? (editingValue === 'TITLE' ? 'editing' : 'editable') : 'disabled'}
        value={lexicologerGame.title ?? 'Lexicologer Game'}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('TITLE'); setInputValue(lexicologerGame.title ?? 'Lexicologer Game'); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveName}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Lexicologer Game Title'
      />
      <EditableElementDocument
        editState={isEditable ? (editingValue === 'DETAILS' ? 'editing' : 'editable') : 'disabled'}
        value={lexicologerGame.details ?? {}}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('DETAILS'); setInputValue(convertDocumentToString(lexicologerGame.details ?? {})); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveDetails}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Lexicologer Game Information'
      />
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
          <TableRow>
            <TableHeader oneFifth title='Primary Word'>Primary Word</TableHeader>
            <TableHeader threeFifths title='Secondary Words'>Secondary Words</TableHeader>
            <TableHeader oneFifth title='Actions'>Actions</TableHeader>
          </TableRow>
          {requiredWords}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell><span onClick={createRequiredWord} style={{ cursor: 'pointer' }}>➕</span></TableCell>
          </TableRow>
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
