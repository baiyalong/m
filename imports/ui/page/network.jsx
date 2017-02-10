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

class Network extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            action: null,
            e: {},
            height: getTableHeight(),
            title: '网络资源',
            code: 'network'
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
                            <TableHeaderColumn>NAME</TableHeaderColumn>
                            <TableHeaderColumn>SUBNET</TableHeaderColumn>
                            <TableHeaderColumn>GATEWAY</TableHeaderColumn>
                            <TableHeaderColumn>CREATED</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} deselectOnClickaway={false}>
                        {this
                            .props
                            .networks
                            .map(e => {
                                return <TableRow key={e.Network_ID} ref={e.Network_ID}>
                                    <TableRowColumn >{e.NAME}</TableRowColumn>
                                    <TableRowColumn >{e.IPAM_SUBNET}</TableRowColumn>
                                    <TableRowColumn >{e.IPAM_GATEWAY}</TableRowColumn>
                                    <TableRowColumn >{e.CREATED}</TableRowColumn>
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
                                    TOTAL: {this.props.networks.length || 0}
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
import NetworkData from '../../api/network/schema'

export default createContainer(({params}) => {
    Meteor.subscribe('networks')
    return {
        refresh: () => {
            Meteor.call('network.refresh', callback)
        },
        create: (e) => {
            async.series([
                callback => Meteor.call('network.create', e, callback),
                callback => Meteor.call('network.refresh', callback)
            ], callback)
        },
        remove: (a) => {
            async.series([
                callback => Meteor.call('network.remove', a, callback),
                callback => Meteor.call('network.refresh', callback)
            ], callback)
        },
        networks: NetworkData
            .find()
            .fetch()
            .sort((a, b) => a.Created - b.Created)
            .map(e => {
                return {
                    Network_ID: e
                        .Id
                        .slice(0, 12),
                    NAME: e.Name,
                    IPAM_SUBNET: e.IPAM_Subnet,
                    IPAM_GATEWAY: e.IPAM_Gateway,
                    CREATED: moment(e.Created).format('YYYY-MM-DD')
                }
            })
    }
}, Network)

const callback = (err, res) => Session.set('Info', {
    level: err
        ? '错误'
        : '信息',
    message: err
        ? err.message
        : '操作成功',
    timestamp: Date()
})