import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Field from './field'

class Modal extends Component {
    constructor() {
        super()
        this.state = {};
    }
    closeDialog(state) {
        this
            .props
            .closeDialog(state)
        this.state = {};
    }
    render() {
        const actions = [ < FlatButton label = "取消" primary = {
                true
            }
            onTouchTap = {
                () => this.closeDialog()
            } />, < FlatButton label = "确定" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onTouchTap = {
                () => this.closeDialog(this.state)
            } />
        ]

        const content = (this.props.action == 'remove'
            ? <div style={{
                    textAlign: 'center'
                }}>确认要删除吗？</div>
            : <div>
                {this
                    .props
                    .fields[this.props.code]
                    .map(e => {
                        return <Field
                            {...e}
                            value={(() => this.props.e[e.code])()}
                            changeValue={(v) => this.setState({
                            [e.code]: v
                        })}
                            key={e.code}/>
                    })
}
            </div>)

        return (
            <Dialog
                title={this.props.title}
                modal={true}
                actions={actions}
                open={this.props.open}
                autoScrollBodyContent={this.props.action != 'remove'}
                onRequestClose={() => this.closeDialog()}>
                {content}
            </Dialog>
        )
    }
}

export default createContainer(({params}) => {
    return {
        fields: {
            network: [
                {
                    name: 'NAME',
                    code: 'NAME',
                    type: 'text'
                },
                // { name: 'SUBNET', code: 'SUBNET', type: 'text' }, { name: 'GATEWAY', code:
                // 'GATEWAY', type: 'text' },
            ],
            volume: [
                {
                    name: 'NAME',
                    code: 'NAME',
                    type: 'text'
                },
                //  { name: 'MOUNTPOINT', code: 'MOUNTPOINT', type: 'text' },
            ],
            process: [
                {
                    name: 'NAME',
                    code: 'NAME',
                    type: 'text'
                }, {
                    name: 'IMAGE',
                    code: 'IMAGE',
                    type: 'select',
                    options: []
                }, {
                    name: 'NETWORK',
                    code: 'NETWORK',
                    type: 'select',
                    options: []
                }, {
                    name: 'NETWORK PORT',
                    code: 'NETWORK_PORT',
                    type: 'text'
                }, {
                    name: 'VOLUME',
                    code: 'VOLUME',
                    type: 'select',
                    options: []
                }, {
                    name: 'VOLUME PATH',
                    code: 'VOLUME_PATH',
                    type: 'text'
                }
            ]
        }
    }
}, Modal)