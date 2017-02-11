import React from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Terminal from 'xterm'

const customContentStyle = {
    width: '100%',
    maxWidth: 'none'
}

const terminal = {
    width: 800,
    height: 450,
    margin: '0 auto',
    padding: 2,
    backgroundColor: '#111',
    color: '#fafafa'
}

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
class Console extends React.Component {
    constructor() {
        super()
        this.state = {
            terminal: null
        };
    }
    componentWillMount() {
        console.log('componentWillMount')
    }
    componentDidMount() {
        console.log('componentDidMount')
    }
    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps', newProps)
        if (newProps.open) 
            this.props.console(newProps.id, {
                h: 600,
                w: 800
            })
    }
    shouldComponentUpdate(newProps, newState) {
        console.log('shouldComponentUpdate', newProps, newState);
        return true
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate', nextProps, nextState)
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate', prevProps, prevState)
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    connect() {
        var term = new Terminal();
        term.open(document.getElementById('terminal-container'));
        // term.fit()
        term.write('Hello wrold ! ')
        this.setState({terminal: term})
    }
    disconnect() {
        var term = this.state.terminal
        term && term.destroy()
        this.setState({terminal: null})
    }
    handleClose() {
        this.disconnect()
        this
            .props
            .closeDialog(this.state)
        this.state = {};
    };

    render() {
        const actions = [< FlatButton label = "Close" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onTouchTap = {
                () => this.handleClose()
            } />];

        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                autoScrollBodyContent={true}
                modal={true}
                contentStyle={customContentStyle}
                open={this.props.open}>
                <div id='terminal-container' style={terminal}></div>
            </Dialog>
        );
    }
}

var async = require('async')
export default createContainer(({params}) => {
    return {
        console: (id, size) => {
            async.waterfall([
                callback => Meteor.call('process.console_open', id, callback),
                (res, callback) => Meteor.call('process.console_resize', res.id, size, callback)
            ], err => err
                ? console.log(err)
                : null)
        }
    }
}, Console)