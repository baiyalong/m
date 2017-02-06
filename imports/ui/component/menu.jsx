import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import Menus from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Image from 'material-ui/svg-icons/image/hdr-weak';
import Network from 'material-ui/svg-icons/action/language';
import Volume from 'material-ui/svg-icons/device/storage';
import Process from 'material-ui/svg-icons/action/settings';
import Instructions from 'material-ui/svg-icons/action/assignment';


const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: 0,
        height: '100%'
    }
};


class Menu extends Component {
    constructor() {
        super();
        this.state = {}
    }
    nav(path) {
        browserHistory.push(path)
    }
    render() {
        return (
            <Paper style={style.paper}>
                <Menus>
                    <MenuItem primaryText="控制面板" leftIcon={<Dashboard />} onClick={() => this.nav('dashboard') }/>
                    <Divider />
                    <MenuItem primaryText="网络资源" leftIcon={<Network />} onClick={() => this.nav('network') }/>
                    <MenuItem primaryText="计算资源" leftIcon={<Process />} onClick={() => this.nav('process') }/>
                    <MenuItem primaryText="存储资源" leftIcon={<Volume />} onClick={() => this.nav('volume') }/>
                    <Divider />
                    <MenuItem primaryText="容器镜像" leftIcon={<Image />} onClick={() => this.nav('image') }/>
                    <MenuItem primaryText="使用说明" leftIcon={<Instructions />} onClick={() => this.nav('instructions') }/>
                </Menus>
            </Paper>
        )
    }
}



export default Menu;