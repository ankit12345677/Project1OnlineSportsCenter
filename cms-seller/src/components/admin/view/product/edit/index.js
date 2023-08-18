import React, { Component } from "react";
import { Button, Paper } from "@material-ui/core";
import MainCategorylist from "../../../../common/category/main-category";
import { GetProductDetails, GetCategoryDetails } from "../../../../services";
import swal from "sweetalert";
import Pricecolormanagement from "./price-management";
import SpecificationList from "./specification";
import HighLightList from "./HighLight";
import ImageDetail from "./Image-field";
import Loader from "../../../../loader";
import NotificationManager from "react-notifications/lib/NotificationManager";
import Tags from "../tag";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state;
    this.state = {
      id: data.id,
      selectedCategory: data.maincat.id,
      mainCatName: data.maincat.name,
      subCatName: data && data.SubCategory ? data.SubCategory.sub_name : null,
      childCatName:
        data && data.SubChildCategory ? data.SubChildCategory.name : null,
      isLoaded: false,
      priceDetails: [],
      SpecificationDetails: data.ch_specifications,
      HighLightDetais: data.HighLightDetail,
      ShippingDays: data.ShippingDays,
      LocalDeiveryCharge: data.LocalDeiveryCharge,
      ZonalDeiveryCharge: data.ZonalDeiveryCharge,
      NationalDeiveryCharge: data.NationalDeiveryCharge,
      warrantyType: data.WarrantyType,
      warrantyPeriod: data.WarrantyPeriod,
      ProductVarient: data,
      tags: null,
    };
  }
  handleBack() {
    this.props.history.goBack();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };
  handleContentChange = (contentHtml) => {
    this.setState({
      content: contentHtml,
    });
  };
  handleCategory = async (value) => {
    this.setState({ selectedCategory: value });
    let categoryId = value;
    let list = await GetCategoryDetails.getSelectSubCategory(categoryId);
    this.setState({ getList: list.data });
  };
  handleSubCategory = async (value) => {
    this.setState({ selectedSubCategory: value });
    let list = await GetCategoryDetails.getAllSubChildCategory(value);
    this.setState({ getsublist: list.data, blockhide: true });
  };
  handleChildCategory = async (value) => {
    this.setState({ selectedChildCategory: value });
  };
  handleBrandList = async (value) => {
    this.setState({ brandId: value });
  };
  callback = (data) => {
    this.setState({ priceDetails: data });
  };
  SpecificationCallBack = (data) => {
    this.setState({ SpecificationDetails: data });
  };
  handleHightLight = (data) => {
    this.setState({ HighLightDetais: data });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoaded: true });
    const {
      id,
      selectedCategory,
      LocalDeiveryCharge,
      ZonalDeiveryCharge,
      NationalDeiveryCharge,
      warrantyType,
      warrantyPeriod,
      ShippingDays,
      priceDetails,
      SpecificationDetails,
      HighLightDetais,
      tags,
    } = this.state;
    let data = {
      productId: id,
      categoryId: selectedCategory.CatId,
      subCategoryId: selectedCategory.SubCatId,
      childCategoryId: selectedCategory.Child_Id,
      LocalDeiveryCharge: LocalDeiveryCharge,
      ZonalDeiveryCharge: ZonalDeiveryCharge,
      NationalDeiveryCharge: NationalDeiveryCharge,
      warrantyType: warrantyType,
      warrantyPeriod: warrantyPeriod,
      ShippingDays: ShippingDays,
      SpecificationDetails: SpecificationDetails,
      priceDetails: priceDetails,
      HighLightDetais: HighLightDetais,
      tags: tags,
    };
    swal({
      title: "Are you sure?",
      text: "You want to update New Product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.updateSellerProductList(data);
        if (list) {
          NotificationManager.success(list.message, "Message");
          this.setState({ isLoaded: false });
          setTimeout(() => this.props.history.goBack(), 1000);
        } else {
          this.setState({ isLoaded: false });
        }
      } else {
        this.setState({ isLoaded: false });
      }
    });
  };
  selectedTags = (tags) => {
    this.setState({ tags: tags });
  };
  render() {
    const { mainCatName, subCatName, childCatName, isLoaded } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Products</h2>
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
          <li className="breadcrumb-item active">update</li>
        </ol>
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
              Category Info
            </a>
          </li>
          <li className="nav-item text-black ">
            <a
              className="nav-link show "
              id="pills-three-tab"
              data-toggle="pill"
              href="#pills-three"
              role="tab"
              aria-controls="pills-three"
              aria-selected="false"
            >
              Warranty Service
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link show "
              id="pills-four-tab"
              data-toggle="pill"
              href="#pills-four"
              role="tab"
              aria-controls="pills-four"
              aria-selected="false"
            >
              Specifications
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link show "
              id="pills-five-tab"
              data-toggle="pill"
              href="#pills-five"
              role="tab"
              aria-controls="pills-five"
              aria-selected="false"
            >
              HighLight
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link show "
              id="pills-six-tab"
              data-toggle="pill"
              href="#pills-six"
              role="tab"
              aria-controls="pills-six"
              aria-selected="false"
            >
              Image
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link show "
              id="pills-two-tab"
              data-toggle="pill"
              href="#pills-two"
              role="tab"
              aria-controls="pills-two"
              aria-selected="false"
            >
              Product Info
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
            <div className="row">
              <div className="col-lg-7 col-md-7">
                <Paper>
                  <div class="card-header">
                    <h5 class="mb-0 h6">Category Info</h5>
                  </div>
                  <div className="card card-static-2 mb-30">
                    <p className="p-2">
                      {"Home" +
                        " / " +
                        mainCatName +
                        " / " +
                        subCatName +
                        " / " +
                        childCatName}
                    </p>
                    <div className="card-body-table">
                      <div className="news-content-right p-2">
                        <div className="form-group">
                          <label className="form-label">
                            Main Category<span className="text-danger">*</span>
                          </label>
                          <MainCategorylist
                            onSelectCategory={this.handleCategory}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
                <Paper className="p-2">
                  <Tags
                    className="p-1"
                    selectedTags={this.selectedTags}
                    tags={[]}
                  />
                </Paper>
              </div>
              <div className="col-lg-5 col-md-5">
                <Paper>
                  <div class="card-header">
                    <h5 class="mb-0 h6">Shipping Configuration</h5>
                  </div>
                  <div class="card-body">
                    <div className="form-group row">
                      <label className="col-md-4 form-label">
                        Local Delivery Charge
                      </label>
                      <div className="col-md-8">
                        <input
                          className="form-control"
                          placeholder="ex:Rs.50"
                          type="number"
                          name="LocalDeiveryCharge"
                          value={this.state.LocalDeiveryCharge}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-4 form-label">
                        Zonal Delivery Charge
                      </label>
                      <div className="col-md-8">
                        <input
                          className="form-control"
                          placeholder="ex:Rs.50"
                          type="number"
                          name="ZonalDeiveryCharge"
                          value={this.state.ZonalDeiveryCharge}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-4 form-label">
                        National Delivery Charge
                      </label>
                      <div className="col-md-8">
                        <input
                          className="form-control"
                          type="number"
                          name="NationalDeiveryCharge"
                          placeholder="ex:Rs.50"
                          value={this.state.NationalDeiveryCharge}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </Paper>

                <Paper className="mt-3">
                  <div class="card-header">
                    <h5 class="mb-0 h6">Estimate Shipping Time</h5>
                  </div>
                  <div className="form-group mb-3 pd-20">
                    <label htmlFor="name">Shipping Days</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        name="ShippingDays"
                        value={this.state.ShippingDays}
                        onChange={(e) => this.handleChange(e)}
                        placeholder="ex:3 days"
                      />
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend"
                        >
                          days
                        </span>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            </div>
          </div>

          {/* tab 2 */}
          <div
            className="tab-pane fade"
            id="pills-two"
            role="tabpanel"
            aria-labelledby="pills-two-tab"
          >
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card card-static-2 mb-30">
                  <div class="card-header">
                    <h5 class="mb-0 h6">Add New Product</h5>
                  </div>
                  <div className="card-body-table">
                    <div className="news-content-right pd-20">
                      <Paper style={{ padding: "1rem", background: "#f7f7f" }}>
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <Pricecolormanagement
                              parentCallback={this.callback}
                              state={this.state.ProductVarient}
                            />
                          </div>
                        </div>
                      </Paper>
                      <div className="button_price">
                        <div
                          className="form-group" /*  style={this.state.toggle ? { display: 'block' } : { display: 'none' }} */
                        >
                          <button
                            className="save-btn hover-btn"
                            type="submit"
                            onClick={this.handleSubmit}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* tab 3 */}
          <div
            className="tab-pane fade"
            id="pills-three"
            role="tabpanel"
            aria-labelledby="pills-three-tab"
          >
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <Paper>
                  <div class="card-header">
                    <h5 class="mb-0 h6">Warranty Service</h5>
                  </div>
                  <div className="form-group mb-3 pd-20">
                    <label htmlFor="name">Type</label>
                    <div className="input-group">
                      <select
                        className="form-control"
                        name="warrantyType"
                        value={this.state.warrantyType}
                        onChange={(e) => this.handleChange(e)}
                      >
                        <option disabled selected>
                          Select type
                        </option>
                        <option value="Local">Local Seller Warranty</option>
                        <option value="No">No Warranty</option>
                        <option value="International">
                          International Warranty
                        </option>
                        <option value="100% orginal">
                          100% orginal product
                        </option>
                        <option value="Brand">Brand Warranty</option>
                        <option value="Seller">Seller Warranty</option>
                      </select>
                    </div>
                  </div>
                </Paper>
              </div>

              <div className="col-lg-6 col-md-6">
                <Paper>
                  <div class="card-header">
                    <h5 class="mb-0 h6">Warranty Service</h5>
                  </div>
                  <div className="form-group mb-3 pd-20">
                    <label htmlFor="name">Period</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ex:1month,1year,lifetime"
                        name="warrantyPeriod"
                        value={this.state.warrantyPeriod}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                  </div>
                </Paper>
              </div>
            </div>
          </div>
          {/* type four */}
          <div
            className="tab-pane fade"
            id="pills-four"
            role="tabpanel"
            aria-labelledby="pills-four-tab"
          >
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card card-static-2 mb-30">
                  <div class="card-header">
                    <h5 class="mb-0 h6 font-weight-bold">Specification Info</h5>
                  </div>
                  <div className="card-body-table">
                    <div className="news-content-right">
                      <Paper style={{ padding: "1rem", background: "#f7f7f" }}>
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <SpecificationList
                              callback={this.SpecificationCallBack}
                              state={
                                this.props.location.state.ch_specifications
                              }
                            />
                          </div>
                        </div>
                      </Paper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* type five */}
          <div
            className="tab-pane fade"
            id="pills-five"
            role="tabpanel"
            aria-labelledby="pills-five-tab"
          >
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card card-static-2 mb-30">
                  <div class="card-header">
                    <h5 class="mb-0 h6 font-weight-bold">Feature Info</h5>
                  </div>
                  <div className="card-body-table">
                    <div className="news-content-right">
                      <Paper style={{ padding: "1rem", background: "#f7f7f" }}>
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <HighLightList
                              callback={this.handleHightLight}
                              state={this.props.location.state.HighLightDetail}
                            />
                          </div>
                        </div>
                      </Paper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* type six*/}
          <div
            className="tab-pane fade"
            id="pills-six"
            role="tabpanel"
            aria-labelledby="pills-six-tab"
          >
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <ImageDetail />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
