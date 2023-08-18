import React, { Component } from "react";
import { GetProductDetails } from "../../../../services";
import { Typography, Button } from "@material-ui/core";
import Edit from "../edit";
import DiscountByBrand from "../DiscountByBrand";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],
      pageNumber: 1,
      isloaded: false,
      search_text: "",
    };
  }
  handleBack() {
    this.props.history.goBack();
  }
  async getBrandList(data) {
    this.setState({ isloaded: false });
    let list = await GetProductDetails.getAllBrandList(data);
    if (list) {
      this.setState({
        getList: list.data,
        pages: list.pages,
        pageNumber: Number(list.page),
        isloaded: true,
      });
    }
  }
  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = { page: params ? params.page : "" };
    if (Object.keys(params).length !== 0) {
      this.getBrandList(data);
    } else {
      this.getBrandList({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }
  handlePageClick = (e) => {
    let data = { page: e.selected + 1 };
    this.props.history.push({
      pathname: location.pathname,
      search: "?" + new URLSearchParams({ page: data.page }).toString(),
    });
    this.getBrandList(data);
  };
  async handlDeleteById(id) {
    let data = { id: id };
    swal({
      title: "Are you sure?",
      text: "You want to delete brand from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.deletebrandList(data);
        if (value) {
          this.getLocation();
        }
      }
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value) {
      let data = {
        limit: this.state.limit,
        page: e.selected + 1,
        search_text: e.target.value,
      };
      this.getBrandList(data);
    } else {
      let data = {
        limit: this.state.limit,
        page: e.selected + 1,
      };
      this.getBrandList(data);
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    let { search_text } = this.state;
    let data = { search_text: search_text };
    if (data.search_text) {
      this.getBrandList(data);
    }
  };
  render() {
    const { getList, pages, pageNumber, isloaded } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Brand</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="index.html">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Brand</li>
        </ol>
        <div className="row justify-content-between">
          <div className="col-lg-5 col-md-6">
            <div className="bulk-section">
              <div className="search-by-name-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex: Midea"
                  name="search_text"
                  value={this.state.search_text}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 text-right">
            <a href="/admin/brand/create" className="btn btn-circle btn-info">
              Create
            </a>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>All Brand</h4>
              </div>
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>
                          <input type="checkbox" className="check-all" />
                        </th>
                        <th style={{ width: 60 }}>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Discount(%)</th>
                        <th>Edit Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isloaded
                        ? getList.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="checkbox"
                                  className="check-item"
                                  name="ids[]"
                                  defaultValue={7}
                                />
                              </td>
                              <td>{row.id}</td>
                              <td>{row.name}</td>
                              <td>{row.slug}</td>
                              <td>
                                {row.status ? (
                                  <span className="badge-item badge-status-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge-item badge-status">
                                    in-Active
                                  </span>
                                )}
                              </td>
                              <td>{row.DiscountPer + "%"}</td>
                              <td>
                                <DiscountByBrand state={row} />
                              </td>
                              <td className="action-btns">
                                <Edit state={row} />
                                <Typography
                                  className="delete-btn"
                                  onClick={(e) => this.handlDeleteById(row.id)}
                                >
                                  <i className="fas fa-trash-alt" />
                                </Typography>
                              </td>
                            </tr>
                          ))
                        : "Loading..."}
                    </tbody>
                  </table>
                </div>
                <ReactPaginate
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                  breakLabel={"..."}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  pageCount={pages}
                  forcePage={pageNumber - 1}
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
