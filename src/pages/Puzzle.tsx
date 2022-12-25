import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditToggleButton } from '../common/components';
import { useState } from '../common/saveState';
import { Container, Flash, Heading1, Overlay, Placeholder } from '../common/styled';
import { User, AsinoPuzzle } from '../interfaces';
import Layout from './Layout';

interface PuzzleProps {
  user?: User | null;
  mode: 'create' | 'read' | 'update';
}

const Puzzle = (props: PuzzleProps): JSX.Element => {
  const defaultGame: AsinoPuzzle | undefined = props.user !== undefined && props.user !== null ? {
    userId: props.user.id,
    userName: props.user.name,
    title: 'Lexicologer Game'
  } : undefined;

  const [ mode, setMode ] = React.useState<'create' | 'read' | 'update'>(props.mode);
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ asinoPuzzle ] = React.useState<AsinoPuzzle | undefined>(
    useLoaderData() as AsinoPuzzle ??
    (props.mode === 'create' && defaultGame) ??
    undefined
  );
  //const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  //const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();
  const state = useState();

  const onClickLoader = () => {
    setIsLoading(true);
  }

  if (asinoPuzzle === undefined) {
    return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Heading1>Please log in to create a Lexicologer game</Heading1>
    </>
  } else if (mode === 'update' && (props.user === undefined || props.user === null || props.user?.id !== asinoPuzzle.userId)) {
    return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Heading1>401</Heading1>
    </>
  }

  //const isEditable = mode !== 'read' && props.user !== undefined && props.user !== null && asinoPuzzle.userId === props.user?.id;

  const toggleButtonMode: 'create' | 'read' | 'update' = mode === 'read' ? (asinoPuzzle.id === undefined ? 'create' : 'update') : 'read';

  return <>
    <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      {(mode === 'create' || props.user?.id === asinoPuzzle.userId) && <EditToggleButton mode={mode} onClick={() => setMode(toggleButtonMode)} />}

      {state.flash.state !== 'hide' && <Flash color={state.flash.color} isFading={state.flash.state === 'fade'}>{state.flash.message}</Flash>}
    </Container>
    {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
  </>;
}

export default Puzzle;
