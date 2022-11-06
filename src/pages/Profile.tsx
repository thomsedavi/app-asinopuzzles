import React from 'react';

interface ContactProps {
  userName?: string;
  onClickEditTextEntity: (type: 'UserName') => void;
  textEditEntityType?: 'UserName';
  textEditInput?: string;
  onChangeText: (text: string) => void;
}

const Contact = (props: ContactProps) => {
  return (
    props.userName === undefined
      ? <h1>Logged Out</h1>
      : <>
        {props.textEditEntityType === 'UserName'
           ? <h1><input value={props.textEditInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChangeText(event.target.value)} /> <span className='edit'>✏️</span></h1>
           : <h1>{props.userName ?? 'Anonymous'} <span className='edit' onClick={() => props.onClickEditTextEntity('UserName')}>✏️</span></h1>}
      </>
  );
};

export default Contact;
