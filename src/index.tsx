import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import Dev from './pages/Dev';
import './index.css';
import { User } from './interfaces';
import { convertDocumentToString, convertStringToDocument } from './common/utils';

interface AppState {
  user?: User | null;
  isBurgerOpen: boolean;
  textEditEntityType?: string;
  textEditInput?: string;
  isWorking: boolean;
  errorMessage?: string;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      isBurgerOpen: false,
      isWorking: false
    };

    this.setIsBurgerOpen = this.setIsBurgerOpen.bind(this);
    this.onClickEditTextEntity = this.onClickEditTextEntity.bind(this);
    this.onClickHeaderLink = this.onClickHeaderLink.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onClickSaveTextEntity = this.onClickSaveTextEntity.bind(this);
    this.onClickCreateMockProfile = this.onClickCreateMockProfile.bind(this);
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
    if (this.state.isWorking) {
      return;
    }

    const user = this.state.user;

    if (user !== undefined && user !== null) {
      if (type === 'UserName' && this.state.textEditInput !== undefined) {
        const name = this.state.textEditInput!.trim().substring(0, 64);

        this.setState({
          isWorking: true,
          errorMessage: undefined
        }, () => {
          fetch(`./api/user/${user.id}`, { method: 'PUT', body: JSON.stringify({ name: name }) })
            .then((response: Response) => {
              if (response.status === 200) {
                this.setState(prevState => ({
                  user: { ...prevState.user!, name: name },
                  textEditInput: undefined,
                  textEditEntityType: undefined,
                  isWorking: false
                }));
              }
            });
        });
      } else if (type === 'UserBiography' && this.state.textEditInput !== undefined) {
        const biography = convertStringToDocument(this.state.textEditInput);

        this.setState({
          isWorking: true,
          errorMessage: undefined
        }, () => {
          fetch(`./api/user/${user.id}`, { method: 'PUT', body: JSON.stringify({ biography: biography }) })
            .then((response: Response) => {
              if (response.status === 200) {
                this.setState(prevState => ({
                  user: { ...prevState.user!, biography: biography },
                  textEditInput: undefined,
                  textEditEntityType: undefined,
                  isWorking: false
                }));
              } else if (response.status === 400) {
                response.text()
                  .then((error: string) => {
                    if (error === 'BIOGRAPHY_TOO_LONG') {
                      this.setState({
                        errorMessage: 'Biography is too long',
                        isWorking: false
                      });
                    } else {
                      this.setState({
                        errorMessage: 'Unknown error',
                        isWorking: false
                      });
                    }
                  });
              } else {
                this.setState({
                  errorMessage: 'Unknown error',
                  isWorking: false
                });
              }
            })
            .catch(() => {
              this.setState({
                errorMessage: 'Unknown error',
                isWorking: false
              });
            });
        });
      }
    }
  }

  onClickCancel = () => {
    this.setState({
      textEditEntityType: undefined,
      textEditInput: undefined
    });
  }

  onClickCreateMockProfile = () => {
    this.setState({
      user: {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'A Vagrant',
        biography: {
          sections: [
            {
              type: 'PARAGRAPH',
              element: {
                text: 'I Am A Vagrant'
              }
            }
          ]
        }
      }
    });
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
            <Route path="dev" element={<Dev onClickCreateMockProfile={this.onClickCreateMockProfile} />} />
            <Route path="profile" element={<Profile user={this.state.user}
                                                    onClickEditTextEntity={this.onClickEditTextEntity}
                                                    textEditEntityType={this.state.textEditEntityType}
                                                    textEditInput={this.state.textEditInput}
                                                    onChangeText={this.onChangeText}
                                                    onClickSaveTextEntity={this.onClickSaveTextEntity}
                                                    onClickCancel={this.onClickCancel}
                                                    isWorking={this.state.isWorking}
                                                    errorMessage={this.state.errorMessage} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
