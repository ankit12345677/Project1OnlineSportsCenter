import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GetSalonDetails } from "../../../services";
import Edit from "./edit";
import ReactPaginate from "react-paginate";
import { NotificationManager } from "react-notifications";
import "./index.css";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchString: null,
      gender: null,
      limit: 20,
      pageNumber: 1,
    };
  }
  async handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value) {
      let data = {
        limit: this.state.limit,
        page: this.state.pageNumber,
        searchString: e.target.value,
      };
      this.getList(data);
    } else {
      let data = {
        limit: this.state.limit,
        page: this.state.pageNumber,
      };
      this.getList(data);
    }
  }
  handleStatus = async (index, value, getData) => {
    let status = getData.Status ? false : true;
    let data = { id: getData.id, Status: status };

    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("Status", data.Status);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let list = await GetSalonDetails.getSalonUpdate(formData, config);
    if (list) {
      NotificationManager.success(list.message);
    }
  };
  async getList(data) {
    this.setState({ isloading: true });
    let list = await GetSalonDetails.getAllSalonList(data);
    if (list) {
      this.setState({
        list: list.data.items,
        pages: list.data.pages,
        pageNumber: Number(list.data.page),
        isloaded: false,
      });
    } else {
      this.setState({ isloading: false });
    }
  }
  async handleGenderChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value) {
      let data = {
        limit: this.state.limit,
        page: this.state.pageNumber,
        gender: e.target.value,
      };
      this.getList(data);
    } else {
      let data = {
        limit: this.state.limit,
        page: this.state.pageNumber,
      };
      this.getList(data);
    }
  }
  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = {
      limit: this.state.limit,
      page: params ? params.page : this.state.pageNumber,
    };
    if (Object.keys(params).length !== 0) {
      this.getList(data);
    } else {
      this.getList({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }
  handlePageClick = (e) => {
    let data = { limit: this.state.limit, page: e.selected + 1 };
    this.props.history.push({
      pathname: location.pathname,
      search: "?" + new URLSearchParams({ page: data.page }).toString(),
    });
    this.getList(data);
  };
  render() {
    let { list, pages, pageNumber } = this.state;
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-md-9 col-lg-6">
                <h2 className="mt-30 page-title">Salon Category</h2>
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
              <li className="breadcrumb-item active">Salon Category</li>
            </ol>
            <div className="row justify-content-between">
              <div className="col-lg-3 col-md-4">
                <div className="bulk-section mt-30">
                  <a
                    href="/salon/category/create"
                    className="add-btn hover-btn"
                  >
                    Add New
                  </a>
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="bulk-section mt-30">
                  <div className="search-by-name-input">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search name, gender..."
                      name="searchString"
                      value={this.state.searchString}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="input-group">
                    <select
                      id="action"
                      className="form-control"
                      name="gender"
                      value={this.state.gender}
                      onChange={(e) => this.handleGenderChange(e)}
                    >
                      <option selected>Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="card card-static-2 mt-30 mb-30">
                  <div className="card-title-2">
                    <h4>All Salon Category</h4>
                  </div>
                  <div className="card-body-table">
                    <div className="table-responsive">
                      <table className="table ucp-table table-hover">
                        <thead>
                          <tr>
                            <th style={{ width: 60 }}>
                              <input type="checkbox" className="check-all" />
                            </th>
                            <th scope="col">thumbnail</th>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.length
                            ? list.map((row, index) => (
                                <tr key={index}>
                                  <td>{row.id}</td>
                                  <td>
                                    <img
                                      src={row.Thumbnail}
                                      alt="thumbnail"
                                      height="30"
                                    />
                                  </td>
                                  <td>{row.salonCategoryName}</td>
                                  <td>
                                    {row.Gender === "M" ? "Male" : "Female"}
                                  </td>
                                  <td>
                                    <td>
                                      <button
                                        type="button"
                                        className={
                                          row.Status
                                            ? "btn btn-sm btn-secondary btn-toggle active"
                                            : "btn btn-sm btn-secondary btn-toggle"
                                        }
                                        data-toggle="button"
                                        aria-pressed="true"
                                        autocomplete="off"
                                        onClick={(e) =>
                                          this.handleStatus(
                                            index,
                                            e.target.value,
                                            row
                                          )
                                        }
                                      >
                                        {" "}
                                        <div className="handle"></div>{" "}
                                      </button>
                                    </td>
                                  </td>
                                  <td className="action-btns">
                                    <Edit state={row} />
                                  </td>
                                </tr>
                              ))
                            : "No data found"}
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
                      pageCount={pages ? pages : ""}
                      forcePage={pageNumber ? pageNumber - 1 : null}
                      onPageChange={this.handlePageClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default CategoryList;
