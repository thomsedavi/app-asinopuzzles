import React from 'react';
import { convertDocumentToElements, convertStringToDocument } from './utils';
import { Document } from '../interfaces';
import { TextAreaCancel, TextAreaSave, TextArea, TextAreaContainer, Heading1 } from './styled';

interface EditableElementHeading1Props {
  value: string;
  editing: boolean;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  placeholder?: string;
}

export const EditableElementHeading1 = (props: EditableElementHeading1Props): JSX.Element => {
  if (props.editing) {
    return <Heading1><input maxLength={64} value={props.inputValue} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} /> <span className='edit' onClick={props.onClickSave}>✔️</span></Heading1>
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
  placeholder?: string;
}

export const EditableElementDocument = (props: EditableElementDocumentProps): JSX.Element => {
  if (props.editing) {
    return <>
    <TextAreaContainer>
      <TextArea value={props.inputValue} placeholder="Asino Puzzler" rows={8} cols={40} maxLength={4000} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)} />
      <TextAreaCancel onClick={props.onClickCancel}>❌</TextAreaCancel>
      <TextAreaSave onClick={props.onClickSave}>✔️</TextAreaSave>
    </TextAreaContainer>
    {convertDocumentToElements(convertStringToDocument(props.inputValue))}
  </>
  } else {
    return <>
      {convertDocumentToElements(props.value, <span className='edit' onClick={props.onClickEdit}>✏️</span>)}
    </>
  }
}
