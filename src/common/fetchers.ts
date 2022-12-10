import { User } from "../interfaces";

export const isLocalhost = (): boolean => {
  return window.location.hostname === 'localhost';
}

export const getUser = (id: string | undefined): Promise<User> => {
  if (isLocalhost()) {
    if (id === '0-00') {
      Promise.resolve({
        id: '0-00',
        name: 'Lotographia',
        biography: { sections: [{ type: 'PARAGRAPH', element: { text: 'The Website Creator' } }] },
        lexicologers: [
          { id: '0-00-000', title: 'My Lexicologer', dateCreated: '2022-12-01T09:34:19.442646Z', dateUpdated: '2022-12-01T09:34:19.442646Z' }
        ]
      });
    } else if (id === '1-11') {
      Promise.resolve({
        id: '1-11',
        name: 'Anonymous',
        biography: { sections: [{ type: 'PARAGRAPH', element: { text: 'An Anonymous User' } }] },
        lexicologers: [
          { id: '1-11-111', title: 'Anonymous Lexicologer', dateCreated: '2022-12-01T09:34:19.442646Z', dateUpdated: '2022-12-01T09:34:19.442646Z' }
        ]
      });
    } else {
      throw new Error();
    }
  } else {
    fetch(`/api/users/${id}`, { method: 'GET' })
      .then((response: Response) => {
        if (response.status === 200) {
          response.json()
            .then((json: any) => {
              return json
            });
        } else {
          throw new Error();
        }      
      });  
  }

  throw new Error();
}