import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';


class Dashboard extends Component {
    render() {
        return (
            <div>
            </div>
        )
    }
}


Dashboard.defaultProps = {
}


export default createContainer(({ params }) => {
    return {
    };
}, Dashboard);






