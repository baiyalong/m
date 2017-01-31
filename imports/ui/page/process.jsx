import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';


class Process extends Component {
    render() {
        return (
            <div>
                Process
            </div>
        )
    }
}


Process.defaultProps = {
}


export default createContainer(({ params }) => {
    return {
    };
}, Process);






