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
  isLoggedIn?: boolean;
  isBurgerOpen: boolean;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      isBurgerOpen: false
    };

    this.setIsBurgerOpen = this.setIsBurgerOpen.bind(this);
  }

  componentDidMount = (): void => {
    setTimeout(() => {
      fetch('/.auth/me')
        .then((response: Response) => response.json())
        .then((value: { clientPrincipal: { identityProvider: 'aadb2c', userId: string } | null}) => {
          this.setState({
            isLoggedIn: value.clientPrincipal !== null
          });
        })
        .catch(() => {
          this.setState({
            isLoggedIn: false
          });
        });
      }, 1000);
  }

  setIsBurgerOpen = (isBurgerOpen: boolean): void => {
    this.setState({
      isBurgerOpen: isBurgerOpen
    });
  }

  render = () => {
    return (
      this.state.isLoggedIn == undefined ? <></> : <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={this.state.isLoggedIn}
                                           isBurgerOpen={this.state.isBurgerOpen}
                                           setIsBurgerOpen={this.setIsBurgerOpen} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
