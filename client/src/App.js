import React, { useContext, Fragment } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.css';
import './App.css';

import { AuthContext, AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './layout/MenuBar';
import Home from './pages/Home';
// import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Register from './pages/Register';
import SideBar from './layout/SideBar';

const App = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  return (
    <AuthProvider>
      <Router>
        {/* {user ? ( */}
        <Route exact path='/sidebar' component={SideBar} />
        <Fragment>
          <Container style={{ paddingTop: '5rem' }}>
            {/* <MenuBar Link={Link} /> */}
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/inicio' component={Inicio} /> */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Container>
        </Fragment>
        {/* ) : (
          // <Redirect to='/login' />
        )} */}
      </Router>
    </AuthProvider>
  );
};

export default App;
