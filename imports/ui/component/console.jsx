import React from 'react';
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
export default class Console extends React.Component {
    constructor() {
        super()
        this.state = {};
    }
    connect() {
        var term = new Terminal();
        term.open(document.getElementById('terminal'));
        term.fit()
        term.write('Hello wrold ! ')
    }
    disconnect() {}
    handleClose() {
        this
            .props
            .closeDialog(this.state)
        this.state = {};
    };

    render() {
        const actions = [ < FlatButton label = "Connect" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onTouchTap = {
                () => this.connect()
            } />, < FlatButton label = "Disconnect" primary = {
                true
            }
            onTouchTap = {
                () => this.disconnect()
            } />, < FlatButton label = "Close" primary = {
                true
            }
            onTouchTap = {
                () => this.handleClose()
            } />
        ];

        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                autoScrollBodyContent={true}
                modal={true}
                contentStyle={customContentStyle}
                open={this.props.open}>
                <div id='terminal' style={terminal}></div>
            </Dialog>
        );
    }
}