import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, LoaderFunctionArgs, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Miscellany from './pages/Miscellany';
import About from "./pages/About";
import UserPage from './pages/UserPage';
import NoPage from "./pages/NoPage";
import './index.css';
import { User } from './interfaces';
import { Placeholder } from './common/styled';
import Lexicologer from './pages/Lexicologer';

interface AppState {
  userId?: string | null;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {};

    this.userLoader = this.userLoader.bind(this);
  }

  componentDidMount = (): void => {
    setTimeout(() => {
      fetch('/.auth/me', { method: 'GET'})
        .then((response: Response) => response.json())
        .then((authValue: { clientPrincipal: { identityProvider: 'aadb2c', userId: string } | null}) => {
          if (authValue.clientPrincipal !== null) {
            fetch(`/api/users/${authValue.clientPrincipal.userId}`, { method: 'GET' })
              .then((response: Response) => response.json())
              .then((userValue: User) => {
                this.setState({
                  userId: userValue.id
                });
              })
              .catch(() => {
                this.setState({
                  userId: null
                });  
              });
          } else {
            this.setState({
              userId: null
            });  
          }
        })
        .catch(() => {
          this.setState({
            userId: null
          });
        });
      }, 1000);
  }

  userLoader = async ({ params }: LoaderFunctionArgs) => {
    return fetch(`/api/users/${params.userId}`, { method: 'GET' });
  }

  lexicologerLoader = async ({ params }: LoaderFunctionArgs) => {
    return fetch(`/api/lexicologers/${params.lexicologerId}`, { method: 'GET' });
  }

  render = (): JSX.Element => {
    if (this.state.userId === undefined) {
      return <Placeholder>…</Placeholder>
    } else {
      const router = createBrowserRouter([
        {
          index: true,
          element: <Home userId={this.state.userId} />,
        },
        {
          path: "/miscellany",
          element: <Miscellany userId={this.state.userId} />,
        },
        {
          path: "/lexicologers/create",
          element: <Lexicologer userId={this.state.userId} mode='create' />,
        },
        {
          path: "/lexicologers/:lexicologerId",
          element: <Lexicologer userId={this.state.userId} mode='create' />,
          loader: this.lexicologerLoader
        },
        {
          path: "/about",
          element: <About userId={this.state.userId} />,
        },
        {
          path: "/users/:userId",
          element: <UserPage userId={this.state.userId} />,
          loader: this.userLoader
        },
        {
          path: "/*",
          element: <NoPage userId={this.state.userId} />,
        },
      ]);
  
      return <RouterProvider router={router} />;  
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
