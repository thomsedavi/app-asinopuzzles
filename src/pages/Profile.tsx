import React from 'react';
import { User } from '../interfaces';
import { EditableElementDocument, EditableElementHeading1 } from '../common/components';
import { Heading1 } from '../common/styled';

interface ProfileProps {
  user?: User | null;
  onClickEditTextEntity: (type: string) => void;
  textEditEntityType?: string;
  textEditInput?: string;
  onChangeText: (text: string) => void;
  onClickSaveTextEntity: (type: string) => void;
  onClickCancel: () => void;
  isWorking: boolean;
  errorMessage?: string;
}

const Profile = (props: ProfileProps): JSX.Element => {
  return (
    !props.user
      ? <Heading1>Logged Out</Heading1>
      : <>
        <EditableElementHeading1 value={props.user.name ?? ''}
                                 editing={props.textEditEntityType === 'UserName'}
                                 inputValue={props.textEditInput}
                                 onClickEdit={() => props.onClickEditTextEntity('UserName')}
                                 onChange={(inputValue: string) => props.onChangeText(inputValue)}
                                 onClickSave={() => props.onClickSaveTextEntity('UserName')}
                                 onClickCancel={props.onClickCancel}
                                 placeholder='Anonymous'
                                 isWorking={props.isWorking}
                                 errorMessage={props.errorMessage} />
        <EditableElementDocument value={props.user.biography ?? {}}
                                 editing={props.textEditEntityType === 'UserBiography'}
                                 inputValue={props.textEditInput}
                                 onClickEdit={() => props.onClickEditTextEntity('UserBiography')}
                                 onChange={(inputValue: string) => props.onChangeText(inputValue)}
                                 onClickSave={() => props.onClickSaveTextEntity('UserBiography')}
                                 onClickCancel={props.onClickCancel}
                                 placeholder='Asino Puzzler'
                                 isWorking={props.isWorking}
                                 errorMessage={props.errorMessage} />
      </>
  );
};

export default Profile;
