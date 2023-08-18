import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetProductDetails, GetCollection } from "../../../../services";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../loader";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { title, startDate, endDate, thumbnail } = this.props.state;
    this.state = {
      title: title,
      startDate: new Date(startDate),
      thumbnail: thumbnail,
      endDate: new Date(endDate),
      productIds: [],
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleOpen() {
    this.setState({ open: !this.state.open, loading: true });
  }
  async renderData() {
    const API = await GetProductDetails.getFlashSaleProduct();
    const serverResponse = API.data;

    this.setState({
      dropDownOpt: serverResponse,
    });
  }
  handleClose() {
    this.setState({ open: !this.state.open });
  }
  onSelect(selectedList, selectedItem) {
    let value = Array.from(selectedList, (option) => option.id);
    this.setState({ productIds: value });
  }
  onFileChange = (event) => {
    this.setState({ thumbnail: event.target.files[0] });
  };
  onRemove(selectedList, removedItem) {
    let value = Array.from(selectedList, (option) => option.id);
    this.setState({ productIds: value });
  }
  handleStartDateChange(date) {
    this.setState({
      startDate: date,
    });
  }
  handleEndDateChange(date) {
    this.setState({
      endDate: date,
    });
  }
  handleBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    this.renderData();
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoaded: true });
    const { title, thumbnail, startDate, endDate, productIds } = this.state;
    const formData = new FormData();

    formData.append("id", this.props.state.id);
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);
    formData.append("startDate", new Date(startDate));
    formData.append("endDate", new Date(endDate));
    formData.append("productIds", productIds);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    swal({
      title: "Are you sure?",
      text: "You want to product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetCollection.updateProductFromFlash(formData, config);
        if (list) {
          NotificationManager.success(list.message);
          this.setState({ isLoaded: false });
          window.location.reload();
        } else {
          this.setState({ isLoaded: false });
        }
      }
    });
  };
  render() {
    return (
      <div>
        <a className="edit-btn" onClick={(e) => this.handleOpen()}>
          <i className="fas fa-edit" />
        </a>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div className="modal-dialog" role="document">
            {this.state.isLoaded ? <Loader /> : ""}

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Flash Sale
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.handleClose()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-3 control-label" htmlFor="name">
                    Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      placeholder="Title"
                      id="name"
                      name="title"
                      className="form-control"
                      required
                      value={this.state.title}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="signinSrEmail"
                  >
                    Banner <small>(1920x500)</small>
                  </label>
                  <div className="col-md-9">
                    <div className="file-preview box sm"></div>
                    <input
                      className="form-control"
                      type="file"
                      name="thumbnail"
                      onChange={this.onFileChange}
                    />
                    <span className="small text-muted">
                      This image is shown as cover banner in flash deal details
                      page.
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-3 control-label"
                    htmlFor="start_date"
                  >
                    StartDate
                  </label>
                  <div className="col-sm-9">
                    <DatePicker
                      className="form-control w-100"
                      name="startDate"
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-3 control-label"
                    htmlFor="start_date"
                  >
                    EndDate
                  </label>
                  <div className="col-sm-9">
                    <DatePicker
                      className="form-control w-100"
                      name="endDate"
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-3 control-label"
                    htmlFor="start_date"
                  >
                    Products
                  </label>
                  <div className="col-sm-9">
                    <Multiselect
                      options={this.state.dropDownOpt}
                      onSelect={this.onSelect}
                      onRemove={this.onRemove}
                      displayValue="name"
                      showCheckbox={true}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.handleClose()}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
