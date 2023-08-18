import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { GetLocationDetails } from '../../../../services';
import swal from 'sweetalert';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '', distributorPrice: '', qty: '', marginPer: '', marginPrice: '', buyerPrice: '', sellingPrice: '', 
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
        const { name, status } = this.state;
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Product</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item">Business</li>
                    <li className="breadcrumb-item active">create</li>
                </ol>


                <div className="col-lg-12 col-md-12">
                    <div className="card card-static-2 mb-30">
                        <div className="card-title-2">
                            <h4>Add New Product</h4>
                        </div>
                        <div className="card-body-table">
                            <div className="news-content-right pd-20">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className="form-label">Product Name<span className="text-danger">*</span></label>
                                        <input
                                            className="form-control"
                                            name="productName"
                                            placeholder="ex: Bultra"
                                            onChange={(e)=>this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">DistributerPrice<span className="text-danger">*</span></label>
                                        <input
                                            className="form-control"
                                            name="distributorPrice"
                                            placeholder="ex: 100"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Quantity<span className="text-danger">*</span></label>
                                        <input
                                            className="form-control"
                                            name="qty"
                                            placeholder="ex: 1"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Margin(%)<span className="text-danger">*</span></label>
                                        <input
                                            className="form-control"
                                            name="marginPer"
                                            placeholder="ex: 5%"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Margin Price<span className="text-danger">*</span></label>
                                        <input
                                            className="form-control"
                                            name="marginPrice"
                                            placeholder="ex: 50"
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">Buyer Price*</label>
                                        <input
                                            className="form-control"
                                            name="buyerPrice"
                                            placeholder="ex: 100"
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">Seller Price*</label>
                                        <input
                                            className="form-control"
                                            name="sellerPrice"
                                            placeholder="ex: 105"
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">Size*</label>
                                        <input
                                            className="form-control"
                                            name="unitSize"
                                            placeholder="ex: 1L"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">Discount Price*</label>
                                        <input
                                            className="form-control"
                                            name="discount"
                                            placeholder="ex: 1"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Total*</label>
                                        <input
                                            className="form-control"
                                            name="discountPer"
                                            placeholder="ex: 1"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Grand Total*</label>
                                        <input
                                            className="form-control"
                                            name="netPrice"
                                            placeholder="ex: 1"
                                            disabled
                                           
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Delivery Price*</label>
                                        <input
                                            className="form-control"
                                            name="deliveryPrice"
                                            placeholder="ex: 1"
                                            
                                           
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>

        )
    }
}
