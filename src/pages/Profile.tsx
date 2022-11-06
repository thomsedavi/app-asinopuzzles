import React from 'react';

interface ContactProps {
  userName?: string;
  onClickEditTextEntity: (type: 'UserName') => void;
  textEditEntityType?: 'UserName';
  textEditInput?: string;
}

const Contact = (props: ContactProps) => {
  return (
    props.userName === undefined
      ? <h1>Logged Out</h1>
      : <>
        {props.textEditEntityType === 'UserName'
           ? <div>Editing User {props.textEditInput}</div>
           : <h1>{props.userName ?? 'Anonymous'} <span className='edit' onClick={() => props.onClickEditTextEntity('UserName')}>✏️</span></h1>}
      </>
  );
};

export default Contact;
