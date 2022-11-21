import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementDocument, EditableElementHeading1, EditableTableCellParagraph, SingleNumberInput } from '../common/components';
import { Button, ButtonGroup, Column, ColumnGroup, Container, Heading1, Information, InputGroup, Paragraph, ParagraphAccent, Table, TableCell, TableCellAction, TableHeader, TableRow, TextArea } from '../common/styled';
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
  const [ lexicologerGame, setLexicologerGame ] = React.useState<LexicologerGame | undefined>(
    useLoaderData() as LexicologerGame ??
    (props.mode === 'create' && defaultGame) ??
    undefined
  );
  const [ isPlaying, setIsPlaying ] = React.useState<boolean>(props.mode === 'read');

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
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const saveSecondaryWord = (index: number) => {
    const requiredWords = lexicologerGame.requiredWords ?? [];

    index < requiredWords.length && (requiredWords[index].secondaryWords = inputValue?.split(',').map(word => tidyString(word)) ?? requiredWords[index].secondaryWords);

    setLexicologerGame({ ...lexicologerGame, requiredWords: requiredWords });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const isEditable = props.mode !== 'read' && props.userId !== undefined && props.userId !== null && lexicologerGame.userId === props.userId;

  const requiredWords: JSX.Element[] | undefined = lexicologerGame?.requiredWords?.map((word: LexicologerRequiredWord, index: number) => {
    return <TableRow key={`requiredWordRow${index}`}>
      <EditableTableCellParagraph
        editState={isEditable ? (editingValue === `WORD_PRIMARY_${index}` ? 'editing' : 'editable') : 'disabled'}
        value={word.primaryWord ?? ''}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue(`WORD_PRIMARY_${index}`); setInputValue(word.primaryWord ?? ''); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={() => savePrimaryWord(index)}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        maxLength={32}
      />
      <EditableTableCellParagraph
        editState={isEditable ? (editingValue === `WORD_SECONDARY_${index}` ? 'editing' : 'editable') : 'disabled'}
        value={word.secondaryWords?.join(', ') ?? ''}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue(`WORD_SECONDARY_${index}`); setInputValue(word.secondaryWords?.join(', ') ?? ''); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={() => saveSecondaryWord(index)}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        maxLength={64}
      />
      <TableCell>
        <TableCellAction onClick={() => randomiseWord(index)}>🎲</TableCellAction>
        <TableCellAction onClick={() => deleteRequiredWord(index)}>➖</TableCellAction>
      </TableCell>
    </TableRow>;
  });

  const requiredWordChecklist: (JSX.Element | string)[] = [];

  // to lower case and strip accents, eg 'é' => 'e', but keep the wildcard '*'
  const cleanWord = (word: string): string => {
    let cleanedWord = ''

    for (let c of word.toLowerCase().normalize('NFKD')) {
      if (c !== c.toUpperCase() || c === '*') {
        cleanedWord += c;
      }
    }

    return cleanedWord;
  }

  if (isPlaying) {
    const usedWords: string[] = [];
    let word: string = '';

    for (let c of inputValue ?? '') {
      if (c.toLowerCase() !== c.toUpperCase()) {
        word += c;
      } else {
        word !== '' && usedWords.push(cleanWord(word));
        word = '';
      }
    }

    word !== '' && usedWords.push(cleanWord(word));

    lexicologerGame.requiredWords?.forEach((requiredWord: LexicologerRequiredWord, index: number) => {
      let match = false;

      if (requiredWord.primaryWord) {
        let regex = '/\\b';

        for (let c of cleanWord(requiredWord.primaryWord)) {
          if (c === '*') {
            regex += '\\w+'
          } else {
            regex += c;
          }
        }
        regex += '/'

        var regExp = new RegExp(regex);

        usedWords.forEach((usedWord: string) => {
          match ||= regExp.test(usedWord);
        });
      }

      console.log('match', match);
    });
  }

  return <>
    <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
    <Container>
      <EditableElementHeading1
        editState={!isPlaying && isEditable ? (editingValue === 'TITLE' ? 'editing' : 'editable') : 'disabled'}
        value={lexicologerGame.title ?? 'Lexicologer Game'}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('TITLE'); setInputValue(lexicologerGame.title ?? 'Lexicologer Game'); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveName}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Lexicologer Game Title'
      />
      <EditableElementDocument
        editState={!isPlaying && isEditable ? (editingValue === 'DETAILS' ? 'editing' : 'editable') : 'disabled'}
        value={lexicologerGame.details ?? {}}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('DETAILS'); setInputValue(convertDocumentToString(lexicologerGame.details ?? {})); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveDetails}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Lexicologer Game Information'
      />
      {!isPlaying && isEditable && <>
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
          <ColumnGroup>
            <Column smallWidth='6.2em' mediumWidth='6.2em' largeWidth='6.2em' />
            <Column width='2em' />
            <Column smallWidth='6.2em' mediumWidth='20.2em' largeWidth='22.2em' />
            <Column width='2em' />
            <Column width='4.6em' />
          </ColumnGroup>
          <TableRow>
            <TableHeader title='Primary Word' colSpan={2}>Primary Word</TableHeader>
            <TableHeader title='Secondary Words' colSpan={2}>Secondary Words</TableHeader>
            <TableHeader title='Actions'>Actions</TableHeader>
          </TableRow>
          {requiredWords}
          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell colSpan={2}></TableCell>
            <TableCell><span onClick={createRequiredWord} style={{ cursor: 'pointer' }}>➕</span></TableCell>
          </TableRow>
        </Table>
        <ButtonGroup>
          <Button onClick={() => {setInputValue(''); setIsPlaying(true);}}>Preview</Button>
        </ButtonGroup>
      </>}
      {isPlaying && <>
        <Paragraph>{requiredWordChecklist}</Paragraph>
        <TextArea
          autoFocus
          value={inputValue}
          rows={8}
          cols={40}
          maxLength={4000}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(event.target.value)}
        />
        <ParagraphAccent>
          {inputValue?.replaceAll('\n', '').length ?? '?'}/{lexicologerGame.characterLimit ?? '?'}
        </ParagraphAccent>
      </>}
      {isPlaying && isEditable && <ButtonGroup>
        <Button onClick={() => {setInputValue(undefined); setIsPlaying(false);}}>Edit</Button>
      </ButtonGroup>}
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
