import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetLocationDetails } from "../../../../services";
import Searchlocationlist from "../../../../common/searchLocation";
export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { name, id } = this.props.state;
    this.state = {
      name: name,
      selectLocation: id,
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    let data = {
      id: this.props.state.id,
      name: this.state.name,
      ZONEID: this.state.selectLocation,
    };
    let list = await GetLocationDetails.getCityUpdate(data);
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
          aria-labelledby="simple-modal-name"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-name" id="exampleModalLabel">
                  Update Area
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
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City*</label>
                  <Searchlocationlist
                    onSelectCategory={this.handleChangeLocation}
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
