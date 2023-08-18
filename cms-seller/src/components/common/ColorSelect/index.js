/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GetProductDetails } from '../../services';

export default class ColorSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
             getList:{} 
        }
    }
    async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        let list = await GetProductDetails.getAllColorList();
        this.setState({ getList: list.data })
    }
    handleSelectChange = (e, value) => {
            this.props.onSelectColor(value.id)
    };

    render() {
        const { getList } = this.state;
        return (
                <Autocomplete
                id="combo-box-demo"
                options={getList}
                getOptionLabel={option => option.TITLE}
                renderOption={(option) => (
                    <span style={{background: option.CODE}}>{option.TITLE}</span>
                )}
                style={{color: 'black'}}
                renderInput={params => (
                    <TextField
                    {...params}
                    label="Select color"
                    variant="outlined"
                    fullWidth
                    />
                )}
                onChange={(event, newValue) => this.handleSelectChange(event,newValue)}
                />
            );
        }
}
