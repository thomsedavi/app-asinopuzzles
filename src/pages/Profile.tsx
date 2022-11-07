import React from 'react';

interface ContactProps {
  userName?: string;
  userBiography?: string;
  onClickEditTextEntity: (type: string) => void;
  textEditEntityType?: string;
  textEditInput?: string;
  onChangeText: (text: string) => void;
  onClickSaveTextEntity: (type: string) => void;
}

const Contact = (props: ContactProps) => {
  return (
    props.userName === undefined
      ? <h1>Logged Out</h1>
      : <>
        {props.textEditEntityType === 'UserName'
           ? <h1><input maxLength={64} value={props.textEditInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChangeText(event.target.value)} /> <span className='edit' onClick={() => props.onClickSaveTextEntity('UserName')}>💾</span></h1>
           : <h1>{props.userName ?? 'Anonymous'} <span className='edit' onClick={() => props.onClickEditTextEntity('UserName')}>⌨️</span></h1>}
           <div>{props.userBiography}</div>
      </>
  );
};

export default Contact;
