import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { GetCategoryDetails } from "../../../../services";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getdata: [],
      pageNumber: 1,
      searchValue: "",
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    let data = { searchString: e.target.value };
    if (e.target.value) {
      this.getChildCategory(data);
    } else {
      this.getChildCategory();
    }
  }
  handleBack() {
    this.props.history.goBack();
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  async getChildCategory(data) {
    let list = await GetCategoryDetails.getChildCategoryList(data);
    if (list) {
      this.setState({
        getdata: list.data,
        pageCount: list.data.pages,
        pageNumber: data.page,
      });
    }
  }
  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = { page: params ? params.page : "" };
    if (Object.keys(params).length !== 0) {
      this.getChildCategory(data);
    } else {
      this.getChildCategory({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }
  handlePageClick = (e) => {
    let data = { page: e.selected + 1 };
    this.props.history.push({
      pathname: "/admin/category/list",
      search: "?" + new URLSearchParams({ page: data.page }).toString(),
    });
    this.getChildCategory(data);
  };
  async handlDeleteById(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete Category from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetCategoryDetails.getChildDeleteById(id);
        if (value) {
          this.getChildCategory();
        }
      }
    });
  }
  render() {
    const { getdata, pageCount, pageNumber } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Categories</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Categories</li>
        </ol>
        <div className="row justify-content-between">
          <div className="col-lg-12">
            <a href="/" className="add-btn hover-btn">
              Add New
            </a>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="row mb-4 p-2">
                <div className="col-lg-6 col-md-6">
                  {/* <label className="form-label"><b>Select Product*</b></label> */}
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search category ... "
                    value={this.state.searchValue}
                    name="searchValue"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="col-lg-1 col-md-1">
                  <button
                    className="save-btn hover-btn"
                    type="submit"
                    onClick={this.SearchAllProductList}
                  >
                    Search
                  </button>
                </div>
                <div className="col-lg-5 col-md-5 mt-3 text-right">
                  <Button
                    variant="contained"
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </Button>
                </div>
              </div>
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>
                          <input type="checkbox" className="check-all" />
                        </th>
                        <th scope="col">Category </th>
                        <th scope="col">Sub Category</th>
                        <th scope="col">Child cat</th>
                        {/* <th scope="col">Date</th> */}
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getdata && getdata.items && getdata.items.length
                        ? getdata.items.map((row, index) => (
                            <tr key={index}>
                              <td>{row.id}</td>
                              <td>{row.MainCat}</td>
                              <td>{row.SubCat}</td>
                              <td>{row.name}</td>
                              <td className="action-btns">
                                <Typography
                                  className="delete-btn"
                                  onClick={(e) => this.handlDeleteById(row.id)}
                                >
                                  <i className="fas fa-trash-alt" />
                                </Typography>
                              </td>
                            </tr>
                          ))
                        : null}
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
                  pageCount={pageCount}
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
