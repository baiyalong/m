import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';


class Volume extends Component {
    render() {
        return (
            <div>
                Volume
            </div>
        )
    }
}


Volume.defaultProps = {
}


export default createContainer(({ params }) => {
    return {
    };
}, Volume);






