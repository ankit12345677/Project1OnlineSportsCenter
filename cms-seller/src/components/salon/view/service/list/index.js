import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { exractObjectArr } from "../../../../../helper/HelpersFunction";
import { GetSalonDetails } from "../../../../services";
import Edit from "../edit";
import ReactPaginate from "react-paginate";

class List extends Component {
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
  async getList(data) {
    this.setState({ isloading: true });
    let list = await GetSalonDetails.getServiceList(data);
    if (list) {
      this.setState({
        list: exractObjectArr(list.data.items),
        pages: list.data.pages,
        pageNumber: Number(list.data.page),
        isloaded: false,
      });
    } else {
      this.setState({ isloading: false });
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
                <h2 className="mt-30 page-title">Salon Service</h2>
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
              <li className="breadcrumb-item active">Service List</li>
            </ol>
            <div className="row justify-content-between">
              <div className="col-lg-3 col-md-4">
                <div className="bulk-section mt-30">
                  <a href="/salon/service/create" className="add-btn hover-btn">
                    Add New
                  </a>
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="bulk-section mt-30">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search category, gender..."
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
                    <h4>All Service</h4>
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
                            <th scope="col">Category</th>
                            <th scope="col">Service Name</th>
                            <th scope="col">Gender</th>
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
                                      src={row.category_Thumbnail}
                                      alt="thumbnail"
                                      height="30"
                                    />
                                  </td>
                                  <td>{row.category_salonCategoryName}</td>
                                  <td>{row.SERVICENAME}</td>
                                  <td>
                                    {row.category_Gender === "M"
                                      ? "Male"
                                      : "Female"}
                                  </td>
                                  <td>
                                    <Edit state={row} />
                                  </td>
                                </tr>
                              ))
                            : "No data found"}
                        </tbody>
                      </table>
                    </div>
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
        </main>
      </div>
    );
  }
}

export default List;
