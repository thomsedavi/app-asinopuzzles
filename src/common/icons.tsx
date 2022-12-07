import React from 'react';
import styled from 'styled-components';

interface IconProps {
  title: string;
  type?: 'switch' | 'pencil' | 'up' | 'down' | 'create' | 'delete';
  fillPrimary?: '--background-color' | '--color' | '--accent' | '--opposite';
  fillSecondary?: '--background-color' | '--color' | '--accent' | '--opposite';
}

export const Icon = (props: IconProps): JSX.Element => {
  return <span title={props.title}><Svg viewBox="0 0 100 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve" >
    {props.type === 'switch' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M20,20L50,20L80,50L60,50L50,40L50,30L20,30Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M80,80L50,80L20,50L40,50L50,60L50,70L80,70Z" />
    </>}
    {props.type === 'pencil' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M35,90L100,90L100,100L10,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M80,10L90,20L30,80L20,70Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M15,75L25,85L0,100Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M90,0L100,10L95,15L85,5Z" />
    </>}
    {props.type === 'up' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M50,35L80,65L20,65Z" />
    </>}
    {props.type === 'down' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M20,35L80,35L50,65Z" />
    </>}
    {props.type === 'create' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M45,20L55,20L55,45L80,45L80,55L55,55L55,80L45,80L45,55L20,55L20,45L45,45Z" />
    </>}
    {props.type === 'delete' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M0,40L20,40L30,100L20,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M30,40L70,40L60,100L40,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M80,40L100,40L80,100L70,100Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M30,0L70,0L30,80L100,20L100,30L0,30L0,20L20,20Z" />
    </>}
  </Svg></span>;
}

const Svg = styled.svg`
  overflow: visible;
  height: 1em;
  width: 1em;
  position: relative;
  top: 0.1em;
`;

interface PathProps {
  fill: '--background-color' | '--color' | '--accent' | '--opposite';
}

const Path = styled.path<PathProps>`
  fill: var(${props => props.fill});
`;
