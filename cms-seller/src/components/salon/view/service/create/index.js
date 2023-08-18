import React, { Component } from "react";
import { Button, MenuItem, Select, Typography } from "@material-ui/core";
import { NotificationManager } from "react-notifications";
import SalonCatDropdown from "../../../../common/saloncategory";
import { exractObjectArr } from "../../../../../helper/HelpersFunction";
import { GetSalonDetails } from "../../../../services";
import Loader from "../../../../loader";
import Edit from "../edit";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";

export default class MainCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isloading: true,
      serviceName: "",
      sortDesc: "",
      cat_id: "",
      gender: "",
      getgenderList: [],
      limit: 20,
      pageNumber: 1,
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async handleGenderChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    let data = { Gender: e.target.value };
    let list = await GetSalonDetails.getServiceListByGender(data);
    if (list) {
      this.setState({ getgenderList: list.data });
    }
  }
  handleBack() {
    this.props.history.goBack();
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
  handleSalonCategory = (value) => {
    this.setState({ cat_id: value });
  };
  convertToSlug(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  handleStatus = async (index, value, getData) => {
    let status = !getData.Status ? 1 : 0;
    const formData = new FormData();
    formData.append("id", getData.id);
    formData.append("Status", status);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let list = await GetSalonDetails.getSalonUpdate(formData, config);
    if (list) {
      NotificationManager.success("Update status", "Status");
      window.location.reload();
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isloading: true });
    let slug = this.convertToSlug(this.state.serviceName);
    const { serviceName, sortDesc, cat_id } = this.state;
    let data = {
      SERVICENAME: serviceName,
      SORTDESC: sortDesc,
      CAT_ID: cat_id,
      SLUG: slug,
    };
    try {
      let list = await GetSalonDetails.getServiceCreate(data);
      if (list) {
        this.setState({ isloading: false });
        NotificationManager.success(list.msg, "message");
        this.getList();
      } else {
        NotificationManager.error("Please check value", "Input");
        this.setState({ isloading: false });
      }
    } catch (erro) {
      console.log(erro);
    }
  };
  async handlDeleteById(id) {
    let data = { id: id };
    swal({
      title: "Are you sure?",
      text: "You want to delete service from Salon",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetSalonDetails.getServiceDeleteFromSalon(data);
        if (value) {
          this.getList();
        }
      }
    });
  }
  render() {
    let { list, isloading, pages, pageNumber } = this.state;
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-md-9 col-lg-6">
                <h2 className="mt-30 page-title">Salon service</h2>
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
              <li className="breadcrumb-item active">service</li>
            </ol>
            <div className="row">
              <div className="col-lg-4 col-md-5">
                <div className="card card-static-2 mb-30">
                  <div className="card-title-2">
                    <h4>Salon Category</h4>
                  </div>
                  <div className="card-body-table">
                    <div className="news-content-right pd-20">
                      <div className="form-group">
                        <label className="form-label">Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ex:lotus facial"
                          name="serviceName"
                          value={this.state.serviceName}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Gender*</label>
                        <Select
                          className="form-control"
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          name="gender"
                          value={this.state.gender}
                          onChange={(e) => this.handleGenderChange(e)}
                        >
                          <MenuItem value="" selected>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"M"}>Male</MenuItem>
                          <MenuItem value={"F"}>Female</MenuItem>
                        </Select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Salon Category*</label>
                        <SalonCatDropdown
                          getgenderList={this.state.getgenderList}
                          onSelectSalonCategory={this.handleSalonCategory}
                        />
                      </div>
                      <div className="form-group mb-0">
                        <label className="form-label">Sort Description*</label>
                        <textarea
                          className="form-control"
                          name="sortDesc"
                          value={this.state.sortDesc}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                      <button
                        className="save-btn hover-btn"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Add New
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="all-cate-tags">
                  <div className="row justify-content-between">
                    <div className="col-lg-12 col-md-12">
                      <div className="card card-static-2 mb-30">
                        <div className="card-title-2">
                          <h4>Salon Category</h4>
                        </div>
                        <div className="card-body-table">
                          {!isloading ? <Loader /> : ""}
                          <div className="table-responsive">
                            <table className="table ucp-table table-hover">
                              <thead>
                                <tr>
                                  <th style={{ width: 60 }}>
                                    <input
                                      type="checkbox"
                                      className="check-all"
                                    />
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
                                        <td>
                                          {row.category_salonCategoryName}
                                        </td>
                                        <td>{row.SERVICENAME}</td>
                                        <td>
                                          {row.category_Gender === "M"
                                            ? "Male"
                                            : "Female"}
                                        </td>
                                        <td className="action-btns">
                                          <Edit state={row} />
                                          <Typography
                                            className="delete-btn"
                                            onClick={(e) =>
                                              this.handlDeleteById(row.id)
                                            }
                                          >
                                            <i className="fas fa-trash-alt" />
                                          </Typography>
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
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
