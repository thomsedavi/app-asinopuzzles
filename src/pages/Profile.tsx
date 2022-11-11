import React from 'react';
import { User } from '../interfaces';
import { DocumentElement } from '../common/components';

interface ProfileProps {
  user?: User | null;
  onClickEditTextEntity: (type: string) => void;
  textEditEntityType?: string;
  textEditInput?: string;
  onChangeText: (text: string) => void;
  onClickSaveTextEntity: (type: string) => void;
  onClickCancel: () => void;
}

const Profile = (props: ProfileProps): JSX.Element => {
  return (
    !props.user
      ? <h1>Logged Out</h1>
      : <>
        {props.textEditEntityType === 'UserName'
           ? <h1><input maxLength={64} value={props.textEditInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChangeText(event.target.value)} /> <span className='edit' onClick={() => props.onClickSaveTextEntity('UserName')}>✔️</span></h1>
           : <h1>{props.user.name ?? 'Anonymous'} <span className='edit' onClick={() => props.onClickEditTextEntity('UserName')}>✏️</span></h1>}
        <DocumentElement value={props.user.biography ?? {}}
                         editing={props.textEditEntityType === 'UserBiography'}
                         inputValue={props.textEditInput}
                         onClickEdit={() => props.onClickEditTextEntity('UserBiography')}
                         onChange={(inputValue: string) => props.onChangeText(inputValue)}
                         onClickSave={() => props.onClickSaveTextEntity('UserBiography')}
                         onClickCancel={props.onClickCancel}
                         placeholder='Asino Puzzler' />
      </>
  );
};

export default Profile;
