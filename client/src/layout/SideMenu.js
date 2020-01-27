import React, { useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

const SideMenu = () => {
  const { user } = useContext(AuthContext);

  const [activeItem, setActiveItem] = useState();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Fragment>
      <Menu.Item style={{ padding: '20px 0' }}>
        <div>
          <Image
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            avatar
            style={{ marginRight: 10 }}
          />
          <span>{user.username}</span>
        </div>
      </Menu.Item>
      <Menu.Item name='inicio' active={activeItem === 'inicio'} onClick={handleItemClick} as={Link} to='/inicio' />
      <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={handleItemClick} />
      <Menu.Item
        name='configuracion'
        active={activeItem === 'configuracion'}
        onClick={handleItemClick}
        as={Link}
        to='/configuracion'>
        Configuración
      </Menu.Item>
    </Fragment>
  );
};

export default SideMenu;
