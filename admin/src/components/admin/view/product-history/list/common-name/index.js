import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { NotificationManager } from "react-notifications";
import { GetProductDetails } from "../../../../../services";
export default class CommonName extends Component {
  constructor(props) {
    super(props);
    const { title, keyword, desc } = this.props.state;
    this.state = {
      name: this.props.state.name,
      title: title,
      keyword: keyword,
      desc: desc,
    };
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
  handleOpen() {
    this.setState({ open: !this.state.open, loading: true });
  }

  handleClose() {
    this.setState({ open: !this.state.open });
  }
  handleChangeLocation = (value) => {
    this.setState({ selectLocation: value });
  };

  async handleSubmit(e) {
    let slug = this.convertToSlug(this.state.name);
    let { name } = this.state;
    let data = { id: this.props.state.id, name: name, slug: slug };
    let list = await GetProductDetails.updateCommonName(data);
    if (list) {
      NotificationManager.success(list.message, "Message");
      window.location.reload();
    }
  }
  render() {
    console.log(this.props.state);
    return (
      <div>
        <a className="edit-btn" onClick={(e) => this.handleOpen()}>
          <i className="fas fa-edit" />
          Edit
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
                  Common Name
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
                  <label className="form-label">Common Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
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
                  Update
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
