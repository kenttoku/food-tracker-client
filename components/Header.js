import NProgress from 'nprogress';
import Router from 'next/router';

import Navbar from './Navbar';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <div>
    <Navbar />
  </div>
);

export default Header;