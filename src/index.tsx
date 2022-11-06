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
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      isBurgerOpen: false
    };

    this.setIsBurgerOpen = this.setIsBurgerOpen.bind(this);
    this.onClickEditTextEntity = this.onClickEditTextEntity.bind(this);
  }

  componentDidMount = (): void => {
    setTimeout(() => {
      fetch('/.auth/me')
        .then((response: Response) => response.json())
        .then((authValue: { clientPrincipal: { identityProvider: 'aadb2c', userId: string } | null}) => {
          if (authValue.clientPrincipal !== null) {
            fetch(`./api/user/${authValue.clientPrincipal.userId}`)
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

  onClickEditTextEntity = (type: 'UserName'): void => {
    this.setState({
      textEditEntityType: type
    });
  }

  render = () => {
    return (
      this.state.userId === undefined ? <></> : <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={typeof this.state.userId === 'string'}
                                           isBurgerOpen={this.state.isBurgerOpen}
                                           setIsBurgerOpen={this.setIsBurgerOpen} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile userName={this.state.userName} 
                                                    onClickEditTextEntity={this.onClickEditTextEntity}
                                                    textEditEntityType={this.state.textEditEntityType} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
