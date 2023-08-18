import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import InputField from "../../common/InputField/InputField";
import ButtonField from "../../common/ButtonField/ButtonField";
import SelectWithSearch from "../../common/SelectWithSearch/SelectWithSearch";
import {
  requiredValidate,
  minLength,
  maxLength,
  emailValidate,
  phoneNumberValidate,
  characterValidate,
  objectRequiredFieldValidation,
  numberValidate,
} from "../../helpers/validation";
import { constantText } from "../../helpers/constants.text";
//third party
import { GetLocationDetail } from "../../services";
export default class Addaddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoneList: [],
      areaList: [],
      userData: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        ZoneDetail: null,
        shippingAddress: "",
      },
      error: false,
    };
  }
  handleOpen() {
    this.setState({ open: !this.state.open, loading: true });
  }

  handleClose() {
    this.setState({ open: !this.state.open });
  }
  handleChange = (event) => {
    let { name, value } = event.target;
    value =
      name == "email"
        ? value.toLowerCase().replace(/^\s\s*/, "")
        : value.replace(/^\s\s*/, "");
    this.handleStateChange(event, "", name, value);
  };
  handleStateChange = (event, id, name, value) => {
    let { userData } = this.state;
    this.setState({
      userData: {
        ...userData,
        [name]: value,
      },
    });
    if (name === "ZoneDetail") {
      this.getAreaList(value);
    }
  };

  async getLocationList() {
    let list = await GetLocationDetail.getLocationListDetails();
    if (list) {
      this.setState({ zoneList: list.data });
    }
  }
  async getAreaList(data) {
    let list = await GetLocationDetail.getAreaDetails(data);
    if (list) {
      this.setState({ areaList: list.data });
    }
  }
  componentDidMount() {
    this.getLocationList();
  }
  createService = async () => {
    let { userData } = this.state;
    let { firstName, ZoneDetail, phoneNumber, shippingAddress, areaDetail } =
      userData;
    let validateObj = {
      firstName,
      phoneNumber,
      ZoneDetail,
      areaDetail,
      shippingAddress,
    };
    let error = objectRequiredFieldValidation(validateObj);
    if (
      error ||
      !ZoneDetail?.Name ||
      !areaDetail?.Name ||
      minLength(3, firstName) ||
      characterValidate(firstName) ||
      maxLength(50, firstName) ||
      (phoneNumber &&
        (phoneNumberValidate(phoneNumber) || numberValidate(phoneNumber)))
    ) {
      return this.setState({ error: true });
    } else {
      validateObj.zoneId = ZoneDetail.id;
      if (phoneNumber) {
        validateObj.phoneNumber = phoneNumber;
      }
      const data = {
        fullName: firstName,
        phone: phoneNumber,
        zoneName: ZoneDetail.Name,
        city: areaDetail.Name,
        shippingAddress: shippingAddress,
      };
      if (data) {
        let list = await GetLocationDetail.createAddress(data);
        if (list.code === 200) {
          window.location.reload();
          // this.setState({ open: !this.state.open })
        }
      }
    }
  };
  render() {
    let { userData, error, zoneList, areaList } = this.state;
    let { firstName, phoneNumber, ZoneDetail, areaDetail, shippingAddress } =
      userData;
    let disableSaveButton =
      !firstName ||
      !phoneNumber ||
      !shippingAddress ||
      !ZoneDetail ||
      !areaDetail;

    return (
      <div>
        <button className="btn btn-primary" onClick={(e) => this.handleOpen()}>
          <i className="fas fa-plus m-1"></i>Add new
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
                  Add New Address
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
                <div className="modal-body">
                  <div className="d-flex flex-column ">
                    <form>
                      <div className="form-group">
                        <InputField
                          className="zee-input-field auto-firstName  w-100"
                          label="Full Name"
                          required={true}
                          value={firstName}
                          name="firstName"
                          data-test="user-firstname-input"
                          error={
                            error &&
                            (requiredValidate(firstName) ||
                              minLength(3, firstName) ||
                              maxLength(250, firstName) ||
                              characterValidate(firstName))
                              ? true
                              : false
                          }
                          errorMsg={
                            requiredValidate(firstName) ||
                            minLength(3, firstName) ||
                            maxLength(250, firstName) ||
                            characterValidate(firstName)
                          }
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <InputField
                          className="zee-input-field auto-phoneNumber w-100"
                          label="Phone Number"
                          value={phoneNumber}
                          name="phoneNumber"
                          data-test="user-number-input"
                          onChange={this.handleChange}
                          error={
                            error &&
                            (numberValidate(phoneNumber) ||
                              phoneNumberValidate(phoneNumber)) &&
                            phoneNumber.length
                              ? true
                              : false
                          }
                          errorMsg={
                            numberValidate(phoneNumber) ||
                            phoneNumberValidate(phoneNumber)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <SelectWithSearch
                          className="zee-SelectWSearch-field auto-ZoneDetail"
                          id="ZoneDetail"
                          name="ZoneDetail"
                          data-test="role-value-button"
                          label={"State/City"}
                          placeholder=""
                          disableCloseOnSelect={false}
                          limitTags={1}
                          moreText={"more"}
                          multiple={false}
                          keyText={"Name"}
                          data={zoneList?.map((data) => ({
                            id: data.id,
                            Name: data.name,
                          }))}
                          value={ZoneDetail?.Name || null}
                          onChange={this.handleStateChange}
                          required={true}
                          error={error && !ZoneDetail?.Name ? true : false}
                          errorMsg={constantText.role_msg_text}
                        />
                      </div>
                      <div className="form-group">
                        {/* <InputField
                          className="zee-input-field auto-firstName  w-100"
                          label="City Name"
                          required={true}
                          value={cityName}
                          name="cityName"
                          data-test="user-firstname-input"
                          error={
                            error &&
                            (requiredValidate(cityName) ||
                              minLength(3, cityName) ||
                              maxLength(250, cityName) ||
                              characterValidate(cityName))
                              ? true
                              : false
                          }
                          errorMsg={
                            requiredValidate(cityName) ||
                            minLength(3, cityName) ||
                            maxLength(250, cityName) ||
                            characterValidate(cityName)
                          }
                          onChange={this.handleChange}
                        /> */}
                        <SelectWithSearch
                          className="zee-SelectWSearch-field auto-ZoneDetail"
                          id="areaDetail"
                          name="areaDetail"
                          data-test="role-value-button"
                          label={"Locality/Area"}
                          placeholder=""
                          disableCloseOnSelect={false}
                          limitTags={1}
                          moreText={"more"}
                          multiple={false}
                          keyText={"Name"}
                          data={areaList?.map((data) => ({
                            id: data.id,
                            Name: data.name,
                          }))}
                          value={areaDetail?.Name || null}
                          onChange={this.handleStateChange}
                          required={true}
                          error={error && !areaDetail?.Name ? true : false}
                          errorMsg={constantText.role_msg_text}
                        />
                      </div>
                      <div className="form-group">
                        <InputField
                          className="zee-textarea-field w-100"
                          label="Address (Area and Street)"
                          value={shippingAddress}
                          multiline
                          data-test="text-area-create-user"
                          name="shippingAddress"
                          onChange={this.handleChange}
                        />
                      </div>
                    </form>
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
                  buttonText={"Save"}
                  disabled={disableSaveButton}
                  data-test="create-user-button"
                  onClick={this.createService}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
