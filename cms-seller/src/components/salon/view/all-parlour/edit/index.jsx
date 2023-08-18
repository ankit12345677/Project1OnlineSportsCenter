import React, { Component } from "react";
import { Button, Paper } from "@material-ui/core";
import ButtonField from "../../../../common/ButtonField/ButtonField";
import { GetSalonDetails } from "../../../../services";
import Loader from "../../../../loader";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
import ServiceAddParlour from "./ServiceAddParlour";
import SearchCitylist from "../../../../common/searchCity";

export default class Create extends Component {
  constructor(props) {
    super(props);
    let self = this.props.location.state.row;

    this.state = {
      id: self.owner.id,
      selectLocation: self.CITY,
      salonId: self.id,
      SalonName: self.NAME,
      SalonPhoneNo: self.PHONENO,
      SalonCity: self.CITY,
      SalonAddress: self.ADDRESS,
      LAT: self.LAT,
      LONG: self.LONG,
      selectOwnerCity: self.CITY,
      thumbnail: self.THUMBNAIL,
      selectSalonCity: self.CITY,
      salonServicePrice: self.pricelist,
    };
  }
  handleBack() {
    window.location.href = "/salon/your-parlour/list";
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
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
  onFileChange = (event) => {
    this.setState({ thumbnail: event.target.files[0] });
  };
  handleOwnerLocation = (value) => {
    this.setState({ selectOwnerCity: value });
  };
  handleSalonLocation = (value) => {
    this.setState({ selectSalonCity: value });
  };
  callback = (data) => {
    this.setState({ salonServicePrice: data });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoaded: true });
    const {
      id,
      selectSalonCity,
      salonServicePrice,
      salonId,
      SalonName,
      SalonPhoneNo,
      SalonAddress,
      LAT,
      LONG,
      thumbnail,
    } = this.state;
    let slug = this.convertToSlug(SalonName);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("selectSalonCity", selectSalonCity);
    formData.append("SalonPhoneNo", SalonPhoneNo);
    formData.append("salonId", salonId);
    formData.append("SalonName", SalonName);
    formData.append("Slug", slug);
    formData.append("SalonAddress", SalonAddress);
    formData.append("LAT", LAT);
    formData.append("LONG", LONG);
    formData.append("thumbnail", thumbnail);
    formData.append("salonServicePrice", JSON.stringify(salonServicePrice));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    swal({
      title: "Are you sure?",
      text: "You want to Salon New list",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetSalonDetails.updateSalonDetails(formData, config);
        if (list) {
          NotificationManager.success(list.message, "Message");
          window.location.href = "/salon/your-parlour/list";
          this.setState({ isLoaded: false });
        } else {
          this.setState({ isLoaded: false });
        }
      } else {
        this.setState({ isLoaded: false });
      }
    });
  };
  render() {
    const {
      selectSalonCity,
      salonServicePrice,
      SalonName,
      SalonPhoneNo,
      SalonAddress,
      isLoaded,
    } = this.state;
    let disableSaveButton =
      !selectSalonCity ||
      !salonServicePrice ||
      !SalonName ||
      !SalonPhoneNo ||
      !SalonAddress;
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-md-9 col-lg-6">
                <h2 className="mt-30 page-title">Parlour Update</h2>
              </div>
              <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                <Button variant="contained" onClick={() => this.handleBack()}>
                  <i class="fas fa-arrow-left" /> Back
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card-body-table">
                  {isLoaded ? <Loader /> : ""}

                  <ul
                    className="breadcrumb mb-30 nav nav-pills my-4"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item ">
                      <a
                        className="nav-link show active"
                        id="pills-one-tab"
                        data-toggle="pill"
                        href="#pills-one"
                        role="tab"
                        aria-controls="pills-one"
                        aria-selected="true"
                      >
                        Salon Details
                      </a>
                    </li>
                    <li className="nav-item ">
                      <a
                        className="nav-link show "
                        id="pills-four-tab"
                        data-toggle="pill"
                        href="#pills-three"
                        role="tab"
                        aria-controls="pills-four"
                        aria-selected="false"
                      >
                        Service List
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    {/* TAB - 1 */}
                    <div
                      className="tab-pane fade active show"
                      id="pills-one"
                      role="tabpanel"
                      aria-labelledby="pills-one-tab"
                    >
                      <Paper className="m-1 bg-light p-3 my-4">
                        <h5>
                          <b>Salon Details</b>
                        </h5>
                        <hr />
                        <div className="row">
                          <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                Salon Name
                                <b className="text-danger">
                                  <b className="text-danger">*</b>
                                </b>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name..."
                                name="SalonName"
                                value={this.state.SalonName}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                Phone No:<b className="text-danger">*</b>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter phoneno..."
                                name="SalonPhoneNo"
                                value={this.state.SalonPhoneNo}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                              <label className="form-label">City*</label>
                              <SearchCitylist
                                onSelectCategory={this.handleSalonLocation}
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-4 my-3">
                            <div className="form-group">
                              <label className="form-label">
                                Address<b className="text-danger">*</b>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter address..."
                                name="SalonAddress"
                                value={this.state.SalonAddress}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 my-3">
                            <div className="form-group">
                              <label className="form-label">
                                Latitude<b className="text-danger">*</b>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter lat..."
                                name="LAT"
                                value={this.state.LAT}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 my-3">
                            <div className="form-group">
                              <label className="form-label">
                                Longitude<b className="text-danger">*</b>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter lon..."
                                name="LONG"
                                value={this.state.LONG}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 my-3">
                            <div className="form-group">
                              <label className="form-label">
                                Thumbnail<b className="text-danger">*</b>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={this.onFileChange}
                              />
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>

                    {/* tab 3 */}
                    <div
                      className="tab-pane fade"
                      id="pills-three"
                      role="tabpanel"
                      aria-labelledby="pills-three-tab"
                    >
                      <ServiceAddParlour
                        parentCallback={this.callback}
                        state={this.state.salonServicePrice}
                      />
                      <div className="button_price">
                        <div className="form-group">
                          <ButtonField
                            className="theme-btn w-100"
                            variant="contained"
                            color="primary"
                            buttonText={"Update"}
                            disabled={disableSaveButton}
                            data-test="create-user-button"
                            onClick={this.handleSubmit}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* price and colorlist show */}

            {/* end of pricelist */}
          </div>
        </main>
      </div>
    );
  }
}
