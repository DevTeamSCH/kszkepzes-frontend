import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Container,
  Button,
  Segment,
  Image,
  Popup,
  Icon,
  Responsive,
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { getUserData } from '../actions';
import KSZKlogo from './images/kszk_logo.svg';

// Objects that will be converted to menu items in the render method
const menuItems = [
  {
    text: 'Főoldal',
    to: '/home',
    prefix: <Image size='mini' src={KSZKlogo} style={{ marginRight: '1.5em' }} />,
    permissionLevel: 0,
  },
  {
    text: 'Hírek',
    to: '/news',
    prefix: '',
    permissionLevel: 0,
  },
  {
    text: 'Köreink',
    to: '/groups',
    prefix: '',
    permissionLevel: 0,
  },
  {
    text: 'Ütemterv',
    to: '/schedule',
    prefix: '',
    permissionLevel: 1,
  },
  {
    text: 'Mentorok',
    to: '/mentors',
    prefix: '',
    permissionLevel: 2,
  },
  {
    text: 'Statisztika',
    to: '/statistics',
    prefix: '',
    permissionLevel: 3,
  },
  {
    text: 'Jelentkezések',
    to: '/applications',
    prefix: '',
    permissionLevel: 3,
  },
  {
    text: 'Házi feladatok',
    to: '/homework',
    prefix: '',
    permissionLevel: 2,
  },
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  // Fetch the userData-s
  UNSAFE_componentWillMount() {
    this.props.getUserData();
  }

  // Hide the menu after clicking an item on mobile
  handleOpen = () => {
    this.setState({ isOpen: true });
  }
  handleClose = () => {
    this.setState({ isOpen: false });
  }

  renderHeader(inHeader, hasArrowMenu) {
    let renderedItemNum = 0
    let current = 0
    let maxNum = 0
    if(this.props.user.id) {
      maxNum = menuItems.filter(item => {
        return this.props.user.permission >= item.permissionLevel
      }).length
    } else {
      maxNum = 3
    }
     
    return (
      <Segment inverted textAlign='center' vertical>
        <Container>
          <Menu inverted secondary size='large'>
            {/* Default Menu items */}
            {menuItems.map((item, i) => {
              if (item.permissionLevel === 0) {
                renderedItemNum += 1
                return (
                  <Menu.Item key={i} as={Link} to={item.to}>
                  {item.prefix}{item.text}
                </Menu.Item>
                )
              }else {
                return null
              }
              })
            }
            {/* After default menu items */}
            {menuItems.map((item, i) => {
              
              if (this.props.user.permission >= item.permissionLevel
              && item.permissionLevel > 0
              && renderedItemNum < inHeader
              && current < i) {
                renderedItemNum += 1
                current = i
                return (
                  <Menu.Item key={i} as={Link} to={item.to}>
                    {item.prefix}{item.text}
                  </Menu.Item>
                )
              } else {
                return null
              }
              })
            }
            {/* Arrow menu */}
            { this.props.user.id && (current + 1) < maxNum ?
              <Popup flowing hoverable inverted 
                trigger={
                  <Menu.Item>
                    <Icon name='angle down' size='large' />
                  </Menu.Item>
                }
                position='top center'
              >
                <Menu inverted secondary size='large'>
                  {menuItems.map((item, i) => {
                    return (this.props.user.permission >= item.permissionLevel
                      && item.permissionLevel > 0
                      && current < i ?
                        <Menu.Item key={i} as={Link} to={item.to}>
                            {item.prefix}{item.text}
                        </Menu.Item>
                      : null
                    )})
                  }
                </Menu>
              </Popup>
              : null
            }
            {/* Login Button */}
            <Menu.Item position='right'>
              {this.props.user.id ?
                <Button.Group>
                  <Button inverted as={Link} to='/profile'>Profilom</Button>
                  <Button as='a' href='/api/v1/logout/' icon='sign out' />
                </Button.Group>
                :
                <Button as='a' href='/api/v1/login/authsch/' inverted>Bejelentkezés</Button>
              }
            </Menu.Item>
          </Menu>
        </Container>
      </Segment>
    )
  }

  render() {
    return (
      <div>
        {/* Tablet, Computer, ... view */}
        <Responsive minWidth={600} maxWidth={700}>
          {this.renderHeader(3)}
        </Responsive>
        <Responsive minWidth={701} maxWidth={800}>
          {this.renderHeader(4)}
        </Responsive>
        <Responsive minWidth={801} maxWidth={1000}>
          {this.renderHeader(5)}
        </Responsive>
        <Responsive minWidth={1001} maxWidth={1100}>
          {this.renderHeader(6)}
        </Responsive>
        <Responsive minWidth={1101} maxWidth={1200}>
          {this.renderHeader(7)}
        </Responsive>
        <Responsive minWidth={1201}>
          {this.renderHeader(8)}
        </Responsive>
        {/* Mobile view */}
        <Responsive maxWidth={599}>
          <Segment inverted textAlign='center' vertical>
            <Container>
              <Menu inverted secondary size='large'>
                {/* kszk logo + home link */}
                <Menu.Item as={Link} to={menuItems[0].to}>
                  {menuItems[0].prefix}{menuItems[0].text}
                </Menu.Item>     
                {/* Sandwich menu */}
                <Popup flowing hoverable inverted trigger={
                    <Menu.Item onClick={this.handleClose} 
                    position='right'>
                      <Icon name='bars' size='large' />
                    </Menu.Item>
                  }
                  position='top center'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  on='click'
                  size='huge'
                >
                  <Menu vertical inverted secondary size='large'>
                    {menuItems.map((item, i) =>
                      ((this.props.user.permission >= item.permissionLevel 
                        ||item.permissionLevel === 0) && i>0?
                          <Menu.Item onClick={this.handleClose} 
                          key={i} as={Link} to={item.to}>
                            {item.prefix}{item.text}
                          </Menu.Item>
                          : null
                      ))
                    }
                    <Menu.Item>
                      {this.props.user.id ?
                        <Button.Group>
                          <Button onClick={this.handleClose} inverted as={Link} to='/profile'>Profilom</Button>
                          <Button onClick={this.handleClose} as='a' href='/api/v1/logout/' icon='sign out' />
                        </Button.Group>
                        :
                        <Button onClick={this.handleClose} as='a' href='/api/v1/login/authsch/' inverted>Bejelentkezés</Button>
                      }
                    </Menu.Item>
                  </Menu>
                </Popup>
              </Menu>
            </Container>
          </Segment>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { getUserData })(Header);