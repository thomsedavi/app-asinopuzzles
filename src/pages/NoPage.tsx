import React from 'react';
import { Heading1 } from '../common/styled';
import { User } from '../interfaces';
import Layout from './Layout';

interface NoPageProps {
  me?: User | null;
}

const NoPage = (props: NoPageProps) => {
  return <>
    <Layout showPlaceholder={() => {}} me={props.me} isBurgerOpen={false} setIsBurgerOpen={() => {}} />
    <Heading1>404</Heading1>
  </>;
};

export default NoPage;
