import React from 'react';
import { convertDocumentToElements, convertStringToDocument } from './utils';
import { Document } from '../interfaces';
import { TextAreaCancel, TextAreaSave, TextArea, TextAreaContainer, Heading1, TextAreaWorking, ErrorMessage } from './styled';

interface EditableElementHeading1Props {
  value: string;
  editing: boolean;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  isWorking: boolean;
  placeholder?: string;
  errorMessage?: string;
}

export const EditableElementHeading1 = (props: EditableElementHeading1Props): JSX.Element => {
  if (props.editing) {
    return <Heading1><input maxLength={64} disabled={props.isWorking} value={props.inputValue} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} /> {!props.isWorking && <span className='edit' onClick={props.onClickSave}>✔️</span>}{props.isWorking && <span className='edit'>⌛</span>}</Heading1>
  } else {
    return <Heading1>{props.value} <span className='edit' onClick={props.onClickEdit}>✏️</span></Heading1>
  }
}


interface EditableElementDocumentProps {
  value: Document;
  editing: boolean;
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
  if (props.editing) {
    return <>
    <TextAreaContainer>
      <TextArea value={props.inputValue} disabled={props.isWorking} placeholder="Asino Puzzler" rows={8} cols={40} maxLength={4000} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)} />
      {!props.isWorking && <TextAreaCancel onClick={props.onClickCancel}>❌</TextAreaCancel>}
      {!props.isWorking && <TextAreaSave onClick={props.onClickSave}>✔️</TextAreaSave>}
      {props.isWorking && <TextAreaWorking>⌛</TextAreaWorking>}
    </TextAreaContainer>
    {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
    {convertDocumentToElements(convertStringToDocument(props.inputValue))}
  </>
  } else {
    return <>
      {convertDocumentToElements(props.value, <span className='edit' onClick={props.onClickEdit}>✏️</span>)}
    </>
  }
}
