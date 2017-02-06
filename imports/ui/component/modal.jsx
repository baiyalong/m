import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';



export default class Modal extends Component {
    constructor() {
        super()
        this.state = {};
    }
    closeDialog(state) {
        this.props.closeDialog(state)
        this.state = {};
    }
    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={() => this.closeDialog()} />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.closeDialog(this.state)} />,
        ]
        const fields = {
            network : [
                        { name: 'NAME', code: 'NAME', type: 'text' },
                        // { name: 'SUBNET', code: 'SUBNET', type: 'text' },
                        // { name: 'GATEWAY', code: 'GATEWAY', type: 'text' },
                    ]
        } 
        const content = (
            this.props.action == 'remove'
                ?
                <div style={{ textAlign: 'center' }}>确认要删除吗？</div>
                :
                <div>
                    {
                        fields[this.props.code].map(e => {
                            return <Field
                                {...e}
                                value={(() => this.props.e[e.code])()}
                                changeValue={(v) => this.setState({ [e.code]: v })}
                                key={e.code} />
                        })
                    }
                </div>
        )

        return (
            <Dialog
                title={this.props.title}
                modal={true}
                actions={actions}
                open={this.props.open}
                autoScrollBodyContent={this.props.action != 'remove'}
                onRequestClose={() => this.closeDialog()} >
                {content}
            </Dialog>
        )
    }
}


class Field extends Component {
    constructor(props) {
        super()
        this.state = { value: props.value };
    }
    render() {
        return <TextField
                type='text'
                floatingLabelText={this.props.name}
                value={this.state.value || ''}
                onChange={(event, value) => { this.setState({ value }); this.props.changeValue(value) } }
                fullWidth={true}
                multiLine={this.props.multiLine} />
    }
}