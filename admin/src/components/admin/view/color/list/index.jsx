import React, { Component } from "react";
import { GetProductDetails } from "../../../../services";
import { Typography, Button } from "@material-ui/core";
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
  async getColorList(data) {
    this.setState({ isloaded: false });
    let list = await GetProductDetails.getAllColorList(data);
    if (list) {
      this.setState({
        getList: list.data,
        pages: list.pages,
        pageNumber: list.page,
        isloaded: true,
      });
    }
  }
  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = { page: params ? params.page : "" };
    if (Object.keys(params).length !== 0) {
      this.getColorList(data);
    } else {
      this.getColorList({
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
    this.getColorList(data);
  };
  async handlDeleteById(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete brand from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.deleteColorList(id);
        if (value) {
          this.getColorList();
        }
      }
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    let { search_text } = this.state;
    let data = { search_text: search_text };
    if (data.search_text) {
      this.getColorList(data);
    }
  };
  render() {
    const { getList, pages, pageNumber, isloaded } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6"></div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
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
              <div className="input-group">
                <div className="input-group-append">
                  <button
                    className="status-btn hover-btn"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Search{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 text-right">
            <a href="/admin/color/create" className="btn btn-circle btn-info">
              Create
            </a>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>All Color</h4>
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
                        <th>Code</th>
                        <th>Status</th>
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
                              <td>{row.TITLE}</td>
                              <td>{row.CODE}</td>
                              <td>
                                {row.STATUS ? (
                                  <span className="badge-item badge-status-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge-item badge-status">
                                    in-Active
                                  </span>
                                )}
                              </td>
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
