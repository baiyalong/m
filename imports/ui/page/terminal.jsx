import React, {Component, PropTypes} from 'react'
import {createContainer} from 'meteor/react-meteor-data'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
} from 'material-ui/Table'
import moment from 'moment'
import IconButton from 'material-ui/IconButton/IconButton';
import Insert from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Modal from '../component/modal'

const ellipsis = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
}

function getTableHeight() {
    return document.body.clientHeight - 56 - 56 - 49 - 1
}

class Terminal extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            action: null,
            e: {},
            height: getTableHeight(),
            title: '网络资源',
            code: 'volume'
        }
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
    openDialog(state) {
        if (state.action == 'remove') {
            var o = this.refs
            var a = Object
                .keys(o)
                .filter(e => o[e].props.selected)
            if (a.length == 0) 
                return
        }
        this.setState(Object.assign({
            open: true
        }, state))
    }
    closeDialog(e) {
        if (e) 
            this[this.state.action](e);
        this.setState({open: false, action: null, e: {}})
    }
    create(e) {
        this
            .props
            .create(e)
    }
    remove() {
        var o = this.refs
        var a = Object
            .keys(o)
            .filter(e => o[e].props.selected)
        this
            .props
            .remove(a)
    }
    render() {
        return (
            <div>
                <Table height={this.state.height + 'px'} multiSelectable={true}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>VOLUME NAME</TableHeaderColumn>
                            <TableHeaderColumn>MOUNTPOINT</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} deselectOnClickaway={false}>
                        {this
                            .props
                            .volumes
                            .map(e => {
                                return <TableRow key={e.NAME} ref={e.NAME}>
                                    <TableRowColumn >{e.NAME}</TableRowColumn>
                                    <TableRowColumn >{e.MOUNTPOINT}</TableRowColumn>
                                </TableRow>
                            })
}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn>
                                <div
                                    style={{
                                    position: 'relative',
                                    left: 0,
                                    top: '-15px'
                                }}>
                                    TOTAL: {this.props.volumes.length || 0}
                                </div>
                            </TableRowColumn>
                            <TableRowColumn>
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='刷新'
                                    tooltipPosition="top-center"
                                    onClick={() => this.props.refresh()}>
                                    <Refresh/>
                                </IconButton>
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='删除'
                                    tooltipPosition="top-center"
                                    onClick={() => this.openDialog({action: 'remove'})}>
                                    <Remove/>
                                </IconButton>
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='添加'
                                    tooltipPosition="top-center"
                                    onClick={() => this.openDialog({action: 'create'})}>
                                    <Insert/>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

                <Modal {...this.state} closeDialog={(e) => this.closeDialog(e)}/>
            </div>
        )
    }
}

import async from 'async'
import VolumeData from '../../api/volume/schema'

export default createContainer(({params}) => {
    Meteor.subscribe('volumes')
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
        },
        create: (e) => {
            async.series([
                callback => Meteor.call('volume.create', e, callback),
                callback => Meteor.call('volume.refresh', callback)
            ], callback)
        },
        remove: (a) => {
            async.series([
                callback => Meteor.call('volume.remove', a, callback),
                callback => Meteor.call('volume.refresh', callback)
            ], callback)
        },
        volumes: VolumeData
            .find()
            .fetch()
            .sort((a, b) => a.Created - b.Created)
            .map(e => {
                return {NAME: e.Name, MOUNTPOINT: e.Mountpoint}
            })
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