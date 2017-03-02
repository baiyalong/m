import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <img
                    style={{
                    width: document.body.clientWidth - 200,
                    height: document.body.clientHeight - 60,
                }}
                    src='/moby.svg'/>
            </div>
        )
    }
}

Dashboard.defaultProps = {}

export default createContainer(({params}) => {
    return {};
}, Dashboard);
