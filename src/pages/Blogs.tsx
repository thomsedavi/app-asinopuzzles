import React from 'react';

const Blogs = () => {
  async function getUserInfo() {
    const response = await fetch('/.auth/me');
    const payload = await response.json();
    const { clientPrincipal } = payload;

    console.log(clientPrincipal);
  }

  return <h1 onClick={getUserInfo}>Blog Articles</h1>;
};

export default Blogs;
