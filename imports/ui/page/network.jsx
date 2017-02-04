import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table'
import moment from 'moment'

const lineHeight = {
    height:12
}

const ellipsis = {
    textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'
}


function getTableHeight() {
    return document.body.clientHeight - 56 - 56 - 49 - 1
}


class Network extends Component {
    constructor() {
        super()
        this.state = { open: false, action: null, e: {}, height: getTableHeight() }
        window.onresize = this.resize.bind(this)
    }
    resize() {
        this.setState({ height: getTableHeight() })
    }
    render() {
        return (
            <div>
                <Table height={this.state.height + 'px'}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Network ID</TableHeaderColumn>
                            <TableHeaderColumn>NAME</TableHeaderColumn>
                            <TableHeaderColumn>IPAM_SUBNET</TableHeaderColumn>
                            <TableHeaderColumn>IPAM_GATEWAY</TableHeaderColumn>
                            <TableHeaderColumn>CREATED</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false}>
                        {
                            this.props.networks.map(e => {
                                return <TableRow style={lineHeight} key={e.Network_ID}>
                                    <TableRowColumn style={lineHeight}>{e.Network_ID}</TableRowColumn>
                                    <TableRowColumn style={lineHeight}>{e.NAME}</TableRowColumn>
                                    <TableRowColumn style={lineHeight}>{e.IPAM_SUBNET}</TableRowColumn>
                                    <TableRowColumn style={lineHeight}>{e.IPAM_GATEWAY}</TableRowColumn>
                                    <TableRowColumn style={lineHeight}>{e.CREATED}</TableRowColumn>
                                </TableRow>
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn>
                                <div style={{ position: 'relative', left: 0, top: '-15px' }}>
                                    TOTAL: {this.props.networks.length||0}
                                </div>
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        )
    }
}


import async from 'async'
import NetworkData from '../../api/network/schema'

export default createContainer(({ params }) => {
    Meteor.subscribe('networks')
    return {
        refresh:()=>{
            Meteor.call('network.refresh')
        },
        networks: NetworkData.find().fetch().sort((a,b)=>a.Created-b.Created).map(e=>{
            return {
                Network_ID:e.Id.slice(0,12),
                NAME:e.Name,
                IPAM_SUBNET:e.IPAM_Subnet,
                IPAM_GATEWAY:e.IPAM_Gateway,
                CREATED:moment(e.Created).format('YYYY-MM-DD')
            }
        }),
    }
}, Network)


// const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() })