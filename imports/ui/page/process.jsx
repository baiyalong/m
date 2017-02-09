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
import ConsoleIcon from 'material-ui/svg-icons/av/featured-play-list';
import Start from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Stop from 'material-ui/svg-icons/av/stop';
import Kill from 'material-ui/svg-icons/content/clear';
import Restart from 'material-ui/svg-icons/av/replay';
import Insert from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Modal from '../component/modal'
import Console from '../component/console'

const ellipsis = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
}

function getTableHeight() {
    return document.body.clientHeight - 56 - 56 - 49 - 1
}

class Process extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            action: null,
            e: {},
            height: getTableHeight(),
            title: '计算资源',
            code: 'process',
            console: false
        }
        window.onresize = this
            .resize
            .bind(this)
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
        this.setState(Object.assign(state, {
            open: false,
            action: null,
            e: {}
        }))
    }
    openConsole() {
        this.setState({console: true})
    }
    closeConsole() {
        this.setState({console: false})
    }
    create(e) {
        this
            .props
            .create(e)
    }
    remove() {
        this
            .props
            .remove(this.get_selected())
    }
    get_selected() {
        var o = this.refs
        var a = Object
            .keys(o)
            .filter(e => o[e].props.selected)
        return a
    }
    action(c) {
        this
            .props
            .action(this.get_selected(), c)
    }
    render() {
        return (
            <div>
                <Table height={this.state.height + 'px'} multiSelectable={true}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>NAME</TableHeaderColumn>
                            <TableHeaderColumn>IMAGE</TableHeaderColumn>
                            <TableHeaderColumn>NETWORK</TableHeaderColumn>
                            <TableHeaderColumn>VOLUME</TableHeaderColumn>
                            <TableHeaderColumn>STATUS</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} deselectOnClickaway={false}>
                        {this
                            .props
                            .processes
                            .map(e => {
                                return <TableRow key={e.CONTAINER_ID} ref={e.CONTAINER_ID}>
                                    <TableRowColumn >{e.NAME}</TableRowColumn>
                                    <TableRowColumn >{e.IMAGE}</TableRowColumn>
                                    <TableRowColumn >{e.NETWORK + e.NETWORK_PORT}</TableRowColumn>
                                    <TableRowColumn >{e.VOLUME + e.VOLUME_PATH}</TableRowColumn>
                                    <TableRowColumn >{e.STATUS}</TableRowColumn>
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
                                    TOTAL: {this.props.processes.length || 0}
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
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='Console'
                                    tooltipPosition="top-center"
                                    onClick={() => {
                                    this.openConsole()
                                }}>
                                    <ConsoleIcon/>
                                </IconButton>
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='Kill'
                                    tooltipPosition="top-center"
                                    onClick={() => {
                                    this.action('kill')
                                }}>
                                    <Kill/>
                                </IconButton>
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='重启'
                                    tooltipPosition="top-center"
                                    onClick={() => {
                                    this.action('restart')
                                }}>
                                    <Restart/>
                                </IconButton>
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='停止'
                                    tooltipPosition="top-center"
                                    onClick={() => {
                                    this.action('stop')
                                }}>
                                    <Stop/>
                                </IconButton>
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='暂停'
                                    tooltipPosition="top-center"
                                    onClick={() => {
                                    this.action('pause')
                                }}>
                                    <Pause/>
                                </IconButton>
                                <IconButton
                                    style={{
                                    float: 'right'
                                }}
                                    tooltip='启动'
                                    tooltipPosition="top-center"
                                    onClick={() => {
                                    this.action('start')
                                }}>
                                    <Start/>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

                <Modal
                    {...this.state}
                    images={this.props.images}
                    networks={this.props.networks}
                    volumes={this.props.volumes}
                    closeDialog={(e) => this.closeDialog(e)}/>

                <Console open={this.state.console} closeDialog={e => this.closeConsole(e)}/>
            </div>
        )
    }
}

import async from 'async'
import ProcessData from '../../api/process/schema'
import ImageData from '../../api/image/schema'
import NetworkData from '../../api/network/schema'
import VolumeData from '../../api/volume/schema'

export default createContainer(({params}) => {
    Meteor.subscribe('processes')
    Meteor.subscribe('images')
    Meteor.subscribe('networks')
    Meteor.subscribe('volumes')
    return {
        refresh: () => {
            Meteor.call('process.refresh', callback)
        },
        create: (e) => {
            async.series([
                callback => Meteor.call('process.create', e, callback),
                callback => Meteor.call('process.refresh', callback)
            ], callback)
        },
        remove: (a) => {
            async.series([
                callback => Meteor.call('process.remove', a, callback),
                callback => Meteor.call('process.refresh', callback)
            ], callback)
        },
        action: (a, c) => {
            async.series([
                callback => Meteor.call('process.' + c, a, callback),
                callback => Meteor.call('process.refresh', callback)
            ], callback)
        },
        processes: ProcessData
            .find()
            .fetch()
            .sort((a, b) => a.Created - b.Created)
            .map(e => {
                return {
                    CONTAINER_ID: e
                        .Id
                        .slice(0, 12),
                    NAME: e.Name,
                    IMAGE: e.Image,
                    NETWORK: e.Network,
                    NETWORK_PORT: e.Network_port,
                    VOLUME: e.Volume,
                    VOLUME_PATH: e.Volume_path,
                    STATUS: e.Status,
                    CREATED: moment(new Date(e.Created * 1000)).format('YYYY-MM-DD')
                }
            }),
        images: ImageData
            .find()
            .fetch()
            .sort((a, b) => a.Created - b.Created < 0)
            .map(e => {
                return {
                    value: e.RepoTags[0],
                    name: JSON.stringify(e.RepoTags)
                }
            }),
        networks: NetworkData
            .find()
            .fetch()
            .sort((a, b) => a.Created - b.Created)
            .map(e => {
                return {value: e.Name, name: e.Name}
            }),
        volumes: VolumeData
            .find()
            .fetch()
            .sort((a, b) => a.Created - b.Created)
            .map(e => {
                return {value: e.Name, name: e.Name}
            })
    }
}, Process)

const callback = (err, res) => Session.set('Info', {
    level: err
        ? '错误'
        : '信息',
    message: err
        ? err.message
        : '操作成功',
    timestamp: Date()
})