import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, LoaderFunctionArgs, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import UserPage from './pages/UserPage';
import NoPage from "./pages/NoPage";
import './index.css';
import { User } from './interfaces';
import { Placeholder } from './common/styled';

interface AppState {
  me?: User | null;
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
    if (params.userId === this.state.me?.id) {
      // It's me! I don't need to fetch this
      return this.state.me;
    } else {
      return fetch(`/api/user/${params.userId}`, { method: 'GET' });
    }
  }

  render = (): JSX.Element => {
    if (this.state.me === undefined) {
      return <Placeholder>…</Placeholder>
    } else {
      const router = createBrowserRouter([
        {
          index: true,
          element: <Home me={this.state.me} />,
        },
        {
          path: "/about",
          element: <About me={this.state.me} />,
        },
        {
          path: "/users/:userId",
          element: <UserPage me={this.state.me} />,
          loader: this.userLoader
        },
        {
          path: "/*",
          element: <NoPage me={this.state.me} />,
        },
      ]);
  
      return <RouterProvider router={router} />;  
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
