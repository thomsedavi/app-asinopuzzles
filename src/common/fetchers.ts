import { User } from "../interfaces";

export const isLocalhost = (): boolean => {
  return window.location.hostname === 'localhost';
}

export const getUser = async (id: string | undefined): Promise<User> => {
  //if (isLocalhost()) {
  //  if (id === '0-00') {

  //  } else if (id === '1-11') {

  //  } else {

  //  }
  //} else {
  
  
  const response = await fetch(`/api/users/${id}`, { method: 'GET' });
  
  if (response.status === 200) {
    var json = await response.json();
    return json;
  } else {
    throw Error();
  }
  
  //}
}