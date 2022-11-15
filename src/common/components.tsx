import React from 'react';
import { convertDocumentToElements, convertStringToDocument } from './utils';
import { Document } from '../interfaces';
import { TextArea, Heading1, ErrorMessage, ButtonContainer, Button, EditIcon } from './styled';

interface EditableElementHeading1Props {
  isEditable: boolean;
  isEditing: boolean;
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
  if (props.isEditing) {
    return <>
      <Heading1><input maxLength={64} disabled={props.isWorking} value={props.inputValue} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} /></Heading1>
      <ButtonContainer>
        <Button onClick={props.onClickSave} disabled={props.isWorking}>Save</Button>
        <Button onClick={props.onClickCancel} disabled={props.isWorking}>Cancel</Button>
      </ButtonContainer>
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
    </>
  } else if (props.isEditable) {
    return <Heading1>{props.value} <EditIcon onClick={props.onClickEdit}>✏️</EditIcon></Heading1>
  } else {
    return <Heading1>{props.value}</Heading1>
  }
}


interface EditableElementDocumentProps {
  isEditable: boolean;
  isEditing: boolean;
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
  if (props.isEditing) {
    return <>
      <TextArea value={props.inputValue} disabled={props.isWorking} placeholder="Asino Puzzler" rows={8} cols={40} maxLength={4000} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)} />
      <ButtonContainer>
        <Button onClick={props.onClickSave} disabled={props.isWorking}>Save</Button>
        <Button onClick={props.onClickCancel} disabled={props.isWorking}>Cancel</Button>
      </ButtonContainer>
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
      {convertDocumentToElements(convertStringToDocument(props.inputValue))}
    </>
  } else if (props.isEditable) {
    return <>
      {convertDocumentToElements(props.value, <EditIcon onClick={props.onClickEdit}>✏️</EditIcon>)}
    </>
  } else {
    return <>
      {convertDocumentToElements(props.value)}
    </>
  }
}
