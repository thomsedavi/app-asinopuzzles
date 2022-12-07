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
      <Path fill={props.fillPrimary ?? '--color'} d="M35,90L100,90L100,100L0,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M80,10L90,20L30,80L20,70Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M15,75L25,85L0,100Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M90,0L100,10L95,5L85,5Z" />
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
      <Path fill={props.fillPrimary ?? '--color'} d="M40,45L60,45L55,80L45,80Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M70,45L80,45L75,80L65,80Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M20,45L30,45L35,80L25,80Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M20,30L30,30L35,20L65,20L70,30L80,30L80,40L20,40Z" />
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
