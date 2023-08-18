import React, { Component } from 'react';
import AutoSelect from "../autoselect";
import { GetProductDetails } from '../../services';

const Arrays = (data, fieldName, fieldValue) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
        data.map((item, key) => {
            arrayItem.push({ label: item[fieldName], value: item[fieldValue] });
            return null;
        });
    }
    return arrayItem;
};

export default class Brandlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
             getList:{}, selectedType: ''
        }
    }
    async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        let list = await GetProductDetails.getAllBrandList();
        this.setState({ getList: list.data })
    }
    handleSelectChange = (name, selected) => {
        if (name === "brand_id") {
            this.setState({
                brandlist: {
                    ...this.state.brandlist,
                    [name]: selected.value,
                },
                selectedType: selected,
            });
            this.props.onSelectBrand(selected.value)

            this.setState({ changed: true });
        }
    };

    render() {
        const { selectedType, getList } = this.state;
        return (
            <div>
                <AutoSelect
                    className="basic-single"
                    value={selectedType}
                    onChange={this.handleSelectChange}
                    isSearchable={true}
                    name="brand_id"
                    options={Arrays(getList, "name", "id")}
                />
            </div>


        )
    }
}
