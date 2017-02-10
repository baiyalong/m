import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Terminal from 'xterm'

const customContentStyle = {
    width: '100%',
    maxWidth: 'none'
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
        var term = new Terminal({
            cursorBlink: true, // Do not blink the terminal's cursor
            cols: 120, // Set the terminal's width to 120 columns
            rows: 80 // Set the terminal's height to 80 rows
        });
        term.open(document.getElementById('terminal'));
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
                <div id='terminal'></div>
            </Dialog>
        );
    }
}