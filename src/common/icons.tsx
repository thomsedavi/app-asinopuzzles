import React from 'react';
import styled from 'styled-components';

interface IconProps {
  type: 'switch' | 'pencil';
  fill: '--background-color';
}

export const Icon = (props: IconProps): JSX.Element => {
  return <Svg viewBox="0 0 100 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve" >
    {props.type === 'switch' && <>
      <Path fill={props.fill} d="M20,20L50,20L80,50L60,50L50,40L50,30L20,30Z" />
      <Path fill={props.fill} d="M80,80L50,80L20,50L40,50L50,60L50,70L80,70Z" />
    </>}
    {props.type === 'pencil' && <>
      <Path fill={props.fill} d="M20,20L50,20L80,50L60,50L50,40L50,30L20,30Z" />
      <Path fill={props.fill} d="M80,80L50,80L20,50L40,50L50,60L50,70L80,70Z" />
    </>}
  </Svg>;
}

const Svg = styled.svg`
  overflow: visible;
  height: 1em;
  width: 1em;
  position: relative;
  top: 0.1em;
`;

interface PathProps {
  fill: '--background-color';
}

const Path = styled.path<PathProps>`
  fill: var(${props => props.fill});
`;
