
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import async from 'async';
import { Session } from 'meteor/session';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { indigo500 } from 'material-ui/styles/colors';


const style = {
  page: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    height: 360,
    width: 300,
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
  }
}


class Register extends Component {

  register() {
    let username = this.refs.username.input.value;
    let password = this.refs.password.input.value;
    this.props.register(username, password)
  }
  enter(e) {
    if (e.key === 'Enter') this.register()
  }
  render() {
    return (
      <div style={style.page}>
        <Paper style={style.paper}>
          <br />
          <br />
          <h1>{this.props.title}</h1>
          <br />
          <TextField floatingLabelText="用户名" type='text' ref='username' onKeyDown={this.enter.bind(this)} />
          <TextField floatingLabelText="密码" type='password' ref='password' onKeyDown={this.enter.bind(this)} />
          <br />
          <br />
          <br />
          <br />
          <RaisedButton label="注册" style={{ width: 256 }} backgroundColor={indigo500} labelColor='white' onClick={this.register.bind(this)} />
        </Paper>
      </div>
    )
  }
}




export default createContainer(({ params }) => {
  return {
    title: '开发环境',
    register: (username, password) => async.series([
      callback => {
        var error = null;
        if (password == '') error = '密码不能为空！'
        if (username == '') error = '用户名不能为空！'
        callback(error ? new Error(error) : null)
      },
      callback => Meteor.loginWithPassword(username, password, callback),
      callback => Meteor.logoutOtherClients(callback)
    ], err => err ? Session.set('Info', { message: err.message, timestamp: Date() }) : browserHistory.push('admin'))
  };
}, Register);



