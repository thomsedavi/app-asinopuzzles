import { User } from "../interfaces";

export const isLocalhost = (): boolean => {
  return window.location.hostname === 'localhost';
}

export const getUser = async (id: string | undefined): Promise<User | undefined> => {
  if (isLocalhost()) {
    if (id === '0-00') {
      const storedUser = window.localStorage.getItem('user_0-00');

      if (storedUser) {
        return Promise.resolve(JSON.parse(storedUser));
      } else {
        const newUser: User = {
          id: '0-00',
          name: 'Local Test',
          biography: { sections: [{ type: 'PARAGRAPH', element: { text: 'Local Test User' } }] }
        }

        window.localStorage.setItem('user_0-00', JSON.stringify(newUser));

        return Promise.resolve(newUser);
      }
    } else if (id === '1-11') {
      return Promise.resolve({
        id: '1-11',
        name: 'Anonymous',
        biography: { sections: [{ type: 'PARAGRAPH', element: { text: 'An Anonymous User' } }] },
        lexicologers: [
          { id: '1-11-111', title: 'Anonymous Lexicologer', dateCreated: '2022-12-01T09:34:19.442646Z', dateUpdated: '2022-12-01T09:34:19.442646Z' }
        ]
      });
    } else {
      Promise.resolve(undefined);
    }
  } else {
    const response: Response = await fetch(`/api/users/${id}`, { method: 'GET' });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(json);
    } else {
      Promise.resolve(undefined);
    }
  }
}
