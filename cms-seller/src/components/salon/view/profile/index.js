import React, { Component } from 'react'
// import {
//     Paper, Grid, Button
// } from "@material-ui/core";
import { NotificationManager } from 'react-notifications';
import { GetUserLogin } from '../../../services';
import Loader from '../../../loader';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "", isloaded: false,
            firstName: null, lastName: null, phone: null, address: null
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    async getUserDetails() {
        this.setState({ isloaded: true })
        let list = await GetUserLogin.getProfileforSeller();
        if (list) {
            this.setState({ user: list.data, isloaded: false })
        }
    }
    componentDidMount() {
        this.getUserDetails();
    }
    handleSubmit = async () => {
        this.setState({ isLoaded: true })
        let { firstName, lastName, phone, address, user } = this.state;
        let data = { id: user.id, firstName: firstName ? firstName: user.firstName, lastName: lastName ? user.lastName: user.lastName, phone: phone ? phone: user.phone, address: address?address: user.address }

        if(data.id){
            let list = await GetUserLogin.getProfileUpdate(data);
            if(list.success){
                this.setState({ isloaded: false })
                NotificationManager.success(list.message)
            }
        }
}
render() {
    let { user, isloaded } = this.state;
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Edit Profile</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">Dashboard</li>
                        <li className="breadcrumb-item active">Edit Profile</li>
                    </ol>
                    <div className="row">
                        {
                            isloaded? <Loader />:''
                        }
                        <div className="col-lg-4 col-md-5">
                            <div className="card card-static-2 mb-30">
                                <div className="card-body-table">
                                    <div className="shopowner-content-left text-center pd-20">
                                        <div className="shop_img mb-3">
                                            <img src="images/avatar/img-1.jpg" alt="" />
                                        </div>
                                        <div className="shopowner-dt-left">
                                            <h4>{user ? user.firstName + ' ' + user.lastName : ''}</h4>
                                            <span>{user ? user.role : ''}</span>
                                        </div>
                                        <div className="shopowner-dts">
                                            <div className="shopowner-dt-list">
                                                <span className="left-dt">Username</span>
                                                <span className="right-dt">{user ? user.firstName + '' + user.lastName : ''}</span>
                                            </div>
                                            <div className="shopowner-dt-list">
                                                <span className="left-dt">Phone</span>
                                                <span className="right-dt">+977-{user ? user.phone : ''}</span>
                                            </div>
                                            <div className="shopowner-dt-list">
                                                <span className="left-dt">Email</span>
                                                <span className="right-dt">{user ? user.email : ''}</span>
                                            </div>
                                            <div className="shopowner-dt-list">
                                                <span className="left-dt">Address</span>
                                                <span className="right-dt">{user ? user.address : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>Edit Profile</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="news-content-right pd-20">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group mb-3">
                                                    <label className="form-label">First Name*</label>
                                                    <input type="text" className="form-control" name="firstName" defaultValue={user ? user.firstName : ''} onChange={(e) => this.handleChange(e)} placeholder="Enter First Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mb-3">
                                                    <label className="form-label">Last Name*</label>
                                                    <input type="text" className="form-control" name="lastName" defaultValue={user ? user.lastName : ''} onChange={(e) => this.handleChange(e)} placeholder="Enter Last Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mb-3">
                                                    <label className="form-label">Email*</label>
                                                    <input type="email" className="form-control" defaultValue={user ? user.email : ''} disabled />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mb-3">
                                                    <label className="form-label">Phone*</label>
                                                    <input type="text" className="form-control" name="phone" defaultValue={user ? user.phone : ''} onChange={(e) => this.handleChange(e)} placeholder="Enter Phone Number" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mb-3">
                                                    <label className="form-label">Profile Image*</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input type="file" className="custom-file-input" id="profile-img" aria-describedby="inputGroupFileAddon04" />
                                                            <label className="custom-file-label" htmlFor="profile-img">Choose Image</label>
                                                        </div>
                                                    </div>
                                                    <div className="add-cate-img-1">
                                                        <img src="images/avatar/img-1.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mb-3">
                                                    <label className="form-label">Address*</label>
                                                    <textarea className="text-control" defaultValue={user ? user.address : ''} name="address" onChange={(e) => this.handleChange(e)} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
}
