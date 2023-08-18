import React, { Component } from 'react';
import {
    Button, Paper,
} from "@material-ui/core";
import { GetSupplierDetails } from '../../../../services';
import swal from 'sweetalert';
import NotificationManager from 'react-notifications/lib/NotificationManager';
export default class Createshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SELLERID: null,
            SHOPNAME: null,
            THUMBNAIL: null,
            PHONE: null,
            ADDRESS: null,
            CITY: null,
            DISTRICT: null,
            ZONE: null,
            PICKUPADDRESS: null,
            DESCRIPTION: null,
            BANKNAME: null,
            BANKACCOUNTNO: null,
            BANKACCOUNTHOLDERNAME: null,
            BANKBRANCH: null
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack(e) {
        this.props.history.goBack();
    }
    handleSubmit = async event => {
        event.preventDefault();
        const {
            SHOPNAME,
            PHONE,
            ADDRESS,
            CITY,
            PICKUPADDRESS,
            DESCRIPTION,
            BANKNAME,
            BANKACCOUNTNO,
            BANKACCOUNTHOLDERNAME,
            BANKBRANCH
        } = this.state;
        let data = {
            SHOPNAME: SHOPNAME,
            PHONE: PHONE,
            ADDRESS: ADDRESS,
            CITY: CITY,
            PICKUPADDRESS: PICKUPADDRESS,
            DESCRIPTION: DESCRIPTION,
            BANKNAME: BANKNAME,
            BANKACCOUNTNO: BANKACCOUNTNO,
            BANKACCOUNTHOLDERNAME: BANKACCOUNTHOLDERNAME,
            BANKBRANCH: BANKBRANCH
        }

        swal({
            title: "Are you sure?",
            text: "You want to update New Vendor",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSupplierDetails.createSellerList(data);
                    if (list) {
                        NotificationManager.success(list.message,"Message")
                    }
                }
            });
    }

    render() {
        const { SHOPNAME, PHONE } = this.state;
        let disableSaveButton = !SHOPNAME || !PHONE
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Shop Setting</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item">Shop</li>
                    <li className="breadcrumb-item active">Add</li>
                </ol>
                {/* vendor details */}
                {/* Shop details with product */}
                <Paper>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0 h6">Basic Info</h5>
                        </div>
                        <div className="card-body">
                            <form >
                                <div className="row">
                                    <label className="col-md-2 col-form-label">Shop Name<span className="text-danger text-danger">*</span></label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control mb-3" placeholder="Enter shop name" name="SHOPNAME" value={this.state.SHOPNAME} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-md-2 col-form-label">
                                        Shop Phone
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number" className="form-control mb-3" placeholder="Phone" name="PHONE" value={this.state.PHONE} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-md-2 col-form-label">Shop Address <span className="text-danger text-danger">*</span></label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control mb-3" placeholder="Enter shopaddress" name="ADDRESS" value={this.state.ADDRESS} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-md-2 col-form-label">City <span className="text-danger text-danger">*</span></label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control mb-3" placeholder="Enter shopaddress" name="CITY" value={this.state.CITY} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-2 col-form-label">Shop description<span className="text-danger text-danger">*</span></label>
                                    <div className="col-md-10">
                                        <textarea rows={3} className="form-control mb-3" name="DESCRIPTION" value={this.state.DESCRIPTION} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Paper>
                {/* bank Details  */}

                <Paper className="mt-2">
                    <div className="card">
                        
                        <div className="card-body">
                            <form method="POST" encType="multipart/form-data">
                                
                               
                                
                            </form>
                            <button className={disableSaveButton ? "bg-grey":"save-btn hover-btn"} variant="contained" color="primary" type="submit" disabled={disableSaveButton} onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>

                </Paper>
                {/* end */}

            </div>

        )
    }
}
