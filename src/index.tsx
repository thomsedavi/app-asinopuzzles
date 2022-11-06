import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import './index.css';

interface AppState {
  userId?: string | null;
  userName?: string;
  isBurgerOpen: boolean;
  textEditEntityType?: 'UserName';
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
              .then((userValue: { id: string, name: string }) => {
                this.setState({
                  userId: userValue.id,
                  userName: userValue.name
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

  onClickEditTextEntity = (type: 'UserName'): void => {
    let textEditInput: string | undefined = undefined;

    type === 'UserName' && (textEditInput = this.state.userName);

    this.setState({
      textEditEntityType: type,
      textEditInput: textEditInput
    });
  }

  onChangeText = (text: string): void => {
    this.setState({
      textEditInput: text
    });
  }

  onClickSaveTextEntity = (type: 'UserName'): void => {
    const userId = this.state.userId;

    if (userId !== undefined && userId !== null) {
      if (type === 'UserName') {
        fetch(`./api/user/${userId}`, { method: 'PUT', body: JSON.stringify({ name: this.state.textEditInput!.trim() }) })
          .then((response: Response) => response.json())
          .then((value) => console.log(value));
        // TODO
      }
    }
  }

  render = () => {
    return (
      this.state.userId === undefined ? <></> : <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={typeof this.state.userId === 'string'}
                                           isBurgerOpen={this.state.isBurgerOpen}
                                           setIsBurgerOpen={this.setIsBurgerOpen}
                                           onClickHeaderLink={this.onClickHeaderLink} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile userName={this.state.userName} 
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
