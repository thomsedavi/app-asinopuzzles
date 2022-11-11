import React from 'react';

interface ProfileProps {
  onClickCreateMockProfile: () => void;
}

const Dev = (props: ProfileProps) => {
  return <>
    <p>I can't be bothered setting up authentication for my local environment right now. Click the button to make the page think someone is logged in.</p>
    <button onClick={props.onClickCreateMockProfile}>the button</button>
  </>;
};

export default Dev;
