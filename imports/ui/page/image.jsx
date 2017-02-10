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
import IconButton from 'material-ui/IconButton/IconButton'
import moment from 'moment'
import Refresh from 'material-ui/svg-icons/navigation/refresh';

const lineHeight = {
    height: 12
}

const ellipsis = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
}

function getTableHeight() {
    return document.body.clientHeight - 56 - 56 - 49 - 1
}

class Image extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            action: null,
            e: {},
            height: getTableHeight()
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
    render() {
        return (
            <div>
                <Table height={this.state.height + 'px'}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>REPO TAGS</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>SIZE</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>CREATED</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false}>
                        {this
                            .props
                            .images
                            .map(e => {
                                return <TableRow key={e.IMAGE_ID} style={lineHeight}>
                                    <TableRowColumn style={lineHeight}>{e.REPO_TAGS}</TableRowColumn>
                                    <TableRowColumn style={lineHeight} width='10%'>{e.SIZE}</TableRowColumn>
                                    <TableRowColumn style={lineHeight} width='10%'>{e.CREATED}</TableRowColumn>
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
                                    TOTAL: {this.props.images.length || 0}
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

export default createContainer(({params}) => {
    Meteor.subscribe('images')
    return {
        refresh: () => {
            Meteor.call('image.refresh', callback)
        },
        images: ImageData
            .find()
            .fetch()
            .sort((a, b) => a.Created - b.Created < 0)
            .map(e => {
                return {
                    IMAGE_ID: e
                        .Id
                        .split(':')[1]
                        .slice(0, 12),
                    REPO_TAGS: JSON.stringify(e.RepoTags),
                    CREATED: moment(new Date(e.Created * 1000)).format('YYYY-MM-DD'),
                    SIZE: e.Size >= 1000 *1000
                        ? Math.round(e.Size / 1000 / 1000) + ' MB'
                        : Math.round(e.Size / 1000) + ' kB'
                }
            })
    }
}, Image)

const callback = (err, res) => Session.set('Info', {
    level: err
        ? '错误'
        : '信息',
    message: err
        ? err.message
        : '操作成功',
    timestamp: Date()
})