import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'



const ellipsis = {
    textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'
}


function getTableHeight() {
    return document.body.clientHeight - 56 - 56 - 49 - 1
}


class Image extends Component {
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
                            <TableHeaderColumn>REPOSITORY</TableHeaderColumn>
                            <TableHeaderColumn>TAG</TableHeaderColumn>
                            <TableHeaderColumn>IMAGE ID</TableHeaderColumn>
                            <TableHeaderColumn>CREATED</TableHeaderColumn>
                            <TableHeaderColumn>SIZE</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>
                                <IconButton tooltip='刷新' onClick={() => this.props.refresh()} >
                                    <Refresh />
                                </IconButton>
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false}>
                        {
                            this.props.images.map(e => {
                                return <TableRow key={e._id}>
                                    <TableRowColumn>{e.Id}</TableRowColumn>
                                    <TableRowColumn>{e.TAG}</TableRowColumn>
                                    <TableRowColumn>{e.IMAGE_ID}</TableRowColumn>
                                    <TableRowColumn>{e.CREATED}</TableRowColumn>
                                    <TableRowColumn>{e.SIZE}</TableRowColumn>
                                    <TableRowColumn width='10%'>
                                    </TableRowColumn>
                                </TableRow>
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn>
                                <div style={{ position: 'relative', left: 0, top: '-15px' }}>
                                    TOTAL: {this.props.images.length||0}
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
import ImageData from '../../api/image/schema'

export default createContainer(({ params }) => {
    Meteor.subscribe('images')
    return {
        refresh:()=>{
            Meteor.call('image.refresh')
        },
        images: ImageData.find(),
    }
}, Image)


// const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() })