import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { EditableElementHeading1 } from '../common/components';
import { Container } from '../common/styled';
import { tidyString } from '../common/utils';
import { LexicologerGame } from '../interfaces';
import Layout from './Layout';

interface LexicologerProps {
  userId?: string | null;
}

const Lexicologer = (props: LexicologerProps): JSX.Element => {
  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isWorking ] = React.useState<boolean>(false);
  const [ errorMessage ] = React.useState<string | undefined>();

  const [ lexicologerGame, setLexicologerGame ] = React.useState<LexicologerGame>(useLoaderData() as LexicologerGame ?? { userId: props.userId ?? undefined, title: 'Lexicologer Game' });

  console.log('game', lexicologerGame);

  const saveName = () => {
    setLexicologerGame({ ...lexicologerGame, title: tidyString(inputValue) });
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
    </Container>
  </>;
}

export default Lexicologer;
