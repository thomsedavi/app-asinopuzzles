import React from 'react';

interface ContactProps {
  userName?: string;
}

const Contact = (props: ContactProps) => {
  return <h1>You are {props.userName ?? 'Anonymous'}.</h1>;
};

export default Contact;
