import React from 'react';
import styled from 'styled-components';

export const Icon = (): JSX.Element => {
  return <svg viewBox="0 0 100 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve"
              style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2, overflow: 'visible', maxHeight: '1em', maxWidth: '1em' }}>
    <PathIcon d="M-100,0Q-70,0,-40,-40" fill="none" stroke="#95f" stroke-width="20" />
    <PathIcon d="M100,0Q70,0,40,-40" fill="none" stroke="#95f" stroke-width="20" />
    <PathIcon d="M0,-30Q40,-30,40,-40C15,-75,10,-100,0,-100S-15,-75,-40,-40Q-40,-30,0,-30Z" fill="none" stroke="#aab" stroke-width="20" />
    <PathIcon d="M-50,25Q-30,0,-25,-15" fill="none" stroke="#95f" stroke-width="20" />
    <PathIcon d="M50,25Q30,0,25,-15" fill="none" stroke="#95f" stroke-width="20" />
  </svg>;
}

const PathIcon = styled.text`
  fill: var(--opposite-pale);
`;
