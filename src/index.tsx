import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, LoaderFunctionArgs, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import UserPage from './pages/UserPage';
import NoPage from "./pages/NoPage";
import './index.css';
import { User } from './interfaces';

interface AppState {
  me?: User | null;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.userLoader = this.userLoader.bind(this);
  }

  componentDidMount = (): void => {
    setTimeout(() => {
      fetch('/.auth/me', { method: 'GET'})
        .then((response: Response) => response.json())
        .then((authValue: { clientPrincipal: { identityProvider: 'aadb2c', userId: string } | null}) => {
          if (authValue.clientPrincipal !== null) {
            fetch(`/api/user/${authValue.clientPrincipal.userId}`, { method: 'GET' })
              .then((response: Response) => response.json())
              .then((userValue: User) => {
                this.setState({
                  me: userValue
                });
              })
              .catch(() => {
                this.setState({
                  me: null
                });  
              });
          } else {
            this.setState({
              me: null
            });  
          }
        })
        .catch(() => {
          this.setState({
            me: null
          });
        });
      }, 1000);
  }

  userLoader = async ({ params }: LoaderFunctionArgs) => {
    return fetch(`/api/user/${params.userId}`, { method: 'GET' });
  }

  render = () => {
    const router = createBrowserRouter([
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/users/:userId",
            element: <UserPage me={this.state.me} />,
            loader: this.userLoader
          },
          {
            path: "/*",
            element: <NoPage />,
          },
    ]);

    return <RouterProvider router={router} />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
