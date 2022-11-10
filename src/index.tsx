import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import './index.css';
import { User } from './interfaces';
import { convertDocumentToString } from './utils';

interface AppState {
  user?: User | null;
  isBurgerOpen: boolean;
  textEditEntityType?: string;
  textEditInput?: string;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      isBurgerOpen: false
    };

    this.setIsBurgerOpen = this.setIsBurgerOpen.bind(this);
    this.onClickEditTextEntity = this.onClickEditTextEntity.bind(this);
    this.onClickHeaderLink = this.onClickHeaderLink.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onClickSaveTextEntity = this.onClickSaveTextEntity.bind(this);
  }

  componentDidMount = (): void => {
    setTimeout(() => {
      fetch('/.auth/me', { method: 'GET'})
        .then((response: Response) => response.json())
        .then((authValue: { clientPrincipal: { identityProvider: 'aadb2c', userId: string } | null}) => {
          if (authValue.clientPrincipal !== null) {
            fetch(`./api/user/${authValue.clientPrincipal.userId}`, { method: 'GET' })
              .then((response: Response) => response.json())
              .then((userValue: User) => {
                this.setState({
                  user: userValue
                });
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

  setIsBurgerOpen = (isBurgerOpen: boolean): void => {
    this.setState({
      isBurgerOpen: isBurgerOpen
    });
  }

  onClickHeaderLink = (): void => {
    this.setState({
      isBurgerOpen: false,
      textEditEntityType: undefined,
      textEditInput: undefined
    });
  }

  onClickEditTextEntity = (type: string): void => {
    let textEditInput: string | undefined = undefined;

    type === 'UserName' && (textEditInput = this.state.user?.name ?? 'Anonymous');
    type === 'UserBiography' && (textEditInput = this.state.user && this.state.user.biography ? convertDocumentToString(this.state.user!.biography) : 'Asino Puzzler');

    this.setState({
      textEditEntityType: textEditInput === undefined ? undefined : type,
      textEditInput: textEditInput
    });
  }

  onChangeText = (text: string): void => {
    this.setState({
      textEditInput: text
    });
  }

  onClickSaveTextEntity = (type: string): void => {
    const user = this.state.user;

    if (user !== undefined && user !== null) {
      if (type === 'UserName' && this.state.textEditInput !== undefined) {
        const textEditInput = this.state.textEditInput!.trim();

        fetch(`./api/user/${user.id}`, { method: 'PUT', body: JSON.stringify({ name: textEditInput }) })
          .then((response: Response) => {
            if (response.status === 200) {
              this.setState(prevState => ({
                user: { ...prevState.user!, name: textEditInput },
                textEditInput: undefined,
                textEditEntityType: undefined
              }));
            }
          });
      }
    }
  }

  render = () => {
    return (
      this.state.user === undefined ? <></> : <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={this.state.user !== undefined && this.state.user !== null}
                                           isBurgerOpen={this.state.isBurgerOpen}
                                           setIsBurgerOpen={this.setIsBurgerOpen}
                                           onClickHeaderLink={this.onClickHeaderLink} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile user={this.state.user}
                                                    onClickEditTextEntity={this.onClickEditTextEntity}
                                                    textEditEntityType={this.state.textEditEntityType}
                                                    textEditInput={this.state.textEditInput}
                                                    onChangeText={this.onChangeText}
                                                    onClickSaveTextEntity={this.onClickSaveTextEntity} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
