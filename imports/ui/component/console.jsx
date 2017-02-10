import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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

    handleClose() {
        this
            .props
            .closeDialog(this.state)
        this.state = {};
    };

    render() {
        const actions = [ < FlatButton label = "Cancel" primary = {
                true
            }
            onTouchTap = {
                () => this.handleClose()
            } />, < FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onTouchTap = {
                () => this.handleClose()
            } />
        ];

        const content = (
            <div>
                <textarea></textarea>
            </div>
        )

        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                autoScrollBodyContent={true}
                modal={true}
                contentStyle={customContentStyle}
                open={this.props.open}>
                {content}
            </Dialog>
        );
    }
}