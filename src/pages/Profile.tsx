import React from 'react';
import { User } from '../interfaces';
import { convertDocumentToElements, convertStringToDocument } from '../utils';

interface ContactProps {
  user?: User | null;
  onClickEditTextEntity: (type: string) => void;
  textEditEntityType?: string;
  textEditInput?: string;
  onChangeText: (text: string) => void;
  onClickSaveTextEntity: (type: string) => void;
}

const Contact = (props: ContactProps) => {
  return (
    !props.user
      ? <h1>Logged Out</h1>
      : <>
        {props.textEditEntityType === 'UserName'
           ? <h1><input maxLength={64} value={props.textEditInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChangeText(event.target.value)} /> <span className='edit' onClick={() => props.onClickSaveTextEntity('UserName')}>💾</span></h1>
           : <h1>{props.user.name ?? 'Anonymous'} <span className='edit' onClick={() => props.onClickEditTextEntity('UserName')}>⌨️</span></h1>}
        {props.textEditEntityType === 'UserBiography'
           ? <>
               <textarea value={props.textEditInput} placeholder="Asino Puzzler" rows={4} cols={40} maxLength={4000} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChangeText(event.target.value)} />
               <div className='edit' onClick={() => props.onClickSaveTextEntity('UserBiography')}>💾</div>
               {convertDocumentToElements(convertStringToDocument(props.textEditInput))}
             </>
           : <>
               {convertDocumentToElements(props.user.biography ?? {}, <span className='edit' onClick={() => props.onClickEditTextEntity('UserBiography')}>⌨️</span>)}
             </>}
      </>
  );
};

export default Contact;
