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
      <Path fill={props.fillPrimary ?? '--color'} d="M10,40L10,30C10,19,19,10,30,10L70,10C81,10,90,19,90,30L90,40L100,40L80,60L60,40L70,40L70,30L30,30L30,40Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M90,60L90,70C90,81,81,90,70,90L30,90C19,90,10,79,10,70L10,60L0,60L20,40L40,60L30,60L30,70L70,70L70,60Z" />
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
      <Path fill={props.fillPrimary ?? '--color'} d="M40,0L60,0L60,40L100,40L100,60L60,60L60,100L40,100L40,60L0,60L0,40L40,40Z" />
    </>}
    {props.type === 'delete' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M0,40L20,40L30,100L20,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M30,40L70,40L60,100L40,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M80,40L100,40L80,100L70,100Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M30,0L70,0L80,20L100,20L100,30L0,30L0,20L20,20Z" />
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
