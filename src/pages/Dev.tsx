import React from 'react';
import { Button, ButtonContainer, Paragraph } from '../common/styled';

interface ProfileProps {
  onClickCreateMockProfile: () => void;
}

const Dev = (props: ProfileProps) => {
  return <>
    <Paragraph>I can't be bothered setting up authentication for my local environment right now. Click the button to make the page think someone is logged in.</Paragraph>
    <ButtonContainer>
      <Button onClick={props.onClickCreateMockProfile}>the button</Button>
    </ButtonContainer>
  </>;
};

export default Dev;
