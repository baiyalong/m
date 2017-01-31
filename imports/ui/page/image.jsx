import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';


class Image extends Component {
    render() {
        return (
            <div>
                Image
            </div>
        )
    }
}


Image.defaultProps = {
}


export default createContainer(({ params }) => {
    return {
    };
}, Image);






