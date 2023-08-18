import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetOrderDetails } from '../../../../services';
export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [],
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    async componentDidMount() {
        this.getCustomer();
    }
    async getCustomer() {
        let list = await GetOrderDetails.getAllProductProfitList();
        this.setState({ getList: list.data })
    }

    render() {
        const { getList } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Sold Product</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Sold Product</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-3 col-md-4">
                        <div className="bulk-section mt-30">
                            <div className="input-group">
                                <div className="input-group-append">
                                    <a href="/admin/business/create" className="add-btn hover-btn">Add New</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="bulk-section mt-30">
                            <div className="input-group">
                                <div className="search-by-name-input">
                                    <input type="text" className="form-control" placeholder="Search" />
                                </div>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>Delivered Product</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}>Order Number</th>
                                                <th>Thumbnail</th>
                                                <th style={{ width: '100px' }}>Product Name</th>
                                                <th >Distributor Price</th>
                                                <th >Buyer Price</th>
                                                <th >Seller Price</th>
                                                <th>QTY</th>
                                                <th>Discount</th>
                                                <th>Price</th>
                                                <th>Grand Total</th>
                                                <th>Status</th>
                                                <th>Profit/Loss</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{row.orderNumber}</td>
                                                        <td>
                                                            <img src={row.thumbnail} alt="cartimage" style={{ height: '50px' }} />
                                                        </td>
                                                        <td >{row.productName}</td>
                                                        <td>{row.distributorPrice}</td>
                                                        <td>{row.buyerPrice}</td>
                                                        <td>{row.sellerPrice}</td>
                                                        <td>{row.qty}</td>
                                                        <td>{row.discount}</td>
                                                        <td>{row.netPrice}</td>
                                                        <td>{row.qty * row.netPrice}</td>
                                                        <td className="text-success">{row.status}</td>
                                                        <td>{row.profit}</td>


                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
