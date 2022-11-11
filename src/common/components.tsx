import React from 'react';
import { convertDocumentToElements, convertStringToDocument } from './utils';
import { Document } from '../interfaces';
import styled from 'styled-components';

interface DocumentElementProps {
  value: Document;
  editing: boolean;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  placeholder?: string;
}

export const DocumentElement = (props: DocumentElementProps): JSX.Element => {
  if (props.editing) {
    return <>
    <TextAreaContainer>
      <TextArea value={props.inputValue} placeholder="Asino Puzzler" rows={8} cols={40} maxLength={4000} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)} />
      <Cancel onClick={props.onClickCancel}>❌</Cancel>
      <Save onClick={props.onClickSave}>✔️</Save>
    </TextAreaContainer>
    {convertDocumentToElements(convertStringToDocument(props.inputValue))}
  </>
  } else {
    return <>
      {convertDocumentToElements(props.value, <span className='edit' onClick={props.onClickEdit}>✏️</span>)}
    </>
  }
}

const TextAreaContainer = styled.div`
  position: relative;
  width: 21em;
  margin: 0 auto;
`;

const TextArea = styled.textarea`
  display: inline-block;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Cancel = styled(Button)`
  bottom: 1.8em;
`;

const Save = styled(Button)`
  bottom: 0.4em;
`;
