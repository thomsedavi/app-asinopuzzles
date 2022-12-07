import React from 'react';
import styled from 'styled-components';

interface IconProps {
  type?: 'switch' | 'pencil' | 'up' | 'down' | 'create';
  fillPrimary?: '--background-color' | '--color' | '--accent';
  fillSecondary?: '--background-color' | '--color' | '--accent';
}

export const Icon = (props: IconProps): JSX.Element => {
  return <Svg viewBox="0 0 100 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve" >
    {props.type === 'switch' && <>
      <PathPrimary fill={props.fillPrimary ?? '--color'} d="M20,20L50,20L80,50L60,50L50,40L50,30L20,30Z" />
      <PathPrimary fill={props.fillPrimary ?? '--color'} d="M80,80L50,80L20,50L40,50L50,60L50,70L80,70Z" />
    </>}
    {props.type === 'pencil' && <>
      <PathPrimary fill={props.fillPrimary ?? '--color'} d="M55,70L80,70L80,80L30,80Z" />
      <PathPrimary fill={props.fillPrimary ?? '--color'} d="M70,20L80,30L45,65L35,55Z" />
      <PathSecondary fill={props.fillSecondary ?? '--color'} d="M30,60L40,70L20,80Z" />
    </>}
    {props.type === 'up' && <>
      <PathPrimary fill={props.fillPrimary ?? '--color'} d="M50,35L80,65L20,65Z" />
    </>}
    {props.type === 'down' && <>
      <PathPrimary fill={props.fillPrimary ?? '--color'} d="M20,35L80,35L50,65Z" />
    </>}
    {props.type === 'create' && <>
      <PathPrimary fill={props.fillPrimary ?? '--color'} d="M45,20L55,20L55,45L80,45L80,55L55,55L55,80L45,80L45,55L20,55L20,45L45,45Z" />
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
  fill: '--background-color' | '--color' | '--accent';
}

const PathPrimary = styled.path<PathProps>`
  fill: var(${props => props.fill});
`;

const PathSecondary = styled.path<PathProps>`
  fill: var(${props => props.fill});
`;
