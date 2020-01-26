import React, { useState } from 'react';
import { Icon, Menu, Sidebar, Container } from 'semantic-ui-react';
import MenuBar from './MenuBar';
import Inicio from '../pages/Inicio';

const SideBar = () => {
  const [visible, setVisible] = useState(false);

  const sideBarToggle = () => {
    !visible ? setVisible(true) : setVisible(false);
  };

  return (
    <Sidebar.Pushable>
      <Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible={visible} width='thin'>
        <Menu.Item as='a'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
          Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Menu pointing color='blue' fixed='top'>
          <Menu.Item icon='bars' onClick={sideBarToggle} />
          <MenuBar sideBarToggle={sideBarToggle} />
        </Menu>
        <Container>
          <Inicio />
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SideBar;
