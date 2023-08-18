import React, { Component } from 'react';
import {
    Button, Paper,
} from "@material-ui/core";
import { GetSupplierDetails } from '../../../../services';
import swal from 'sweetalert';
import NotificationManager from 'react-notifications/lib/NotificationManager';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        let data = this.props.location.state.row;
        this.state = {
            id: data.id,
            SHOPNAME: data.SHOPNAME,
            THUMBNAIL: null,
            PHONE: data.PHONE,
            ADDRESS: data.ADDRESS,
            CITY: data.CITY,
            DISTRICT: data.DISTRICT,
            ZONE: data.ZONE,
            PICKUPADDRESS: data.PICKUPADDRESS,
            DESCRIPTION: data.DESCRIPTION,
            BANKNAME: data.BANKNAME,
            BANKACCOUNTNO: data.BANKACCOUNTNO,
            BANKACCOUNTHOLDERNAME: data.BANKACCOUNTHOLDERNAME,
            BANKBRANCH: data.BANKBRANCH
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleSubmit = async event => {
        event.preventDefault();
        const {
            id,
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
            id: id,
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
            text: "You want to update shop",
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
                    <li className="breadcrumb-item active">update</li>
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
                                {/* <div className="row mb-3">
                                    <label className="col-md-2 col-form-label">Banner</label>
                                    <div className="col-md-10">
                                        <div className="input-group" data-toggle="aizuploader" data-type="image">
                                            <input className="form-control" type="file" /><br />
                                        </div>
                                        <small class="text-muted">We had to limit height to maintian consistancy. In some device both side of the banner might be cropped for height limitation.</small>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <label className="col-md-2 col-form-label">
                                        Shop Phone
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control mb-3" placeholder="Phone" name="PHONE" value={this.state.PHONE} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-md-2 col-form-label">Shop Address <span className="text-danger text-danger">*</span></label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control mb-3" placeholder="Enter shopaddress" name="ADDRESS" value={this.state.ADDRESS} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-2 col-form-label">Pickup Points</label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control mb-3" placeholder="Enter pickupaddress" name="PICKUPADDRESS" value={this.state.PICKUPADDRESS} onChange={(e) => this.handleChange(e)} />
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
                        <div className="card-header">
                            <h5 className="mb-0 h6">Payment Setting</h5>
                        </div>
                        <div className="card-body">
                            <form method="POST" encType="multipart/form-data">
                                <div className="row">
                                    <label className="col-md-2 col-form-label">Bank Name<span className="text-danger text-danger">*</span></label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control mb-3" name="BANKNAME" value={this.state.BANKNAME} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-2 col-form-label">Bank Account Number</label>
                                    <div className="col-md-10">
                                        <div className="input-group" data-toggle="aizuploader" data-type="image">
                                            <input className="form-control" type="text" name="BANKACCOUNTNO" value={this.state.BANKACCOUNTNO} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-2 col-form-label">Bank Account Name</label>
                                    <div className="col-md-10">
                                        <div className="input-group" data-toggle="aizuploader" data-type="image">
                                            <input className="form-control" type="text" name="BANKACCOUNTHOLDERNAME" value={this.state.BANKACCOUNTHOLDERNAME} onChange={(e) => this.handleChange(e)} /><br />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-md-2 col-form-label">
                                        Bank Branch Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control mb-3" placeholder="Enter branch" name="BANKBRANCH" value={this.state.BANKBRANCH} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </form>
                            <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Save Vendors</button>
                        </div>
                    </div>

                </Paper>
                {/* end */}

            </div>

        )
    }
}
