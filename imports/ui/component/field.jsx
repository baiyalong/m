import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Field extends Component {
    constructor(props) {
        super()
        this.state = {
            value: props.value
        };
    }
    render() {
        var f
        switch (this.props.type) {
            case 'text':
                f = <TextField
                    type='text'
                    floatingLabelText={this.props.name}
                    value={this.state.value || ''}
                    hintText={this.props.hint}
                    floatingLabelFixed={true}
                    onChange={(event, value) => {
                    this.setState({value});
                    this
                        .props
                        .changeValue(value)
                }}
                    fullWidth={true}
                    multiLine={this.props.multiLine}/>
                break
            case 'select':
                f = <SelectField
                    floatingLabelText={this.props.name}
                    value={this.state.value || ''}
                    hintText={this.props.hint}
                    floatingLabelFixed={true}
                    onChange={(event, index, value) => {
                    this.setState({value});
                    this
                        .props
                        .changeValue(value)
                }}
                    fullWidth={true}>{this
                        .props
                        .options
                        .map(e => {
                            return <MenuItem key={e.value} value={e.value} primaryText={e.name}/>
                        })
}
                </SelectField>
                break
            default:
                f = <div></div>
        }
        return f
    }
}
