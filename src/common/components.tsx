import React from 'react';
import { convertDocumentToElements, convertStringToDocument } from './utils';
import { Document } from '../interfaces';
import { TextArea, Heading1, ErrorMessage, ButtonGroup, Button, EditIcon, Input, InlineLabel, InlineInput, TableCell, TableCellInput } from './styled';

interface EditableElementTableCellProps {
  editState: 'disabled' | 'editable' | 'editing';
  value: string;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  isWorking?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

export const EditableTableCellParagraph = (props: EditableElementTableCellProps): JSX.Element => {
  if (props.editState === 'editing') {
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        props.onClickSave();
      }
    }

    return <>
      <TableCell editing>
        <TableCellInput onBlur={props.onClickSave} autoFocus maxLength={32} disabled={props.isWorking} value={props.inputValue} onKeyDown={onKeyDown} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} />
      </TableCell>
    </>
  } else if (props.editState === 'editable') {
    return <TableCell editable onClick={props.onClickEdit}>{props.value} <EditIcon>✏️</EditIcon></TableCell>;
  } else {
    return <TableCell>{props.value}</TableCell>;
  }
}

interface SingleNumberInputProps {
 id: string;
 label: string;
 min?: number;
 value: number;
 onChange: (value: string) => void;
}

export const SingleNumberInput = (props: SingleNumberInputProps): JSX.Element => {
  return <>
    <InlineLabel htmlFor={props.id}>{props.label}</InlineLabel>
    <InlineInput short type="number" id={props.id} name={props.id} min={props.min ?? 0} value={props.value}
                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} />
  </>;
}

interface EditableElementHeading1Props {
  editState: 'disabled' | 'editable' | 'editing';
  value: string;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  isWorking?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

export const EditableElementHeading1 = (props: EditableElementHeading1Props): JSX.Element => {
  if (props.editState === 'editing') {
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        props.onClickSave();
      }
    }

    return <>
      <Heading1>
        <Input autoFocus maxLength={64} disabled={props.isWorking} value={props.inputValue} onKeyDown={onKeyDown} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} />
      </Heading1>
      <ButtonGroup>
        <Button onClick={props.onClickSave} disabled={props.isWorking}>Save</Button>
        <Button onClick={props.onClickCancel} disabled={props.isWorking}>Cancel</Button>
      </ButtonGroup>
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
    </>
  } else if (props.editState === 'editable') {
    return <Heading1 editable onClick={props.onClickEdit}>{props.value} <EditIcon>✏️</EditIcon></Heading1>
  } else {
    return <Heading1>{props.value}</Heading1>
  }
}


interface EditableElementDocumentProps {
  editState: 'disabled' | 'editable' | 'editing';
  value: Document;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  isWorking?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

export const EditableElementDocument = (props: EditableElementDocumentProps): JSX.Element => {
  if (props.editState === 'editing') {
    return <>
      <TextArea autoFocus value={props.inputValue} disabled={props.isWorking} placeholder="Asino Puzzler" rows={8} cols={40} maxLength={4000} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)} />
      <ButtonGroup>
        <Button onClick={props.onClickSave} disabled={props.isWorking}>Save</Button>
        <Button onClick={props.onClickCancel} disabled={props.isWorking}>Cancel</Button>
      </ButtonGroup>
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
      {convertDocumentToElements(convertStringToDocument(props.inputValue))}
    </>
  } else if (props.editState === 'editable') {
    return <>
      {convertDocumentToElements(props.value, props.onClickEdit)}
    </>
  } else {
    return <>
      {convertDocumentToElements(props.value)}
    </>
  }
}
