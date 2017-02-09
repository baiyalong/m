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
            .closeDialog(state)
        this.state = {};
    };

    render() {
        return (
            <Dialog
                title="Dialog With Custom Width"
                modal={true}
                contentStyle={customContentStyle}
                open={this.props.open}>
                This dialog spans the entire width of the screen.
            </Dialog>
        );
    }
}