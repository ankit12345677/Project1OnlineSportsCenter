import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetCollection } from "../../../../services";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
export default class ItemCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionId: window.location.pathname.split("/").pop(),
      name: null,
      thumbnail: null,
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
  onFileChange = (event) => {
    this.setState({ thumbnail: event.target.files[0] });
  };
  handleSubmit = () => {
    let { collectionId, name, thumbnail } = this.state;
    const formData = new FormData();
    formData.append("collectionId", collectionId);
    formData.append("name", name);
    formData.append("thumbnail", thumbnail);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    swal({
      title: "Are you sure?",
      text: "You want to add item in collection list",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetCollection.createItemCollection(formData, config);
        console.log(list);
        if (list.code === 200) {
          NotificationManager.success(list.message);
          window.location.reload();
        } else {
          NotificationManager.error("Something occured");
        }
      }
    });
  };
  render() {
    return (
      <div>
        <a
          className="add-btn hover-btn text-white"
          onClick={(e) => this.handleOpen()}
        >
          Create
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
                  Create Item
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
                <div className="row price_list_details">
                  <div className="col-md-12">
                    <label className="form-label">
                      Title<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="name"
                      placeholder="Enter item..."
                      defaultValue={this.state.name}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      Thumbnail<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="thumbnail"
                      onChange={this.onFileChange}
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
