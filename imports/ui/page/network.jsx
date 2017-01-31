import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';


class Network extends Component {
    render() {
        return (
            <div>
                Network
            </div>
        )
    }
}


Network.defaultProps = {
}


export default createContainer(({ params }) => {
    return {
    };
}, Network);






