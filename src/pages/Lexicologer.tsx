import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { EditableElementDocument, EditableElementHeading1, EditableTableCellParagraph, SingleNumberInput } from '../common/components';
import { Button, ButtonGroup, Column, ColumnGroup, Container, FailureSpan, Heading1, Information, InputGroup, Paragraph, ParagraphAccent, SuccessSpan, Table, TableCell, TableCellAction, TableHeader, TableRow, TextArea } from '../common/styled';
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
  const [ solutionValue, setSolutionValue ] = React.useState<string>('');
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
  let requiredWordsPass: boolean = true;

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

  const isUsedWordRequiredWord = (requiredWord: string, usedWords: string[]): boolean => {
    let match: boolean = false;
    let regex: string = '\\b';

    for (let c of cleanWord(requiredWord)) {
      if (c === '*') {
        regex += '\\w+'
      } else {
        regex += c;
      }
    }
    regex += '\\b'

    var regExp = new RegExp(regex);

    for (let i = 0; i < usedWords.length && !match; i++) {
      match ||= regExp.test(usedWords[i]);
    }

    return match;
  }

  if (isPlaying) {
    const usedWords: string[] = [];
    let word: string = '';

    for (let c of solutionValue) {
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
        match ||= isUsedWordRequiredWord(requiredWord.primaryWord!, usedWords);
      }

      if (!match && requiredWord.secondaryWords) {
        for (let i = 0; i < requiredWord.secondaryWords.length && !match; i++) {
          match ||= isUsedWordRequiredWord(requiredWord.secondaryWords[i], usedWords);
        }
      }

      if (match) {
        requiredWordChecklist.push(<SuccessSpan key={`requiredWord${index}`}>{requiredWord.primaryWord ?? '?'}</SuccessSpan>);
      } else {
        requiredWordChecklist.push(<FailureSpan key={`requiredWord${index}`}>{requiredWord.primaryWord ?? '?'}</FailureSpan>);
      }

      if (index < lexicologerGame.requiredWords!.length - 2) {
        requiredWordChecklist.push(', ');
      } else if (index === lexicologerGame.requiredWords!.length - 2) {
        requiredWordChecklist.push(' and ');
      }

      !match && (requiredWordsPass = false);
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
          <Button onClick={() => setIsPlaying(true)}>Preview</Button>
        </ButtonGroup>
      </>}
      {isPlaying && <>
        <Paragraph>{requiredWordChecklist}</Paragraph>
        <TextArea
          autoFocus
          value={solutionValue}
          rows={8}
          cols={40}
          maxLength={4000}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setSolutionValue(event.target.value)}
        />
        <ParagraphAccent>
          {solutionValue.replaceAll('\n', '').length ?? '?'}/{lexicologerGame.characterLimit ?? '?'}
        </ParagraphAccent>
        {!requiredWordsPass ? <StatusRequiredWords /> : ((solutionValue.replaceAll('\n', '').length ?? 0) > (lexicologerGame.characterLimit ?? 0) ? <StatusTooLong /> : <StatusGood />)}
      </>}
      {isPlaying && isEditable && <ButtonGroup>
        <Button onClick={() => setIsPlaying(false)}>Edit</Button>
      </ButtonGroup>}
    </Container>
  </>;
}

export default Lexicologer;

const exampleRequiredWords: LexicologerRequiredWord[] = [
  {primaryWord: 'love', secondaryWords: ['lov*', '*love*']},
  {primaryWord: 'loss', secondaryWords: ['lose', '*less']},
  {primaryWord: 'hope', secondaryWords: ['hope*', 'hoping']},
  {primaryWord: 'magic', secondaryWords: ['magic*']},
  {primaryWord: 'cold', secondaryWords: ['cold*']},
];

// everything below here is borrowed directly from my old Lotographia website, which is why it doesn't match other stuff on this website
const StatusTooLong: React.FunctionComponent = (props) => {
  return <svg
    key="StatusTooLong"
    viewBox="0 0 800 160"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2, overflow: "visible", width: "24em", maxWidth: "100%", display: "block", margin: "0 auto" }}>
    <StatusText x="196.291px" y="105.646px">Too long!</StatusText>
    <g>
      <DarkPinkPath d="M744.457,45c0,0 -25.399,0.808 -33.713,5.608c-5.735,3.311 -7.703,10.656 -4.392,16.392c3.312,5.735 10.657,7.704 16.392,4.392c8.314,-4.8 21.713,-26.392 21.713,-26.392Z" />
      <DarkPinkPath d="M780.958,80c0,0 -22.4,-12 -32,-12c-6.623,0 -12,5.377 -12,12c0,6.623 5.377,12 12,12c9.6,0 32,-12 32,-12Z" />
      <DarkPinkPath d="M745.186,108c0,0 -13.399,-21.592 -21.713,-26.392c-5.735,-3.312 -13.081,-1.343 -16.392,4.392c-3.312,5.736 -1.343,13.081 4.392,16.392c8.314,4.8 33.713,5.608 33.713,5.608Z" />
      <DarkPinkPath d="M573.085,108c0,0 25.399,-0.808 33.713,-5.608c5.736,-3.311 7.704,-10.656 4.392,-16.392c-3.311,-5.735 -10.656,-7.704 -16.392,-4.392c-8.314,4.8 -21.713,26.392 -21.713,26.392Z" />
      <DarkPinkPath d="M38.989,84c0,0 22.4,12 32,12c6.623,0 12,-5.377 12,-12c0,-6.623 -5.377,-12 -12,-12c-9.6,0 -32,12 -32,12Z" />
      <DarkPinkPath d="M571.797,50c0,0 13.399,21.592 21.713,26.392c5.736,3.312 13.081,1.343 16.392,-4.392c3.312,-5.736 1.344,-13.081 -4.392,-16.392c-8.314,-4.8 -33.713,-5.608 -33.713,-5.608Z" />
      <MediumPinkPath d="M747.018,63.269c0,0 -20.168,-4.949 -27.702,-2.93c-5.331,1.428 -8.5,6.916 -7.071,12.247c1.428,5.331 6.916,8.5 12.247,7.071c7.534,-2.018 22.526,-16.388 22.526,-16.388Z" />
      <MediumPinkPath d="M785.425,96.731c0,0 -14.992,-14.37 -22.526,-16.388c-5.331,-1.429 -10.819,1.74 -12.247,7.071c-1.429,5.331 1.74,10.819 7.071,12.247c7.534,2.019 27.702,-2.93 27.702,-2.93Z" />
      <MediumPinkPath d="M532.87,108.383c0,0 19.94,-5.798 25.456,-11.314c3.902,-3.903 3.902,-10.239 0,-14.142c-3.903,-3.903 -10.24,-3.903 -14.142,0c-5.516,5.515 -11.314,25.456 -11.314,25.456Z" />
      <MediumPinkPath d="M76.31,103.731c0,0 20.168,4.949 27.702,2.93c5.331,-1.428 8.5,-6.916 7.071,-12.247c-1.428,-5.331 -6.916,-8.5 -12.247,-7.071c-7.534,2.018 -22.526,16.388 -22.526,16.388Z" />
      <MediumPinkPath d="M108.463,73.341c0,0 14.991,14.37 22.526,16.389c5.331,1.428 10.819,-1.74 12.247,-7.071c1.429,-5.331 -1.74,-10.819 -7.071,-12.248c-7.534,-2.018 -27.702,2.93 -27.702,2.93Z" />
      <MediumPinkPath d="M50.164,51.617c0,0 5.798,19.941 11.314,25.456c3.902,3.903 10.239,3.903 14.142,0c3.902,-3.903 3.902,-10.239 0,-14.142c-5.516,-5.516 -25.456,-11.314 -25.456,-11.314Z" />
      <LightPinkPath d="M759.262,62c0,0 -16.124,0.072 -21.32,3.072c-3.824,2.207 -5.136,7.104 -2.929,10.928c2.208,3.824 7.105,5.136 10.929,2.928c5.196,-3 13.32,-16.928 13.32,-16.928Z" />
      <LightPinkPath d="M800,80c0,0 -14,-8 -20,-8c-4.415,0 -8,3.585 -8,8c0,4.415 3.585,8 8,8c6,0 20,-8 20,-8Z" />
      <LightPinkPath d="M739.186,110.22c0,0 -8.125,-13.928 -13.321,-16.928c-3.824,-2.207 -8.72,-0.895 -10.928,2.928c-2.208,3.824 -0.896,8.721 2.928,10.929c5.196,3 21.321,3.071 21.321,3.071Z" />
      <LightPinkPath d="M574.932,105.321c0,0 13.928,-8.125 16.928,-13.321c2.208,-3.824 0.896,-8.72 -2.928,-10.928c-3.824,-2.208 -8.721,-0.896 -10.928,2.928c-3,5.196 -3.072,21.321 -3.072,21.321Z" />
      <LightPinkPath d="M514.95,89c0,0 16.124,-0.072 21.32,-3.072c3.824,-2.207 5.136,-7.104 2.928,-10.928c-2.207,-3.824 -7.104,-5.136 -10.928,-2.928c-5.196,3 -13.32,16.928 -13.32,16.928Z" />
      <LightPinkPath d="M5.582,78c0,0 14,8 20,8c4.415,0 8,-3.585 8,-8c0,-4.415 -3.585,-8 -8,-8c-6,0 -20,8 -20,8Z" />
      <LightPinkPath d="M141.041,64c0,0 8.124,13.928 13.32,16.928c3.824,2.208 8.721,0.896 10.928,-2.928c2.208,-3.824 0.896,-8.721 -2.928,-10.928c-5.196,-3 -21.32,-3.072 -21.32,-3.072Z" />
      <LightPinkPath d="M551.534,53.586c0,0 0.071,16.124 3.071,21.32c2.208,3.824 7.105,5.136 10.929,2.928c3.823,-2.207 5.135,-7.104 2.928,-10.928c-3,-5.196 -16.928,-13.32 -16.928,-13.32Z" />
    </g>
    <g>
      <DarkPinkPath d="M660,28c0,0 -12,22.4 -12,32c0,6.623 5.377,12 12,12c6.623,0 12,-5.377 12,-12c0,-9.6 -12,-32 -12,-32Z" />
      <DarkPinkPath d="M686,34.967c0,0 -21.592,13.399 -26.392,21.712c-3.312,5.736 -1.344,13.081 4.392,16.393c5.736,3.311 13.081,1.343 16.392,-4.393c4.8,-8.313 5.608,-33.712 5.608,-33.712Z" />
      <DarkPinkPath d="M705.033,54c0,0 -25.399,0.808 -33.712,5.608c-5.736,3.311 -7.704,10.656 -4.393,16.392c3.312,5.736 10.657,7.704 16.393,4.392c8.313,-4.8 21.712,-26.392 21.712,-26.392Z" />
      <DarkPinkPath d="M712,80c0,0 -22.4,-12 -32,-12c-6.623,0 -12,5.377 -12,12c0,6.623 5.377,12 12,12c9.6,0 32,-12 32,-12Z" />
      <DarkPinkPath d="M705.033,106c0,0 -13.399,-21.592 -21.712,-26.392c-5.736,-3.312 -13.081,-1.344 -16.393,4.392c-3.311,5.736 -1.343,13.081 4.393,16.392c8.313,4.8 33.712,5.608 33.712,5.608Z" />
      <DarkPinkPath d="M686,125.033c0,0 -0.808,-25.399 -5.608,-33.712c-3.311,-5.736 -10.656,-7.704 -16.392,-4.393c-5.736,3.312 -7.704,10.657 -4.392,16.393c4.8,8.313 26.392,21.712 26.392,21.712Z" />
      <DarkPinkPath d="M660,132c0,0 12,-22.4 12,-32c0,-6.623 -5.377,-12 -12,-12c-6.623,0 -12,5.377 -12,12c0,9.6 12,32 12,32Z" />
      <DarkPinkPath d="M634,125.033c0,0 21.592,-13.399 26.392,-21.712c3.312,-5.736 1.344,-13.081 -4.392,-16.393c-5.736,-3.311 -13.081,-1.343 -16.392,4.393c-4.8,8.313 -5.608,33.712 -5.608,33.712Z" />
      <DarkPinkPath d="M614.967,106c0,0 25.399,-0.808 33.712,-5.608c5.736,-3.311 7.704,-10.656 4.393,-16.392c-3.312,-5.736 -10.657,-7.704 -16.393,-4.392c-8.313,4.8 -21.712,26.392 -21.712,26.392Z" />
      <DarkPinkPath d="M608,80c0,0 22.4,12 32,12c6.623,0 12,-5.377 12,-12c0,-6.623 -5.377,-12 -12,-12c-9.6,0 -32,12 -32,12Z" />
      <DarkPinkPath d="M614.967,54c0,0 13.399,21.592 21.712,26.392c5.736,3.312 13.081,1.344 16.393,-4.392c3.311,-5.736 1.343,-13.081 -4.393,-16.392c-8.313,-4.8 -33.712,-5.608 -33.712,-5.608Z" />
      <DarkPinkPath d="M634,34.967c0,0 0.808,25.399 5.608,33.712c3.311,5.736 10.656,7.704 16.392,4.393c5.736,-3.312 7.704,-10.657 4.392,-16.393c-4.8,-8.313 -26.392,-21.712 -26.392,-21.712Z" />
      <MediumPinkPath d="M671.388,37.499c0,0 -14.37,14.992 -16.389,22.526c-1.428,5.331 1.74,10.819 7.072,12.248c5.331,1.428 10.819,-1.74 12.247,-7.071c2.019,-7.535 -2.93,-27.703 -2.93,-27.703Z" />
      <MediumPinkPath d="M691.113,48.887c0,0 -19.941,5.799 -25.456,11.314c-3.903,3.903 -3.903,10.24 0,14.142c3.902,3.903 10.239,3.903 14.142,0c5.515,-5.515 11.314,-25.456 11.314,-25.456Z" />
      <MediumPinkPath d="M702.501,68.612c0,0 -20.168,-4.949 -27.703,-2.93c-5.331,1.428 -8.499,6.916 -7.071,12.247c1.429,5.332 6.917,8.5 12.248,7.072c7.534,-2.019 22.526,-16.389 22.526,-16.389Z" />
      <MediumPinkPath d="M702.501,91.388c0,0 -14.992,-14.37 -22.526,-16.389c-5.331,-1.428 -10.819,1.74 -12.248,7.072c-1.428,5.331 1.74,10.819 7.071,12.247c7.535,2.019 27.703,-2.93 27.703,-2.93Z" />
      <MediumPinkPath d="M691.113,111.113c0,0 -5.799,-19.941 -11.314,-25.456c-3.903,-3.903 -10.24,-3.903 -14.142,0c-3.903,3.902 -3.903,10.239 0,14.142c5.515,5.515 25.456,11.314 25.456,11.314Z" />
      <MediumPinkPath d="M671.388,122.501c0,0 4.949,-20.168 2.93,-27.703c-1.428,-5.331 -6.916,-8.499 -12.247,-7.071c-5.332,1.429 -8.5,6.917 -7.072,12.248c2.019,7.534 16.389,22.526 16.389,22.526Z" />
      <MediumPinkPath d="M648.612,122.501c0,0 14.37,-14.992 16.389,-22.526c1.428,-5.331 -1.74,-10.819 -7.072,-12.248c-5.331,-1.428 -10.819,1.74 -12.247,7.071c-2.019,7.535 2.93,27.703 2.93,27.703Z" />
      <MediumPinkPath d="M628.887,111.113c0,0 19.941,-5.799 25.456,-11.314c3.903,-3.903 3.903,-10.24 0,-14.142c-3.902,-3.903 -10.239,-3.903 -14.142,0c-5.515,5.515 -11.314,25.456 -11.314,25.456Z" />
      <MediumPinkPath d="M617.499,91.388c0,0 20.168,4.949 27.703,2.93c5.331,-1.428 8.499,-6.916 7.071,-12.247c-1.429,-5.332 -6.917,-8.5 -12.248,-7.072c-7.534,2.019 -22.526,16.389 -22.526,16.389Z" />
      <MediumPinkPath d="M617.499,68.612c0,0 14.992,14.37 22.526,16.389c5.331,1.428 10.819,-1.74 12.248,-7.072c1.428,-5.331 -1.74,-10.819 -7.071,-12.247c-7.535,-2.019 -27.703,2.93 -27.703,2.93Z" />
      <MediumPinkPath d="M628.887,48.887c0,0 5.799,19.941 11.314,25.456c3.903,3.903 10.24,3.903 14.142,0c3.903,-3.902 3.903,-10.239 0,-14.142c-5.515,-5.515 -25.456,-11.314 -25.456,-11.314Z" />
      <MediumPinkPath d="M648.612,37.499c0,0 -4.949,20.168 -2.93,27.703c1.428,5.331 6.916,8.499 12.247,7.071c5.332,-1.429 8.5,-6.917 7.072,-12.248c-2.019,-7.534 -16.389,-22.526 -16.389,-22.526Z" />
      <LightPinkPath d="M660,44c0,0 -8,14 -8,20c0,4.415 3.585,8 8,8c4.415,0 8,-3.585 8,-8c0,-6 -8,-20 -8,-20Z" />
      <LightPinkPath d="M678,48.823c0,0 -13.928,8.124 -16.928,13.321c-2.208,3.823 -0.896,8.72 2.928,10.928c3.824,2.207 8.721,0.895 10.928,-2.928c3,-5.197 3.072,-21.321 3.072,-21.321Z" />
      <LightPinkPath d="M691.177,62c0,0 -16.124,0.072 -21.321,3.072c-3.823,2.207 -5.135,7.104 -2.928,10.928c2.208,3.824 7.105,5.136 10.928,2.928c5.197,-3 13.321,-16.928 13.321,-16.928Z" />
      <LightPinkPath d="M696,80c0,0 -14,-8 -20,-8c-4.415,0 -8,3.585 -8,8c0,4.415 3.585,8 8,8c6,0 20,-8 20,-8Z" />
      <LightPinkPath d="M691.177,98c0,0 -8.124,-13.928 -13.321,-16.928c-3.823,-2.208 -8.72,-0.896 -10.928,2.928c-2.207,3.824 -0.895,8.721 2.928,10.928c5.197,3 21.321,3.072 21.321,3.072Z" />
      <LightPinkPath d="M678,111.177c0,0 -0.072,-16.124 -3.072,-21.321c-2.207,-3.823 -7.104,-5.135 -10.928,-2.928c-3.824,2.208 -5.136,7.105 -2.928,10.928c3,5.197 16.928,13.321 16.928,13.321Z" />
      <LightPinkPath d="M660,116c0,0 8,-14 8,-20c0,-4.415 -3.585,-8 -8,-8c-4.415,0 -8,3.585 -8,8c0,6 8,20 8,20Z" />
      <LightPinkPath d="M642,111.177c0,0 13.928,-8.124 16.928,-13.321c2.208,-3.823 0.896,-8.72 -2.928,-10.928c-3.824,-2.207 -8.721,-0.895 -10.928,2.928c-3,5.197 -3.072,21.321 -3.072,21.321Z" />
      <LightPinkPath d="M628.823,98c0,0 16.124,-0.072 21.321,-3.072c3.823,-2.207 5.135,-7.104 2.928,-10.928c-2.208,-3.824 -7.105,-5.136 -10.928,-2.928c-5.197,3 -13.321,16.928 -13.321,16.928Z" />
      <LightPinkPath d="M624,80c0,0 14,8 20,8c4.415,0 8,-3.585 8,-8c0,-4.415 -3.585,-8 -8,-8c-6,0 -20,8 -20,8Z" />
      <LightPinkPath d="M628.823,62c0,0 8.124,13.928 13.321,16.928c3.823,2.208 8.72,0.896 10.928,-2.928c2.207,-3.824 0.895,-8.721 -2.928,-10.928c-5.197,-3 -21.321,-3.072 -21.321,-3.072Z" />
      <LightPinkPath d="M642,48.823c0,0 0.072,16.124 3.072,21.321c2.207,3.823 7.104,5.135 10.928,2.928c3.824,-2.208 5.136,-7.105 2.928,-10.928c-3,-5.197 -16.928,-13.321 -16.928,-13.321Z" />
      <YellowPath d="M678.532,64.75c-0.985,-1.197 -2.085,-2.297 -3.282,-3.282l-3.173,2.091c-1.206,-0.886 -2.507,-1.637 -3.877,-2.239l0.225,-3.793c-1.453,-0.544 -2.954,-0.947 -4.485,-1.201l-1.701,3.397c-1.488,-0.164 -2.99,-0.164 -4.478,0l-1.701,-3.397c-1.531,0.254 -3.032,0.657 -4.485,1.201l0.225,3.793c-1.37,0.602 -2.671,1.353 -3.877,2.239l-3.173,-2.091c-1.197,0.985 -2.297,2.085 -3.282,3.282l2.091,3.173c-0.886,1.206 -1.637,2.507 -2.239,3.877l-3.793,-0.225c-0.544,1.453 -0.947,2.954 -1.201,4.485l3.397,1.701c-0.164,1.488 -0.164,2.99 0,4.478l-3.397,1.701c0.254,1.531 0.657,3.032 1.201,4.485l3.793,-0.225c0.602,1.37 1.353,2.671 2.239,3.877l-2.091,3.173c0.985,1.197 2.085,2.297 3.282,3.282l3.173,-2.091c1.206,0.886 2.507,1.637 3.877,2.239l-0.225,3.793c1.453,0.544 2.954,0.947 4.485,1.201l1.701,-3.397c1.488,0.164 2.99,0.164 4.478,0l1.701,3.397c1.531,-0.254 3.032,-0.657 4.485,-1.201l-0.225,-3.793c1.37,-0.602 2.671,-1.353 3.877,-2.239l3.173,2.091c1.197,-0.985 2.297,-2.085 3.282,-3.282l-2.091,-3.173c0.886,-1.206 1.637,-2.507 2.239,-3.877l3.793,0.225c0.544,-1.453 0.947,-2.954 1.201,-4.485l-3.397,-1.701c0.164,-1.488 0.164,-2.99 0,-4.478l3.397,-1.701c-0.254,-1.531 -0.657,-3.032 -1.201,-4.485l-3.793,0.225c-0.602,-1.37 -1.353,-2.671 -2.239,-3.877l2.091,-3.173Zm-15.138,11.856c1.873,1.873 1.873,4.915 0,6.788c-1.873,1.873 -4.915,1.873 -6.788,0c-1.873,-1.873 -1.873,-4.915 0,-6.788c1.873,-1.873 4.915,-1.873 6.788,0Z" />
    </g>
  </svg>;
}

const StatusGood: React.FunctionComponent = (props) => {
  return <svg
    key="StatusGood"
    viewBox="0 0 800 160"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2, overflow: "visible", width: "24em", maxWidth: "100%", display: "block", margin: "0 auto" }}>
    <StatusText x="253.068px" y="105.646px">Good!</StatusText>
    <g>
      <DarkPinkPath d="M660,28c0,0 -12,22.4 -12,32c0,6.623 5.377,12 12,12c6.623,0 12,-5.377 12,-12c0,-9.6 -12,-32 -12,-32Z" />
      <DarkPinkPath d="M686,34.967c0,0 -21.592,13.399 -26.392,21.712c-3.312,5.736 -1.344,13.081 4.392,16.393c5.736,3.311 13.081,1.343 16.392,-4.393c4.8,-8.313 5.608,-33.712 5.608,-33.712Z" />
      <DarkPinkPath d="M705.033,54c0,0 -25.399,0.808 -33.712,5.608c-5.736,3.311 -7.704,10.656 -4.393,16.392c3.312,5.736 10.657,7.704 16.393,4.392c8.313,-4.8 21.712,-26.392 21.712,-26.392Z" />
      <DarkPinkPath d="M712,80c0,0 -22.4,-12 -32,-12c-6.623,0 -12,5.377 -12,12c0,6.623 5.377,12 12,12c9.6,0 32,-12 32,-12Z" />
      <DarkPinkPath d="M705.033,106c0,0 -13.399,-21.592 -21.712,-26.392c-5.736,-3.312 -13.081,-1.344 -16.393,4.392c-3.311,5.736 -1.343,13.081 4.393,16.392c8.313,4.8 33.712,5.608 33.712,5.608Z" />
      <DarkPinkPath d="M686,125.033c0,0 -0.808,-25.399 -5.608,-33.712c-3.311,-5.736 -10.656,-7.704 -16.392,-4.393c-5.736,3.312 -7.704,10.657 -4.392,16.393c4.8,8.313 26.392,21.712 26.392,21.712Z" />
      <DarkPinkPath d="M660,132c0,0 12,-22.4 12,-32c0,-6.623 -5.377,-12 -12,-12c-6.623,0 -12,5.377 -12,12c0,9.6 12,32 12,32Z" />
      <DarkPinkPath d="M634,125.033c0,0 21.592,-13.399 26.392,-21.712c3.312,-5.736 1.344,-13.081 -4.392,-16.393c-5.736,-3.311 -13.081,-1.343 -16.392,4.393c-4.8,8.313 -5.608,33.712 -5.608,33.712Z" />
      <DarkPinkPath d="M614.967,106c0,0 25.399,-0.808 33.712,-5.608c5.736,-3.311 7.704,-10.656 4.393,-16.392c-3.312,-5.736 -10.657,-7.704 -16.393,-4.392c-8.313,4.8 -21.712,26.392 -21.712,26.392Z" />
      <DarkPinkPath d="M608,80c0,0 22.4,12 32,12c6.623,0 12,-5.377 12,-12c0,-6.623 -5.377,-12 -12,-12c-9.6,0 -32,12 -32,12Z" />
      <DarkPinkPath d="M614.967,54c0,0 13.399,21.592 21.712,26.392c5.736,3.312 13.081,1.344 16.393,-4.392c3.311,-5.736 1.343,-13.081 -4.393,-16.392c-8.313,-4.8 -33.712,-5.608 -33.712,-5.608Z" />
      <DarkPinkPath d="M634,34.967c0,0 0.808,25.399 5.608,33.712c3.311,5.736 10.656,7.704 16.392,4.393c5.736,-3.312 7.704,-10.657 4.392,-16.393c-4.8,-8.313 -26.392,-21.712 -26.392,-21.712Z" />
      <MediumPinkPath d="M671.388,37.499c0,0 -14.37,14.992 -16.389,22.526c-1.428,5.331 1.74,10.819 7.072,12.248c5.331,1.428 10.819,-1.74 12.247,-7.071c2.019,-7.535 -2.93,-27.703 -2.93,-27.703Z" />
      <MediumPinkPath d="M691.113,48.887c0,0 -19.941,5.799 -25.456,11.314c-3.903,3.903 -3.903,10.24 0,14.142c3.902,3.903 10.239,3.903 14.142,0c5.515,-5.515 11.314,-25.456 11.314,-25.456Z" />
      <MediumPinkPath d="M702.501,68.612c0,0 -20.168,-4.949 -27.703,-2.93c-5.331,1.428 -8.499,6.916 -7.071,12.247c1.429,5.332 6.917,8.5 12.248,7.072c7.534,-2.019 22.526,-16.389 22.526,-16.389Z" />
      <MediumPinkPath d="M702.501,91.388c0,0 -14.992,-14.37 -22.526,-16.389c-5.331,-1.428 -10.819,1.74 -12.248,7.072c-1.428,5.331 1.74,10.819 7.071,12.247c7.535,2.019 27.703,-2.93 27.703,-2.93Z" />
      <MediumPinkPath d="M691.113,111.113c0,0 -5.799,-19.941 -11.314,-25.456c-3.903,-3.903 -10.24,-3.903 -14.142,0c-3.903,3.902 -3.903,10.239 0,14.142c5.515,5.515 25.456,11.314 25.456,11.314Z" />
      <MediumPinkPath d="M671.388,122.501c0,0 4.949,-20.168 2.93,-27.703c-1.428,-5.331 -6.916,-8.499 -12.247,-7.071c-5.332,1.429 -8.5,6.917 -7.072,12.248c2.019,7.534 16.389,22.526 16.389,22.526Z" />
      <MediumPinkPath d="M648.612,122.501c0,0 14.37,-14.992 16.389,-22.526c1.428,-5.331 -1.74,-10.819 -7.072,-12.248c-5.331,-1.428 -10.819,1.74 -12.247,7.071c-2.019,7.535 2.93,27.703 2.93,27.703Z" />
      <MediumPinkPath d="M628.887,111.113c0,0 19.941,-5.799 25.456,-11.314c3.903,-3.903 3.903,-10.24 0,-14.142c-3.902,-3.903 -10.239,-3.903 -14.142,0c-5.515,5.515 -11.314,25.456 -11.314,25.456Z" />
      <MediumPinkPath d="M617.499,91.388c0,0 20.168,4.949 27.703,2.93c5.331,-1.428 8.499,-6.916 7.071,-12.247c-1.429,-5.332 -6.917,-8.5 -12.248,-7.072c-7.534,2.019 -22.526,16.389 -22.526,16.389Z" />
      <MediumPinkPath d="M617.499,68.612c0,0 14.992,14.37 22.526,16.389c5.331,1.428 10.819,-1.74 12.248,-7.072c1.428,-5.331 -1.74,-10.819 -7.071,-12.247c-7.535,-2.019 -27.703,2.93 -27.703,2.93Z" />
      <MediumPinkPath d="M628.887,48.887c0,0 5.799,19.941 11.314,25.456c3.903,3.903 10.24,3.903 14.142,0c3.903,-3.902 3.903,-10.239 0,-14.142c-5.515,-5.515 -25.456,-11.314 -25.456,-11.314Z" />
      <MediumPinkPath d="M648.612,37.499c0,0 -4.949,20.168 -2.93,27.703c1.428,5.331 6.916,8.499 12.247,7.071c5.332,-1.429 8.5,-6.917 7.072,-12.248c-2.019,-7.534 -16.389,-22.526 -16.389,-22.526Z" />
      <LightPinkPath d="M660,44c0,0 -8,14 -8,20c0,4.415 3.585,8 8,8c4.415,0 8,-3.585 8,-8c0,-6 -8,-20 -8,-20Z" />
      <LightPinkPath d="M678,48.823c0,0 -13.928,8.124 -16.928,13.321c-2.208,3.823 -0.896,8.72 2.928,10.928c3.824,2.207 8.721,0.895 10.928,-2.928c3,-5.197 3.072,-21.321 3.072,-21.321Z" />
      <LightPinkPath d="M691.177,62c0,0 -16.124,0.072 -21.321,3.072c-3.823,2.207 -5.135,7.104 -2.928,10.928c2.208,3.824 7.105,5.136 10.928,2.928c5.197,-3 13.321,-16.928 13.321,-16.928Z" />
      <LightPinkPath d="M696,80c0,0 -14,-8 -20,-8c-4.415,0 -8,3.585 -8,8c0,4.415 3.585,8 8,8c6,0 20,-8 20,-8Z" />
      <LightPinkPath d="M691.177,98c0,0 -8.124,-13.928 -13.321,-16.928c-3.823,-2.208 -8.72,-0.896 -10.928,2.928c-2.207,3.824 -0.895,8.721 2.928,10.928c5.197,3 21.321,3.072 21.321,3.072Z" />
      <LightPinkPath d="M678,111.177c0,0 -0.072,-16.124 -3.072,-21.321c-2.207,-3.823 -7.104,-5.135 -10.928,-2.928c-3.824,2.208 -5.136,7.105 -2.928,10.928c3,5.197 16.928,13.321 16.928,13.321Z" />
      <LightPinkPath d="M660,116c0,0 8,-14 8,-20c0,-4.415 -3.585,-8 -8,-8c-4.415,0 -8,3.585 -8,8c0,6 8,20 8,20Z" />
      <LightPinkPath d="M642,111.177c0,0 13.928,-8.124 16.928,-13.321c2.208,-3.823 0.896,-8.72 -2.928,-10.928c-3.824,-2.207 -8.721,-0.895 -10.928,2.928c-3,5.197 -3.072,21.321 -3.072,21.321Z" />
      <LightPinkPath d="M628.823,98c0,0 16.124,-0.072 21.321,-3.072c3.823,-2.207 5.135,-7.104 2.928,-10.928c-2.208,-3.824 -7.105,-5.136 -10.928,-2.928c-5.197,3 -13.321,16.928 -13.321,16.928Z" />
      <LightPinkPath d="M624,80c0,0 14,8 20,8c4.415,0 8,-3.585 8,-8c0,-4.415 -3.585,-8 -8,-8c-6,0 -20,8 -20,8Z" />
      <LightPinkPath d="M628.823,62c0,0 8.124,13.928 13.321,16.928c3.823,2.208 8.72,0.896 10.928,-2.928c2.207,-3.824 0.895,-8.721 -2.928,-10.928c-5.197,-3 -21.321,-3.072 -21.321,-3.072Z" />
      <LightPinkPath d="M642,48.823c0,0 0.072,16.124 3.072,21.321c2.207,3.823 7.104,5.135 10.928,2.928c3.824,-2.208 5.136,-7.105 2.928,-10.928c-3,-5.197 -16.928,-13.321 -16.928,-13.321Z" />
      <YellowPath d="M678.532,64.75c-0.985,-1.197 -2.085,-2.297 -3.282,-3.282l-3.173,2.091c-1.206,-0.886 -2.507,-1.637 -3.877,-2.239l0.225,-3.793c-1.453,-0.544 -2.954,-0.947 -4.485,-1.201l-1.701,3.397c-1.488,-0.164 -2.99,-0.164 -4.478,0l-1.701,-3.397c-1.531,0.254 -3.032,0.657 -4.485,1.201l0.225,3.793c-1.37,0.602 -2.671,1.353 -3.877,2.239l-3.173,-2.091c-1.197,0.985 -2.297,2.085 -3.282,3.282l2.091,3.173c-0.886,1.206 -1.637,2.507 -2.239,3.877l-3.793,-0.225c-0.544,1.453 -0.947,2.954 -1.201,4.485l3.397,1.701c-0.164,1.488 -0.164,2.99 0,4.478l-3.397,1.701c0.254,1.531 0.657,3.032 1.201,4.485l3.793,-0.225c0.602,1.37 1.353,2.671 2.239,3.877l-2.091,3.173c0.985,1.197 2.085,2.297 3.282,3.282l3.173,-2.091c1.206,0.886 2.507,1.637 3.877,2.239l-0.225,3.793c1.453,0.544 2.954,0.947 4.485,1.201l1.701,-3.397c1.488,0.164 2.99,0.164 4.478,0l1.701,3.397c1.531,-0.254 3.032,-0.657 4.485,-1.201l-0.225,-3.793c1.37,-0.602 2.671,-1.353 3.877,-2.239l3.173,2.091c1.197,-0.985 2.297,-2.085 3.282,-3.282l-2.091,-3.173c0.886,-1.206 1.637,-2.507 2.239,-3.877l3.793,0.225c0.544,-1.453 0.947,-2.954 1.201,-4.485l-3.397,-1.701c0.164,-1.488 0.164,-2.99 0,-4.478l3.397,-1.701c-0.254,-1.531 -0.657,-3.032 -1.201,-4.485l-3.793,0.225c-0.602,-1.37 -1.353,-2.671 -2.239,-3.877l2.091,-3.173Zm-15.138,11.856c1.873,1.873 1.873,4.915 0,6.788c-1.873,1.873 -4.915,1.873 -6.788,0c-1.873,-1.873 -1.873,-4.915 0,-6.788c1.873,-1.873 4.915,-1.873 6.788,0Z" />
    </g>
    <g>
      <DarkGreenPath d="M112.937,84c0,0 -14.369,14.992 -16.388,22.526c-1.429,5.331 1.74,10.819 7.071,12.247c5.331,1.429 10.819,-1.74 12.247,-7.071c2.019,-7.534 -2.93,-27.702 -2.93,-27.702Z" />
      <DarkGreenPath d="M774.233,105.429c0,0 -19.94,5.798 -25.456,11.314c-3.902,3.902 -3.902,10.239 0,14.142c3.903,3.902 10.24,3.902 14.143,0c5.515,-5.516 11.313,-25.456 11.313,-25.456Z" />
      <DarkGreenPath d="M600.824,90.414c0,0 -20.168,-4.949 -27.703,-2.93c-5.331,1.429 -8.499,6.916 -7.071,12.247c1.429,5.332 6.917,8.5 12.248,7.072c7.534,-2.019 22.526,-16.389 22.526,-16.389Z" />
      <DarkGreenPath d="M152.32,95.077c0,0 14.992,14.37 22.526,16.389c5.331,1.428 10.819,-1.74 12.248,-7.071c1.428,-5.331 -1.74,-10.819 -7.071,-12.248c-7.535,-2.018 -27.703,2.93 -27.703,2.93Z" />
      <DarkGreenPath d="M32.903,102.921c0,0 5.798,19.94 11.313,25.455c3.903,3.903 10.24,3.903 14.142,0c3.903,-3.902 3.903,-10.239 0,-14.142c-5.515,-5.515 -25.455,-11.313 -25.455,-11.313Z" />
      <DarkGreenPath d="M530.875,65.442c0,0 -4.948,20.168 -2.929,27.702c1.428,5.331 6.916,8.5 12.247,7.071c5.331,-1.428 8.499,-6.916 7.071,-12.247c-2.019,-7.534 -16.389,-22.526 -16.389,-22.526Z" />
      <LightGreenPath d="M146.143,80c0,0 -8,14 -8,20c0,4.415 3.585,8 8,8c4.415,0 8,-3.585 8,-8c0,-6 -8,-20 -8,-20Z" />
      <LightGreenPath d="M565.721,71.34c0,0 -13.928,8.124 -16.928,13.32c-2.208,3.824 -0.896,8.721 2.928,10.928c3.824,2.208 8.721,0.896 10.928,-2.928c3,-5.196 3.072,-21.32 3.072,-21.32Z" />
      <LightGreenPath d="M522.906,77c0,0 -16.124,0.072 -21.32,3.072c-3.824,2.207 -5.136,7.104 -2.928,10.928c2.207,3.824 7.104,5.136 10.928,2.928c5.196,-3 13.32,-16.928 13.32,-16.928Z" />
      <LightGreenPath d="M742.459,109.822c0,0 -14,-8 -20,-8c-4.415,0 -8,3.585 -8,8c0,4.415 3.585,8 8,8c6,0 20,-8 20,-8Z" />
      <LightGreenPath d="M448.746,88c0,0 14,8 20,8c4.416,0 8,-3.585 8,-8c0,-4.415 -3.584,-8 -8,-8c-6,0 -20,8 -20,8Z" />
      <LightGreenPath d="M66.008,106.559c0,0 8.124,13.928 13.321,16.928c3.823,2.208 8.72,0.895 10.928,-2.928c2.207,-3.824 0.895,-8.721 -2.928,-10.929c-5.197,-3 -21.321,-3.071 -21.321,-3.071Z" />
      <LightGreenPath d="M208.11,84c0,0 0.072,16.124 3.072,21.321c2.208,3.823 7.104,5.135 10.928,2.928c3.824,-2.208 5.136,-7.105 2.928,-10.928c-3,-5.197 -16.928,-13.321 -16.928,-13.321Z" />
    </g>
  </svg>;
}

const StatusRequiredWords: React.FunctionComponent = (props) => {
  return <svg
    key="StatusRequiredWords"
    viewBox="0 0 800 160"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2, overflow: "visible", width: "24em", maxWidth: "100%", display: "block", margin: "0 auto" }}>
    <StatusText x="96.676px" y="105.646px">Words Missing!</StatusText>
    <g>
      <DarkPinkPath d="M686,34.967c0,0 -21.592,13.399 -26.392,21.712c-3.312,5.736 -1.344,13.081 4.392,16.393c5.736,3.311 13.081,1.343 16.392,-4.393c4.8,-8.313 5.608,-33.712 5.608,-33.712Z" />
      <DarkPinkPath d="M705.033,54c0,0 -25.399,0.808 -33.712,5.608c-5.736,3.311 -7.704,10.656 -4.393,16.392c3.312,5.736 10.657,7.704 16.393,4.392c8.313,-4.8 21.712,-26.392 21.712,-26.392Z" />
      <DarkPinkPath d="M705.033,106c0,0 -13.399,-21.592 -21.712,-26.392c-5.736,-3.312 -13.081,-1.344 -16.393,4.392c-3.311,5.736 -1.343,13.081 4.393,16.392c8.313,4.8 33.712,5.608 33.712,5.608Z" />
      <DarkPinkPath d="M660,132c0,0 12,-22.4 12,-32c0,-6.623 -5.377,-12 -12,-12c-6.623,0 -12,5.377 -12,12c0,9.6 12,32 12,32Z" />
      <DarkPinkPath d="M634,125.033c0,0 21.592,-13.399 26.392,-21.712c3.312,-5.736 1.344,-13.081 -4.392,-16.393c-5.736,-3.311 -13.081,-1.343 -16.392,4.393c-4.8,8.313 -5.608,33.712 -5.608,33.712Z" />
      <DarkPinkPath d="M608,80c0,0 22.4,12 32,12c6.623,0 12,-5.377 12,-12c0,-6.623 -5.377,-12 -12,-12c-9.6,0 -32,12 -32,12Z" />
      <DarkPinkPath d="M614.967,54c0,0 13.399,21.592 21.712,26.392c5.736,3.312 13.081,1.344 16.393,-4.392c3.311,-5.736 1.343,-13.081 -4.393,-16.392c-8.313,-4.8 -33.712,-5.608 -33.712,-5.608Z" />
      <DarkPinkPath d="M634,34.967c0,0 0.808,25.399 5.608,33.712c3.311,5.736 10.656,7.704 16.392,4.393c5.736,-3.312 7.704,-10.657 4.392,-16.393c-4.8,-8.313 -26.392,-21.712 -26.392,-21.712Z" />
      <MediumPinkPath d="M671.388,37.499c0,0 -14.37,14.992 -16.389,22.526c-1.428,5.331 1.74,10.819 7.072,12.248c5.331,1.428 10.819,-1.74 12.247,-7.071c2.019,-7.535 -2.93,-27.703 -2.93,-27.703Z" />
      <MediumPinkPath d="M702.501,68.612c0,0 -20.168,-4.949 -27.703,-2.93c-5.331,1.428 -8.499,6.916 -7.071,12.247c1.429,5.332 6.917,8.5 12.248,7.072c7.534,-2.019 22.526,-16.389 22.526,-16.389Z" />
      <MediumPinkPath d="M702.501,91.388c0,0 -14.992,-14.37 -22.526,-16.389c-5.331,-1.428 -10.819,1.74 -12.248,7.072c-1.428,5.331 1.74,10.819 7.071,12.247c7.535,2.019 27.703,-2.93 27.703,-2.93Z" />
      <MediumPinkPath d="M691.113,111.113c0,0 -5.799,-19.941 -11.314,-25.456c-3.903,-3.903 -10.24,-3.903 -14.142,0c-3.903,3.902 -3.903,10.239 0,14.142c5.515,5.515 25.456,11.314 25.456,11.314Z" />
      <MediumPinkPath d="M648.612,122.501c0,0 14.37,-14.992 16.389,-22.526c1.428,-5.331 -1.74,-10.819 -7.072,-12.248c-5.331,-1.428 -10.819,1.74 -12.247,7.071c-2.019,7.535 2.93,27.703 2.93,27.703Z" />
      <MediumPinkPath d="M617.499,91.388c0,0 20.168,4.949 27.703,2.93c5.331,-1.428 8.499,-6.916 7.071,-12.247c-1.429,-5.332 -6.917,-8.5 -12.248,-7.072c-7.534,2.019 -22.526,16.389 -22.526,16.389Z" />
      <MediumPinkPath d="M628.887,48.887c0,0 5.799,19.941 11.314,25.456c3.903,3.903 10.24,3.903 14.142,0c3.903,-3.902 3.903,-10.239 0,-14.142c-5.515,-5.515 -25.456,-11.314 -25.456,-11.314Z" />
      <LightPinkPath d="M660,44c0,0 -8,14 -8,20c0,4.415 3.585,8 8,8c4.415,0 8,-3.585 8,-8c0,-6 -8,-20 -8,-20Z" />
      <LightPinkPath d="M678,48.823c0,0 -13.928,8.124 -16.928,13.321c-2.208,3.823 -0.896,8.72 2.928,10.928c3.824,2.207 8.721,0.895 10.928,-2.928c3,-5.197 3.072,-21.321 3.072,-21.321Z" />
      <LightPinkPath d="M696,80c0,0 -14,-8 -20,-8c-4.415,0 -8,3.585 -8,8c0,4.415 3.585,8 8,8c6,0 20,-8 20,-8Z" />
      <LightPinkPath d="M678,111.177c0,0 -0.072,-16.124 -3.072,-21.321c-2.207,-3.823 -7.104,-5.135 -10.928,-2.928c-3.824,2.208 -5.136,7.105 -2.928,10.928c3,5.197 16.928,13.321 16.928,13.321Z" />
      <LightPinkPath d="M660,116c0,0 8,-14 8,-20c0,-4.415 -3.585,-8 -8,-8c-4.415,0 -8,3.585 -8,8c0,6 8,20 8,20Z" />
      <LightPinkPath d="M628.823,98c0,0 16.124,-0.072 21.321,-3.072c3.823,-2.207 5.135,-7.104 2.928,-10.928c-2.208,-3.824 -7.105,-5.136 -10.928,-2.928c-5.197,3 -13.321,16.928 -13.321,16.928Z" />
      <LightPinkPath d="M628.823,62c0,0 8.124,13.928 13.321,16.928c3.823,2.208 8.72,0.896 10.928,-2.928c2.207,-3.824 0.895,-8.721 -2.928,-10.928c-5.197,-3 -21.321,-3.072 -21.321,-3.072Z" />
      <YellowPath d="M678.532,64.75c-0.985,-1.197 -2.085,-2.297 -3.282,-3.282l-3.173,2.091c-1.206,-0.886 -2.507,-1.637 -3.877,-2.239l0.225,-3.793c-1.453,-0.544 -2.954,-0.947 -4.485,-1.201l-1.701,3.397c-1.488,-0.164 -2.99,-0.164 -4.478,0l-1.701,-3.397c-1.531,0.254 -3.032,0.657 -4.485,1.201l0.225,3.793c-1.37,0.602 -2.671,1.353 -3.877,2.239l-3.173,-2.091c-1.197,0.985 -2.297,2.085 -3.282,3.282l2.091,3.173c-0.886,1.206 -1.637,2.507 -2.239,3.877l-3.793,-0.225c-0.544,1.453 -0.947,2.954 -1.201,4.485l3.397,1.701c-0.164,1.488 -0.164,2.99 0,4.478l-3.397,1.701c0.254,1.531 0.657,3.032 1.201,4.485l3.793,-0.225c0.602,1.37 1.353,2.671 2.239,3.877l-2.091,3.173c0.985,1.197 2.085,2.297 3.282,3.282l3.173,-2.091c1.206,0.886 2.507,1.637 3.877,2.239l-0.225,3.793c1.453,0.544 2.954,0.947 4.485,1.201l1.701,-3.397c1.488,0.164 2.99,0.164 4.478,0l1.701,3.397c1.531,-0.254 3.032,-0.657 4.485,-1.201l-0.225,-3.793c1.37,-0.602 2.671,-1.353 3.877,-2.239l3.173,2.091c1.197,-0.985 2.297,-2.085 3.282,-3.282l-2.091,-3.173c0.886,-1.206 1.637,-2.507 2.239,-3.877l3.793,0.225c0.544,-1.453 0.947,-2.954 1.201,-4.485l-3.397,-1.701c0.164,-1.488 0.164,-2.99 0,-4.478l3.397,-1.701c-0.254,-1.531 -0.657,-3.032 -1.201,-4.485l-3.793,0.225c-0.602,-1.37 -1.353,-2.671 -2.239,-3.877l2.091,-3.173Zm-15.138,11.856c1.873,1.873 1.873,4.915 0,6.788c-1.873,1.873 -4.915,1.873 -6.788,0c-1.873,-1.873 -1.873,-4.915 0,-6.788c1.873,-1.873 4.915,-1.873 6.788,0Z" />
    </g>
    <g>
      <DarkGreenPath d="M774.233,105.429c0,0 -19.94,5.798 -25.456,11.314c-3.902,3.902 -3.902,10.239 0,14.142c3.903,3.902 10.24,3.902 14.143,0c5.515,-5.516 11.313,-25.456 11.313,-25.456Z" />
      <DarkGreenPath d="M32.903,102.921c0,0 5.798,19.94 11.313,25.455c3.903,3.903 10.24,3.903 14.142,0c3.903,-3.902 3.903,-10.239 0,-14.142c-5.515,-5.515 -25.455,-11.313 -25.455,-11.313Z" />
      <LightGreenPath d="M742.459,109.822c0,0 -14,-8 -20,-8c-4.415,0 -8,3.585 -8,8c0,4.415 3.585,8 8,8c6,0 20,-8 20,-8Z" />
      <LightGreenPath d="M66.008,106.559c0,0 8.124,13.928 13.321,16.928c3.823,2.208 8.72,0.895 10.928,-2.928c2.207,-3.824 0.895,-8.721 -2.928,-10.929c-5.197,-3 -21.321,-3.071 -21.321,-3.071Z" />
    </g>
  </svg>;
}

const LightGreenPath = styled.path`
  fill: var(--accent-pale);
`;

const DarkGreenPath = styled.path`
  fill: var(--accent);
`;

const YellowPath = styled.path`
  @media (prefers-color-scheme: dark) {
    fill: #f90;
  }

  @media (prefers-color-scheme: light) {
    fill: #ff4;
  }
`;

const LightPinkPath = styled.path`
  @media (prefers-color-scheme: dark) {
    fill: #4bf;
  }

  @media (prefers-color-scheme: light) {
    fill: #825;
  }
`;

const MediumPinkPath = styled.path`
  @media (prefers-color-scheme: dark) {
    fill: #07a;
  }

  @media (prefers-color-scheme: light) {
    fill: #d6a;
  }
`;

const DarkPinkPath = styled.path`
  @media (prefers-color-scheme: dark) {
    fill: #037;
  }

  @media (prefers-color-scheme: light) {
    fill: #f9d;
  }
`;

const StatusText = styled.text`
  font-family: DustismoRoman-BoldItalic, "Dustismo Roman";
  font-style: italic;
  font-size: 72px;
  font-weight: 700;

  @media (prefers-color-scheme: dark) {
    fill: #4bf;
  }

  @media (prefers-color-scheme: light) {
    fill: #d6a;
  }
`;