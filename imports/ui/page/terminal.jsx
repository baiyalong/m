import React, {Component, PropTypes} from 'react'
import {createContainer} from 'meteor/react-meteor-data'

function getTableHeight() {
    return document.body.clientHeight - 56 - 56 - 49 - 1
}

class Terminal extends Component {
    constructor() {
        super()
        window.onresize = this
            .resize
            .bind(this)
    }
    componentWillMount() {
        this
            .props
            .refresh()
    }
    resize() {
        this.setState({height: getTableHeight()})
    }
    render() {
        return (
            <div>
                Terminal
            </div>
        )
    }
}

import async from 'async'

export default createContainer(({params}) => {
    return {
        refresh: () => {
            // Meteor.call('volume.refresh', callback) Hack
            // https://github.com/socketio/socket.io-client/issues/961
            import Response from 'meteor-node-stubs/node_modules/http-browserify/lib/response';
            if (!Response.prototype.setEncoding) {
                Response.prototype.setEncoding = function (encoding) {
                    // do nothing
                }
            }

            // Socket io client
            const IP = '10.192.25.123';
            const PORT = 3002;
            let socket = require('socket.io-client')(`http://${IP}:${PORT}`);

            socket.on('connect', function () {
                console.log('Client connected');
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        }
    }
}, Terminal)

const callback = (err, res) => Session.set('Info', {
    level: err
        ? '错误'
        : '信息',
    message: err
        ? err.message
        : '操作成功',
    timestamp: Date()
})