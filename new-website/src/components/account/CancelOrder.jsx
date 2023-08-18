import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import ButtonField from "../../common/ButtonField/ButtonField";
import { NotificationManager } from "react-notifications";

//third party
import { GetAccountDetail } from "../../services";
export default class CancelOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: "",
      comment: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCancelReason = async () => {
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    let { issue, comment } = this.state;
    let data = { issue: issue, comment: comment, varientId: lastSegment };
    if (data && data.issue && data.issue && data.comment) {
      let value = await GetAccountDetail.getCancelOrder(data);
      if (value) {
        NotificationManager.success("Successfully canceled order from list");
        // window.location.reload()
      } else {
        NotificationManager.error("something occured", "Not cancel");
      }
    }
  };
  handleOpen() {
    this.setState({ open: !this.state.open, loading: true });
  }

  handleClose() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <button className="btn btn-warning" onClick={(e) => this.handleOpen()}>
          <i class="far fa-trash-alt"></i>Cancel Order
        </button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Cancel Order
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
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="cancellationReason-heading1">
                      Reason for cancellation
                    </div>
                    <div className="cancellationReason-reasonMessageOne">
                      Please tell us correct reason for cancellation. This
                      information is only used to improve our service
                    </div>
                    <div className="d-flex flex-column ">
                      <form noValidate>
                        <div className="login-wrap">
                          {/* Tab panes */}
                          <div className="row">
                            <div className="form-group col-sm-6 ">
                              <div className="RadioDropdown-reasonHeader">
                                <span>
                                  SELECT REASON
                                  <span class="RadioDropdown-required">*</span>
                                </span>
                              </div>
                              <select
                                className="form-control"
                                name="issue"
                                value={this.state.issue}
                                onChange={this.handleChange}
                              >
                                <option selected>Select reason</option>
                                <option value="Delayed Delivery Cancellation">
                                  Delayed Delivery Cancellation
                                </option>
                                <option value="B">
                                  Incorrect size ordered
                                </option>
                                <option value="Incorrect size ordered">
                                  Duplicate Order
                                </option>
                                <option value="Product not required anymore">
                                  Product not required anymore
                                </option>
                                <option value="Cash Issue">Cash Issue</option>
                                <option value="Ordered by mistake">
                                  Ordered by mistake
                                </option>
                                <option value="Wants to change style/color">
                                  Wants to change style/color
                                </option>
                                <option value="Other reason">
                                  Other reason
                                </option>
                              </select>
                            </div>
                            <div className="form-group col-sm-12">
                              <textarea
                                className="form-control"
                                placeholder="Enter comment"
                                name="comment"
                                value={this.state.comment}
                                onChange={this.handleChange}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
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
                <ButtonField
                  className="theme-btn"
                  variant="contained"
                  color="primary"
                  buttonText={"Canceled"}
                  data-test="create-user-button"
                  onClick={this.handleCancelReason}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
