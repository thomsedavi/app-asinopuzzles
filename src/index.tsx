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
import { getPuzzle, getLexicologer, getUser, isLocalhost } from './common/fetchers';
import Puzzle from './pages/Puzzle';

interface AppState {
  user?: User | null;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {};

    this.userLoader = this.userLoader.bind(this);
  }

  componentDidMount = async (): Promise<void> => {
    if (isLocalhost()) {
      if(window.localStorage.getItem('loggedIn') === 'true') {
        this.setState({
          user: await getUser('0-00')
        });
      } else {
        this.setState({
          user: null
        })
      }
    } else {
      setTimeout(() => {
        fetch('/.auth/me', { method: 'GET'})
          .then((response: Response) => response.json())
          .then((authValue: { clientPrincipal: { identityProvider: 'aadb2c', userId: string } | null}) => {
            if (authValue.clientPrincipal !== null) {
              getUser(authValue.clientPrincipal.userId)
                .then((response: User | undefined) => {
                  if (response) {
                    this.setState({
                      user: response
                    });
                  } else {
                    this.setState({
                      user: null
                    });    
                  }
                })
                .catch(() => {
                  this.setState({
                    user: null
                  });  
                });
            } else {
              this.setState({
                user: null
              });  
            }
          })
          .catch(() => {
            this.setState({
              user: null
            });
          });
        }, 1000);  
    }
  }

  userLoader = async ({ params }: LoaderFunctionArgs) => {
    return getUser(params.id);
  }

  lexicologerLoader = async ({ params }: LoaderFunctionArgs) => {
    return getLexicologer(params.id);
  }

  puzzleLoader = async({ params }: LoaderFunctionArgs) => {
    return getPuzzle(params.id);
  }

  render = (): JSX.Element => {
    if (this.state.user === undefined) {
      return <Placeholder>…</Placeholder>
    } else {
      const router = createBrowserRouter([
        {
          index: true,
          element: <Home userId={this.state.user?.id} />,
        },
        {
          path: "/miscellany",
          element: <Miscellany userId={this.state.user?.id} />,
        },
        {
          path: "/puzzles/:id/edit",
          element: <Puzzle user={this.state.user} mode='update' />,
          loader: this.puzzleLoader
        },
        {
          path: "/puzzles/create",
          element: <Puzzle user={this.state.user} mode='create' />,
        },
        {
          path: "/puzzles/:id",
          element: <Puzzle user={this.state.user} mode='read' />,
          loader: this.puzzleLoader
        },
        {
          path: "/lexicologers/:id/edit",
          element: <Lexicologer user={this.state.user} mode='update' />,
          loader: this.lexicologerLoader
        },
        {
          path: "/lexicologers/create",
          element: <Lexicologer user={this.state.user} mode='create' />,
        },
        {
          path: "/lexicologers/:id",
          element: <Lexicologer user={this.state.user} mode='read' />,
          loader: this.lexicologerLoader
        },
        {
          path: "/about",
          element: <About userId={this.state.user?.id} />,
        },
        {
          path: "/users/:id/edit",
          element: <UserPage userId={this.state.user?.id} mode='update' />,
          loader: this.userLoader
        },
        {
          path: "/users/:id",
          element: <UserPage userId={this.state.user?.id} mode='read' />,
          loader: this.userLoader
        },
        {
          path: "/*",
          element: <NoPage userId={this.state.user?.id} />,
        },
      ]);
  
      return <RouterProvider router={router} />;  
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
