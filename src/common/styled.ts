import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Placeholder = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8em;
`;

interface HeaderProps {
  editable?: boolean
}

export const Heading1 = styled.h1<HeaderProps>`
  text-align: center;
  text-shadow: 0.05em 0.05em var(--accent);
  font-variant: small-caps;
  margin: 0.25em 0;
  cursor: ${props => props.editable ? "pointer" : "auto"};
  border: ${props => props.editable ? "1px solid var(--accent-faded)" : "1px solid transparent"};
  word-wrap: break-word;
`;

export const Heading2 = styled.h2`
  text-align: center;
  text-shadow: 0.05em 0.05em var(--accent);
  margin: 0.5em 0 0.25em;
  padding: 0.25em;
`;

interface ParagraphContainerProps {
  editable?: boolean;
}

export const ParagraphContainer = styled.div<ParagraphContainerProps>`
  margin: 0.25em 0;
  cursor: ${props => props.editable ? "pointer" : "auto"};
  border: ${props => props.editable ? "1px solid var(--accent-faded)" : "1px solid transparent"};
`;

interface ParagraphProps {
  fontWeight?: string;
}

export const Paragraph = styled.p<ParagraphProps>`
  text-align: center;
  padding: 0.25em;
  font-weight: ${props => props.fontWeight ?? '400'};
  margin: 0;
`;

export const Code = styled.code`
  background: var(--background-color-information);
`;

export const ParagraphAccent = styled.p`
  color: var(--accent-pale);
  text-align: center;
  margin: 0;
  font-size: 0.9em;
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const Input = styled.input`
  font-size: 1em;
  width: 80%;
`;

export const EditIcon = styled.span`
  text-shadow: none;
`;

export const Button = styled.button`
  margin: 0.5em;
  border: none;
  box-shadow: 0.2em 0.2em var(--accent);
  background: var(--color);
  color: var(--background-color);
  cursor: pointer;
  font-size: 1em;
  padding: 0.3em 0.6em;
  font-family: inherit;

  &:hover {
    background: var(--hover);
  }

  &:disabled {
    background: var(--disabled);
  }
`;

interface ToggleButtonProps {
  width?: string;
}

export const ToggleButton = styled.button<ToggleButtonProps>`
  margin: 0.5em 0 0.5em auto;
  display: block;
  border: none;
  box-shadow: 0.2em 0.2em var(--accent);
  background: var(--color);
  color: var(--background-color);
  cursor: pointer;
  font-size: 0.8em;
  padding: 0.3em 0.6em;
  font-family: inherit;
  width: ${props => props.width ?? 'auto'};

  &:hover {
    background: var(--hover);
  }

  &:disabled {
    background: var(--disabled);
  }
`;

export const ButtonLink = styled(Link)`
  margin: 0.5em;
  border: none;
  box-shadow: 0.2em 0.2em var(--accent);
  background: var(--color);
  color: var(--background-color);
  cursor: pointer;
  font-size: 1em;
  text-decoration: none;
  padding: 1px 6px;
  display: inline-block;

  &:hover {
    background: var(--hover);
  }

  &:disabled {
    background: var(--disabled);
  }
`;

export const TextArea = styled.textarea`
  display: block;
  margin: 0.5em auto;
`;

export const Navigation = styled.nav`
  box-shadow: 0 0 0.5em var(--shadow);
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: var(--failure);
`;

export const HeaderLinkInternal = styled(NavLink)`
  color: var(--color);
  text-decoration: none;
  padding: 0.5em 0.5em;
  text-shadow: 1px 0px 1px var(--accent);

  &:hover {
    color: var(--hover);
  }

  @media (max-width: 575.98px) {
    display: block;
  }

  @media (min-width: 576px) {
    display: inline-block;
  }
`;

export const HeaderLinkExternal = styled.a`
  color: var(--color);
  text-decoration: none;
  padding: 0.5em 0.5em;
  text-shadow: 1px 0px 1px var(--accent);

  &:hover {
    color: var(--hover);
  }

  @media (max-width: 575.98px) {
    display: block;
  }

  @media (min-width: 576px) {
    display: inline-block;
  }
`;

export const TextLink = styled.a`
  color: var(--accent-pale);
  font-weight: 700;
`;

export const Container = styled.div`
  position: relative;
  margin: 0 auto;

  @media (max-width: 575.98px) {
    width: 21em;
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    width: 35em;
  }

  @media (min-width: 768px) {
    width: 37em;
  }
`;

interface FlashProps {
  isFading: boolean;
  color: 'accent' | 'opposite' | 'failure';
}

export const Flash = styled.div<FlashProps>`
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--${props => props.color});
  color: var(--background-color);
  padding: 4px 10px;
  font-size: 0.8em;
  box-shadow: 0.2em 0.2em var(--color);
  transition: ${props => props.isFading ? '2s' : 'auto'};
  opacity: ${props => props.isFading ? '0' : '1'};
`;

export const Burger = styled.svg`
  float: right;
  cursor: pointer;

  @media (min-width: 576px) {
    display: none;
  }
`;

export const LogoLarge = styled.svg`
  height: 1.4em;

  @media (max-width: 575.98px) {
    display: none;
  }

  @media (min-width: 576px) {
    display: inline-block;
  }
`;

export const LogoSmall = styled.svg`
  display: block;
  height: 1.15em;

  @media (max-width: 575.98px) {
    display: block;
  }

  @media (min-width: 576px) {
    display: none;
  }
`;

export const PathAccent = styled.path`
  fill: var(--accent);
`;

export const PathFill = styled.path`
  fill: var(--color);

  ${Burger}:hover & {
    fill: var(--hover);
  }

  ${LogoLarge}:hover & {
    fill: var(--hover);
  }

  ${LogoSmall}:hover & {
    fill: var(--hover);
  }
`;

export const InlineLabel = styled.label`
  width: 50%;
  display: inline-block;
  text-align: right;
  padding-right: 0.5em;
  box-sizing: border-box;
`;

interface InlineInputProps {
  short?: boolean;
}

export const InlineInput = styled.input<InlineInputProps>`
  display: inline-block;
  margin-left: 0.5em;
  box-sizing: border-box;
  width: ${props => props.short ? '4em' : ''};
`;

export const InputGroup = styled.div`
  margin: 1em 0px;
`;

export const Information = styled.div`
  background-color: var(--background-color-information);
  font-size: 0.8em;
  text-align: center;
  padding: 0.5em;
  margin: 1em 0;
`;

interface TableProps {
  width?: string | number;
  smallWidth?: string | number;
  mediumWidth?: string | number;
  largeWidth?: string | number;
}

export const Table = styled.table<TableProps>`
  border: 1px solid var(--color);
  border-collapse: collapse;
  table-layout: fixed;
  margin: 0 auto;

  @media (max-width: 575.98px) {
    width: ${props => props.smallWidth ?? props.width ?? 'auto'};
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    width: ${props => props.mediumWidth ?? props.width ?? 'auto'};
  }

  @media (min-width: 768px) {
    width: ${props => props.largeWidth ?? props.width ?? 'auto'};
  }
`;

export const ColumnGroup = styled.colgroup`
`;

interface ColumnProps {
  width?: string | number;
  smallWidth?: string | number;
  mediumWidth?: string | number;
  largeWidth?: string | number;
}

export const Column = styled.col<ColumnProps>`
  @media (max-width: 575.98px) {
    width: ${props => props.smallWidth ?? props.width ?? 'auto'};
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    width: ${props => props.mediumWidth ?? props.width ?? 'auto'};
  }

  @media (min-width: 768px) {
    width: ${props => props.largeWidth ?? props.width ?? 'auto'};
  }
`;

export const TableRow = styled.tr`
`;

interface TableHeaderProps {
  clickable?: boolean;
}

export const TableHeader = styled.th<TableHeaderProps>`
  border: 1px solid var(--color);
  padding: 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  cursor: ${props => props.clickable ? "pointer" : "auto"};
`;

interface TableCellProps {
  editable?: boolean;
  editing?: boolean;
  noBorderRight?: boolean;
  noBorderLeft?: boolean;
  noPaddingRight?: boolean;
  noPaddingLeft?: boolean;
}

export const TableCell = styled.td<TableCellProps>`
  border: 1px solid var(--color);
  padding: ${props => props.editing ? "0.4em" : "0.5em"};
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${props => props.editable ? "pointer" : "auto"};
  border-right: ${props => props.noBorderRight ? "none" : "auto"};
  border-left: ${props => props.noBorderLeft ? "none" : "auto"};
  padding-right: ${props => props.noPaddingRight ? 0 : props.editing ? "0.4em" : "0.5em"};
  padding-left: ${props => props.noPaddingLeft ? 0 : props.editing ? "0.4em" : "0.5em"};
`;

export const TableCellAction = styled.span`
  cursor: pointer;
`;

export const TableCellLink = styled.a`
  text-decoration: none;
  color: var(--accent-pale);
  font-weight: 700;
`;

export const TableCellInput = styled.input`
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
`;

export const FailureSpan = styled.span`
  font-weight: 700;

  @media (prefers-color-scheme: dark) {
    color: var(--accent-pale);
  }

  @media (prefers-color-scheme: light) {
    color: var(--opposite-pale);
  }
`;

export const SuccessSpan = styled.span`
  font-weight: 700;
  
  @media (prefers-color-scheme: dark) {
    color: var(--opposite-pale);
  }

  @media (prefers-color-scheme: light) {
    color: var(--accent-pale);
  }
`;

export const Emphasis = styled.span`
  font-weight: 700;
  color: var(--accent-pale);
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--overlay-color);
`;