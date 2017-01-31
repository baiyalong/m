import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Snackbar from 'material-ui/Snackbar';


class Info extends Component {
    render() {
        const info = {
            action: this.props.Info.level || '错误',
            open: !!this.props.Info.message,
            message: this.props.Info.message
        }
        return (
            <Snackbar {...info} />
        )
    }
}


Info.defaultProps = {
    Info: {
        level: '错误',
        message: '',
    }

}


export default createContainer(({ params }) => {
    return {
        Info: Session.get('Info')
    };
}, Info);






