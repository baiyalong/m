import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import IconButton from 'material-ui/IconButton';
import Power from 'material-ui/svg-icons/action/power-settings-new';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { indigo500 } from 'material-ui/styles/colors';
import { Session } from 'meteor/session';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



class Header extends Component {
  constructor() {
    super()
    this.state = { open: false };
  }
  openDialog() {
    this.setState({ open: true })
  }
  closeDialog(b) {
    this.setState({ open: false })
    if (b) this.props.logout()
  }
  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={() => this.closeDialog()}
        />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.closeDialog(true)}
        />,
    ];
    return (
      <div>
        <Toolbar style={{ backgroundColor: indigo500 }}>
          <ToolbarTitle text={this.props.title} style={{ color: 'white' }} />
          <ToolbarGroup >
            <ToolbarTitle text={this.props.username} style={{ color: 'white' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
              <IconButton tooltip='注销' onClick={() => this.openDialog()} style={{ zIndex: 1 }}>
                <Power color={'white'} />
              </IconButton>
            </div>
          </ToolbarGroup>
        </Toolbar>
        <Dialog
          title="注销"
          actions={actions}
          open={this.state.open}
          onRequestClose={() => this.closeDialog()}
          >
          <div style={{ textAlign: 'center' }}>确认要注销吗？</div>
        </Dialog>
      </div>
    )
  }
}


export default createContainer(({ params }) => {
  return {
    title: '开发环境',
    subtitle: Session.get('subtitle') || '',
    username: Meteor.user() && Meteor.user().username,
    logout: () => Meteor.logout(err => err ? Session.set('Info', { message: err.message, timestamp: Date() }) : browserHistory.push('login'))
  };
}, Header);


