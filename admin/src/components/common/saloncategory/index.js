import React, { Component } from 'react';
import AutoSelect from "../autoselect";
// import { GetSalonDetails } from '../../services';

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

export default class SalonCatDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
             selectedType: ''
        }
    }
    handleSelectChange = (name, selected) => {
        if (name === "salon_id") {
            this.setState({
                salonlist: {
                    ...this.state.salonlist,
                    [name]: selected.value,
                },
                selectedType: selected,
            });
            this.props.onSelectSalonCategory(selected.value)

            this.setState({ changed: true });
        }
    };

    render() {
        let getList = this.props.getgenderList?this.props.getgenderList:'';
        const { selectedType  } = this.state;
        return (
            <div>
                <AutoSelect
                    className="basic-single"
                    value={selectedType}
                    onChange={this.handleSelectChange}
                    isSearchable={true}
                    name="salon_id"
                    options={Arrays(getList, "salonCategoryName", "id")}
                />
            </div>


        )
    }
}
