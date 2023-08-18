import React, { Component } from 'react';
import {  GetSalonDetails } from '../../../../../services';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], isloaded: false, pages:''
           
        }
    }
    handlePageClick = (e) => {
        let data = { page: e.selected + 1 }
        this.getOrderList(data);

    };

    async getOrderList() {
        this.setState({ isloaded: true })
        let list = await GetSalonDetails.getAllOrderList();
        if (list) {
            this.setState({
                getList: list.data,
                pages: list.pages,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
    }
  
    componentDidMount() {
        this.getOrderList();
    }
    async handlDeleteById(data) {
        this.setState({ isLoaded: true })
        let list = { id: data.id }
        swal({
            title: "Are you sure?",
            text: "You want to delete Order from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetSalonDetails.getDeleteOrder(list);
                    if (value) {
                        NotificationManager.success("successfully Deleted");
                        window.location.reload();
                        this.setState({ isLoaded: false })
                    } else {
                        this.setState({ isLoaded: false })
                        NotificationManager.error("error");
                    }
                } else {
                    this.setState({ isLoaded: false })
                }
            });
    }
    render() {
        const { getList, pages } = this.state;
        return (
            <div className="container-fluid">
                <h2 className="mt-30 page-title">Salon Order</h2>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item active">order</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-3 col-md-4">
                        <div className="bulk-section mb-30">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search" />

                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Salon Orders</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 130 }}>Booking No</th>
                                                <th style={{ width: 130 }}>Customer Name</th>
                                                <th style={{ width: 130 }}>Phone</th>
                                                <th style={{ width: 200 }}>Email</th>
                                                <th style={{ width: 130 }}>Grand Total</th>
                                                <th style={{ width: 130 }}>Appointment</th>
                                                <th style={{ width: 100 }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList === 'undefined' ? <p>Loading</p> :
                                                    getList.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.ORDERNO}</td>
                                                            <td>
                                                                {row.FIRSTNAME + ' '+ row.LASTNAME}
                                                            </td>
                                                            <td>{row.PHONENO} </td>
                                                            <td>{row.EMAIL} </td>
                                                            <td>Rs.{row.GRANDTOTAL} </td>
                                                            <td>
                                                                <span className="delivery-time"><Moment format='MMMM Do YYYY'>{row.APPOINTMENTDATE}</Moment></span>
                                                                <span className="delivery-time"><Moment format=' h:mm:ss a'>{row.APPOINTMENTDATE}</Moment></span>
                                                            </td>
                                                            <td className="action-btns">
                                                                <Link className="views-btn" to={{
                                                                    pathname: `/admin/salons/order/view`,
                                                                    state: row
                                                                }}>
                                                                    <i className="fas fa-eye" />
                                                                </Link>
                                                                {/* <Link className="edit-btn" to={{
                                                                    pathname: `/admin/order/edit/${row.id}`,
                                                                    state: row
                                                                }}><i className="fas fa-edit" /></Link> */}

                                                                <span className="delete-btn" style={{ cursor: 'pointer' }} onClick={(e) => this.handlDeleteById(row)} ><i className="fas fa-trash-alt" /></span>

                                                            </td>
                                                        </tr>
                                                    ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    containerClassName={'pagination'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                    breakLabel={"..."}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    pageCount={pages}
                                    onPageChange={this.handlePageClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;