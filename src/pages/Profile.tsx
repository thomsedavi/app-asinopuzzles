import React from 'react';

const Contact = () => {
  async function testAPI() {
    const response = await fetch('/api/HttpTrigger?name=test');

    console.log(response);
  }

  return <h1 onClick={testAPI}>You goes here.</h1>;
};

export default Contact;
