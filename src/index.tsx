import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import './index.css';

interface AppState {
  isLoggedIn: boolean;
  isBurgerOpen: boolean;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    const cookies = document.cookie.split(';');

    const staticWebAppsAuthCookieExists = cookies.some((item: string) => item.trim().startsWith('StaticWebAppsAuthCookie='));
    const appServiceAuthSessionExists = cookies.some((item: string) => item.trim().startsWith('AppServiceAuthSession='));

    this.state = {
      isLoggedIn: staticWebAppsAuthCookieExists && appServiceAuthSessionExists,
      isBurgerOpen: false
    };

    this.toggleIsBurgerOpen = this.toggleIsBurgerOpen.bind(this);
  }

  toggleIsBurgerOpen = (event: React.MouseEvent<SVGSVGElement>): void => {
    this.setState((state: AppState, props: Readonly<{}>) => ({
      isBurgerOpen: !state.isBurgerOpen
    }));
  }

  render = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={this.state.isLoggedIn}
                                           isBurgerOpen={this.state.isBurgerOpen}
                                           toggleIsBurgerOpen={this.toggleIsBurgerOpen} />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
