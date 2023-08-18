import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { GetProductDetails } from "../../../services";
import Loader from "../../../loader";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";

export default class Bannerlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: "",
      slug: "",
      type: 0,
      list: [],
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFileChange = (event) => {
    this.setState({ banner: event.target.files[0] });
  };

  async componentDidMount() {
    let p = await GetProductDetails.getAllBannerList();
    if (p) {
      this.setState({ list: p.data });
    }
  }

  handleStatus = async (index, value, getData) => {
    let status = getData.status ? 0 : 1;
    let data = { id: getData.id, status: status };
    let list = await GetProductDetails.getBannerStatus(data);
    if (list) {
      NotificationManager.success("Update status", "Status");
      // window.location.reload();
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoaded: true });
    let { slug, banner, type } = this.state;
    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("banner", banner);
    formData.append("type", type);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    swal({
      title: "Are you sure?",
      text: "You want to add Images",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.getBannerUploadList(
          formData,
          config
        );
        if (list) {
          NotificationManager.success("Successfully Upated", "Banner");
          this.setState({ isLoaded: false });
          window.location.reload();
        } else {
          NotificationManager.error("Something occured");
          this.setState({ isLoaded: false });
        }
      }
    });
  };
  async handlDeleteById(data) {
    this.setState({ isLoaded: true });
    let list = { id: data.id, banner: data.banner };
    swal({
      title: "Are you sure?",
      text: "You want to delete Banner from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.getDeleteBannerList(list);
        if (value) {
          NotificationManager.success("successfully Deleted");
          window.location.reload();
          this.setState({ isLoaded: false });
        } else {
          this.setState({ isLoaded: false });
          NotificationManager.error("error");
        }
      } else {
        this.setState({ isLoaded: false });
      }
    });
  }
  render() {
    const { list, isLoaded } = this.state;
    return (
      <div id="layoutSidenav_content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-9 col-lg-6">
              <h2 className="mt-30 page-title">Banner</h2>
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
            <li className="breadcrumb-item">
              <a href="/admin/product/create">Products</a>
            </li>
            <li className="breadcrumb-item active">more image</li>
          </ol>
          <div className="row">
            {isLoaded ? <Loader /> : ""}
            <div className="col-lg-12 col-md-12">
              <div className="card card-static-2 mb-30">
                <div className="card-title-2">
                  <h4>Upload Banner</h4>
                </div>
                <div className="card-body-table">
                  <div className="news-content-right pd-20">
                    <div className="row">
                      <div className="col-lg-3 col-md-3">
                        <div className="form-group">
                          <label className="form-label">Type*</label>
                          <select
                            id="type"
                            name="type"
                            className="form-control"
                            value={this.state.type}
                            onChange={(e) => this.handleChange(e)}
                          >
                            <option value={0}>Laptop</option>
                            <option value={1}>Mobile</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3">
                        <div className="form-group">
                          <label className="form-label">Slug*</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="ex: home-kitchen"
                            name="slug"
                            value={this.state.slug}
                            onChange={(e) => this.handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3">
                        <div className="form-group">
                          <label className="form-label">Banner Image*</label>
                          <input
                            className="form-control"
                            type="file"
                            name="image"
                            onChange={this.onFileChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <button
                            className="save-btn hover-btn"
                            type="submit"
                            onClick={this.handleSubmit}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              {isLoaded ? <Loader /> : ""}
              <div className="card card-static-2 mt-30 mb-30">
                <div className="card-body-table">
                  <div className="table-responsive">
                    <table className="table ucp-table table-hover">
                      <thead>
                        <tr>
                          <th style={{ width: 160 }}>S.N</th>
                          <th style={{ width: "200px" }}>Banner</th>
                          <th style={{ width: "100px" }}>Slug</th>
                          <th style={{ width: "100px" }}>Status</th>
                          <th style={{ width: "100px" }}>Type</th>
                          <th style={{ width: "100px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list
                          ? list.map((row, index) => (
                              <tr key={index}>
                                <td>{++index}</td>
                                <td style={{ width: "350px" }}>
                                  <img
                                    src={row.banner}
                                    alt="product-name"
                                    height="65px"
                                  />
                                </td>
                                <td style={{ width: "100px" }}>{row.slug}</td>
                                <button
                                  type="button"
                                  className={
                                    row.status
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
                                <td style={{ width: "100px" }}>
                                  {row.type === "1" ? (
                                    <p>Mobile</p>
                                  ) : (
                                    <p>Laptop</p>
                                  )}
                                </td>
                                <td>
                                  <span
                                    className="delete-btn"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => this.handlDeleteById(row)}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </span>
                                </td>
                              </tr>
                            ))
                          : "No data"}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
