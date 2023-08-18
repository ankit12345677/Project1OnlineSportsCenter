import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetSalonDetails } from "../../../../services";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { salonCategoryName, Gender, sortDesc, Thumbnail, salonSlug } =
      this.props.state;
    this.state = {
      salonCategoryName: salonCategoryName,
      Gender: Gender,
      image: Thumbnail,
      sortDesc: sortDesc,
      salonSlug: salonSlug,
    };
  }
  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleOpen() {
    this.setState({ open: !this.state.open, loading: true });
  }

  handleClose() {
    this.setState({ open: !this.state.open });
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
  async handleSubmit(e) {
    let slug = this.convertToSlug(this.state.salonCategoryName);

    const { salonCategoryName, sortDesc, Gender, image } = this.state;

    const formData = new FormData();

    formData.append("id", this.props.state.id);
    formData.append("salonCategoryName", salonCategoryName);
    formData.append("salonSlug", slug);
    formData.append("sortDesc", sortDesc);
    formData.append("Gender", Gender);
    formData.append("thumbnail", image);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let list = await GetSalonDetails.getSalonUpdate(formData, config);
    if (list) {
      window.location.reload();
    }
  }
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
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Salon
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
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ex:Body Wax"
                    name="salonCategoryName"
                    value={this.state.salonCategoryName}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group my-4">
                  <label className="form-label">Gender*</label>
                  <select
                    id="status"
                    name="Gender"
                    className="form-control"
                    value={this.state.Gender}
                    onChange={(e) => this.handleChange(e)}
                  >
                    <option>Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="form-group my-4">
                  <label className="form-label">Category Image*</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={this.onFileChange}
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
                  onClick={() => this.handleSubmit()}
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
