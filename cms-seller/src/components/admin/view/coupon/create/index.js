import React, { Component } from 'react';
import {
    Button, Paper,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import { GetProductDetails } from '../../../../services';
import AutoSelect from "../../../../common/autoselect";
import ButtonField from "../../../../common/ButtonField/ButtonField";
import swal from 'sweetalert';
import NotificationManager from 'react-notifications/lib/NotificationManager';

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

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [], code: '', selectedType: '', startDate: '', endDate: '', type: '', value: ''
        }
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    changeStartDate(date) {
        this.setState({
            startDate: date
        })
    }
    changeEndDate(date) {
        this.setState({
            endDate: date
        })
    }
    handleBack(e) {
        this.props.history.goBack();
    }
    handleSelectChange = (name, selected) => {
        this.setState({
            productList: {
                ...this.state.productList,
                [name]: selected.value,
            },
            selectedType: selected,
        });
    };
    async getProductList(data) {
        this.setState({ isloaded: false })
        let list = await GetProductDetails.getSellerProductList(data);
        if (list) {
            this.setState({
                productList: list.data,
                isloaded: true
            })
        } else {
            this.setState({ isloaded: false })
        }
    }
    async componentDidMount() {
        this.getProductList();
    }
    createService = async event => {
        event.preventDefault();
        const { code, type, value, selectedType, startDate, endDate } = this.state;
        const data = {
            Code: code,
            VarientId: selectedType.value,
            StartDate: startDate,
            EndDate: endDate,
            Type: type,
            Value: value
        }
        swal({
            title: "Are you sure?",
            text: "You want to coupon",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.createCoupon(data);
                    if (list) {
                        NotificationManager.success(list.message, "Message")
                    }
                }
            });

    }

    render() {
        const { productList, code, type, value, selectedType, startDate, endDate } = this.state;
        let disableSaveButton = !code || !selectedType.value || !endDate || !startDate || !type || !value
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-10 col-lg-6">
                        <h2 className="mt-30 page-title">Coupon Create</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <Paper className="mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0 h6">Coupon Info</h5>
                        </div>
                        
                    </div>

                </Paper>
                {/* end */}

            </div>

        )
    }
}
