import React, { useContext, useState } from 'react';
import { Button, Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  // console.log(user);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Container>
      <Menu.Item name={user.username} active as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
        <Menu.Item name='logout' onClick={logout} />
      </Menu.Menu>
    </Container>
  ) : (
    <Container>
      <Menu.Item name='home' active={activeItem === 'home'} onClick={handleItemClick} as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item
          className='right-menu-border'
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
      </Menu.Menu>
    </Container>
  );

  return menuBar;
};

export default MenuBar;
