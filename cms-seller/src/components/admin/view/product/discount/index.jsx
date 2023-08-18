import React, { Component } from "react";
import { Button, Paper } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import AutoSelect from "../../../../common/autoselect";
import ButtonField from "../../../../common/ButtonField/ButtonField";
import swal from "sweetalert";
import NotificationManager from "react-notifications/lib/NotificationManager";

const Arrays = (data, fieldName, fieldValue) => {
  let arrayItem = [];
  if (data && Array.isArray(data)) {
    data.map((item, key) => {
      arrayItem.push({ label: item[fieldName], value: item[fieldValue] });
      return null;
    });
  }
  return arrayItem;
};

export default class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      discount: "",
      selectedType: "",
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBack(e) {
    this.props.history.goBack();
  }
  handleSelectChange = (name, selected) => {
    this.setState({
      productList: {
        ...this.state.productList,
        [name]: selected.value,
      },
      selectedType: selected,
    });
  };
  async getProductList(data) {
    this.setState({ isloaded: false });
    let list = await GetProductDetails.getSellerChildCat(data);
    if (list) {
      this.setState({
        productList: list.data,
        isloaded: true,
      });
    } else {
      this.setState({ isloaded: false });
    }
  }
  async componentDidMount() {
    this.getProductList();
  }
  createService = async (event) => {
    event.preventDefault();
    const { discount, selectedType } = this.state;
    const data = {
      discount: discount,
      childCategoryId: selectedType.value,
    };
    swal({
      title: "Are you sure?",
      text: "You want to product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.updateProductbyCat(data);
        if (list) {
          NotificationManager.success(list.message, "Message");
        }
      }
    });
  };

  render() {
    const { productList, discount, selectedType } = this.state;
    let disableSaveButton = !discount || !selectedType.value;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-10 col-lg-6">
            <h2 className="mt-30 page-title">Discount Create</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <Paper className="mt-2">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0 h6">Discount Info</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <label className="col-md-2 col-form-label">Category</label>
                <div className="col-md-10">
                  <AutoSelect
                    className="form-control mb-3 basic-single"
                    value={selectedType}
                    onChange={this.handleSelectChange}
                    isSearchable={true}
                    name="brand_id"
                    options={Arrays(productList, "name", "id")}
                  />
                </div>
              </div>
              <div className="row">
                <label className="col-md-2 col-form-label">
                  Discount(%)<span className="text-danger text-danger">*</span>
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="discount"
                    value={discount}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="ex: 10%"
                  />
                </div>
              </div>
              <ButtonField
                className="theme-btn w-100"
                variant="contained"
                color="primary"
                buttonText={"Create"}
                disabled={disableSaveButton}
                data-test="create-user-button"
                onClick={this.createService}
              />
            </div>
          </div>
        </Paper>
        {/* end */}
      </div>
    );
  }
}
