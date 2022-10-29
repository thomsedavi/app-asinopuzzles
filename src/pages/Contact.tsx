import React from 'react';

const Contact = () => {
  async function testAPI() {
    const response = await fetch('/api/HttpTrigger?name=test');
    const payload = await response.json();

    console.log(payload);
  }

  return <h1 onClick={testAPI}>Contact Me</h1>;
};

export default Contact;
