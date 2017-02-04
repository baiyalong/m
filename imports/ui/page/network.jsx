import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table'
import moment from 'moment'



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
                            <TableHeaderColumn width='15%'>Network ID</TableHeaderColumn>
                            <TableHeaderColumn>REPO TAGS</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>CREATED</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>SIZE</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false}>
                        {
                            this.props.Networks.map(e => {
                                return <TableRow key={e.Network_ID}>
                                    <TableRowColumn width='15%'>{e.Network_ID}</TableRowColumn>
                                    <TableRowColumn>{e.REPO_TAGS}</TableRowColumn>
                                    <TableRowColumn width='10%'>{e.CREATED}</TableRowColumn>
                                    <TableRowColumn width='10%'>{e.SIZE}</TableRowColumn>
                                </TableRow>
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn>
                                <div style={{ position: 'relative', left: 0, top: '-15px' }}>
                                    TOTAL: {this.props.Networks.length||0}
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

export default createContainer(({ params }) => {
    return {
        refresh:()=>{
            Meteor.call('Network.refresh')
        },
        Networks: NetworkData.find().fetch().sort((a,b)=>a.Created<b.Created).map(e=>{
            return {
                Network_ID:e.Id.split(':')[1].slice(0,12),
                REPO_TAGS:JSON.stringify(e.RepoTags),
                CREATED:moment(new Date(e.Created*1000)).format('YYYY-MM-DD'),
                SIZE:e.Size>=1000*1000?Math.round(e.Size/1000/1000)+' MB':Math.round(e.Size/1000)+' kB'
            }
        }),
    }
}, Network)


// const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() })