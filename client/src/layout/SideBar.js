import React, { useState } from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';

const SideBar = () => {
  const { visible, setVisible } = useState(false);

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'>
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
        <Segment basic>
          <Header as='h3'>
            Application Content{' '}
            <Button icon>
              <Icon name='bars' size='small' />
            </Button>
          </Header>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SideBar;

// import PropTypes from 'prop-types';
// import React, { Component, useState } from 'react';
// import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';

// const VerticalSidebar = ({ animation, direction, visible }) => (
//   <Sidebar
//     as={Menu}
//     animation='push'
//     direction={direction}
//     icon='labeled'
//     inverted
//     vertical
//     visible={visible}
//     width='thin'>
//     <Menu.Item as='a'>
//       <Icon name='home' />
//       Home
//     </Menu.Item>
//     <Menu.Item as='a'>
//       <Icon name='gamepad' />
//       Games
//     </Menu.Item>
//     <Menu.Item as='a'>
//       <Icon name='camera' />
//       Channels
//     </Menu.Item>
//   </Sidebar>
// );

// // VerticalSidebar.propTypes = {
// //   animation: PropTypes.string,
// //   direction: PropTypes.string,
// //   visible: PropTypes.bool,
// // };

// // export default class SidebarExampleTransitions extends Component {
// //   state = {
// //     animation: '',
// //     direction: 'left',
// //     visible: false,
// //   };

// //   handleAnimationChange = animation => () => this.setState(prevState => ({ animation, visible: !prevState.visible }));

// //   render() {
// //     const { animation, direction, visible } = this.state;
// const SideBar = () => {
//   const [animation, setAnimation] = useState('');
//   // const

//   const handleAnimationChange = animation => () =>
//     setAnimation(prevState => ({ animation, visible: !prevState.visible }));

//   return (
//     <div>
//       <Header as='h5'>All Direction Animations</Header>
//       <Button onClick={handleAnimationChange('push')}>Push</Button>

//       <Sidebar.Pushable as={Segment}>
//         {/* <VerticalSidebar animation={animation} direction={direction} visible={visible} /> */}
//         <VerticalSidebar animation='push' direction='left' visible={false} />
//         <Sidebar.Pusher>
//           <Segment basic>
//             <Header as='h3'>Application Content</Header>
//             <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
//           </Segment>
//         </Sidebar.Pusher>
//       </Sidebar.Pushable>
//     </div>
//   );
// };
// // }

// export default SideBar;
