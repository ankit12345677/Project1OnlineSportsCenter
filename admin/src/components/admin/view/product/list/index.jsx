import React, { Component } from 'react';
import {
    Button, Typography
} from "@material-ui/core";
import { GetProductDetails, GetCategoryDetails } from '../../../../services';
import AutoSelect from "../../../../common/autoselect";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from '../../../../loader';
import { NotificationManager } from 'react-notifications';
import LazyLoad from 'react-lazyload';
import swal from 'sweetalert';

const Arrays = (data, fieldName, fieldValue) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
        data.map((item, key) => {
            arrayItem.push({ label: item.id + '--' + item[fieldName], value: item[fieldValue] });
            return null;
        });
    }
    return arrayItem;
};

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: [], selectedProduct: '', isloaded: false, isLoaded: false, getAllProduct: [], catList: [],
            categoryId: '', status: '', files: '',
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    fileSelectedHandler = (e) => {
        this.setState({ files: e.target.files });
    }
    async getCategory() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({ catList: list.data })
    }
    async getProductList(data) {
        this.setState({ isloaded: false })
        let list = await GetProductDetails.getAllProductList(data);
        if (list) {
            this.setState({
                getAllProduct: list,
                isloaded: true
            })
        }
    }
    async SearchAllProductList() {
        let list = await GetProductDetails.searchAllProductList();
        if (list.data) {
            this.setState({
                searchList: list.data,
            })
        }
    }
    async componentDidMount() {
        this.getProductList();
        this.getCategory();
        this.SearchAllProductList();
    }
    handleSelectedProduct = async (name, selected) => {
        if (name === "product_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectedProduct: selected,
            });
            this.setState({ changed: true });
        }
    }
    async handlDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetProductDetails.getDeleteProduct(id);
                    if (value) {
                        this.getProductList();
                    }
                }
            });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isloaded: false })
        let data = { id: this.state.selectedProduct.value }
        let list = await GetProductDetails.getAllProductList(data);
        if (list) {
            this.setState({
                getAllProduct: list,
                isloaded: true
            })
        }
    }
    //pagination 
    handleStatus = async (index, value, getData) => {
        let status = getData.status === "active" ? 0 : 1;
        let data = { productId: getData.id, status: status }
        let list = await GetProductDetails.getStatusUpdated(data);
        if (list) {
            NotificationManager.success("Update status", "Status")
            // window.location.reload();
        }
    }

    handleChangeStock = async (index, value, getData) => {
        let data = { id: getData.id, Available: !getData.Available }
        let list = await GetProductDetails.getStockUpdated(data);
        if (list) {
            NotificationManager.success("Update status", "Status")
            // window.location.reload();
        }
    }

    handlePageClick = (e) => {
        let data = { page: e.selected + 1 }
        this.getProductList(data);
    };
    handleSearchByCat = async (event) => {
        event.preventDefault();
        this.setState({ isloaded: false })
        const { status, categoryId } = this.state;
        let data = { status: status, categoryId: categoryId };
        let list = await GetProductDetails.getAllProductList(data);
        if (list) {
            this.setState({
                getAllProduct: list,
                isloaded: true
            })
        }
    }
    async handlProductVarient(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetProductDetails.getProductVarient(id);
                    if (value) {
                        this.getProductList();
                    }
                }
            });
    }

    handleUpload = (row) => {
        this.setState({ isLoaded: true })
        const formData = new FormData();
        formData.append('productId', row.productId);
        formData.append('varientId', row.id);
        for (const file of this.state.files) {
            formData.append('file', file)
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        swal({
            title: "Are you sure?",
            text: "You want to add Images",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.getUploadVarientPhoto(formData, config);
                    if (list) {
                        this.setState({ isLoaded: false })
                    } else {
                        NotificationManager.error("error");
                        this.setState({ isLoaded: false })
                    }
                }
            });

    }

    render() {
        const { searchList, selectedProduct, isloaded, isLoaded, getAllProduct, catList, } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Products</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-12">

                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="bulk-section mt-30">
                            <a href="/admin/product/create" className="add-btn hover-btn">Add New</a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="bulk-section mt-30">
                            <div className="search-by-name-input">
                                <select className="form-control" name="categoryId" value={this.state.categoryId} onChange={(e) => this.handleChange(e)}>
                                    <option >Change Category</option>
                                    {
                                        catList ?
                                            catList.map((row, index) => (
                                                <option key={index} value={row.id}>{row.name}</option>
                                            ))
                                            : ''
                                    }
                                </select>
                            </div>
                            <div className="input-group">
                                <select className="form-control" name="status" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                    <option selected>Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit" onClick={this.handleSearchByCat}>Search Category</button>
                                </div>
                                <div className="input-group-append">
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="col-lg-12">
                                {
                                    isLoaded ? <Loader />:''
                                }
                                <div className="row">
                                    <div className="col-lg-8 col-md-8">
                                        {/* <label className="form-label"><b>Select Product*</b></label> */}
                                        <br />
                                        <AutoSelect
                                            className="basic-single"
                                            value={selectedProduct}
                                            onChange={this.handleSelectedProduct}
                                            isSearchable={true}
                                            name="product_id"
                                            options={Arrays(searchList, "name", "id")}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Search</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-title-2">
                                <h4>All Products</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}>S.N</th>
                                                <th style={{ width: 100 }}>Image</th>
                                                {/* <th style={{ width: 200 }}>Name</th> */}
                                                <th className="text-center">Price Details</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isloaded ?
                                                getAllProduct.product.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{row.id}</td>
                                                        <td>

                                                            {
                                                                row.productphotos ?
                                                                    row.productphotos.slice(0, 1).map(p => (
                                                                        <LazyLoad>
                                                                            <img className="img-fluid" src={p.imgUrl} alt="product" />
                                                                        </LazyLoad>

                                                                    ))
                                                                    : ""
                                                            }

                                                            {/* <div className="cate-img-5">
                                                                <img src={row.photo} alt="product-name" />
                                                            </div> */}
                                                        </td>
                                                        {/* <td>{row.name}</td> */}
                                                        <td>
                                                            <table className="table ucp-table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        {/* <th>BuyerPerice</th>
                                                                        <th>SellerPrice</th>
                                                                        <th>UnitSize</th> */}
                                                                        <th>Item</th>
                                                                        <th>Stock</th>
                                                                        <th>Photo</th>
                                                                        <th>Action</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {row.ProductVariants ?
                                                                        row.ProductVariants.map((row, index) => (
                                                                            <tr key={index}>
                                                                                {/* <td>{row.buyerPrice}</td>
                                                                                <td>{row.sellerPrice}</td>
                                                                                <td>{row.unitSize}</td> */}
                                                                                <td>{row.productName}</td>
                                                                                <td>
                                                                                    <button type="button" className={row.Available ? "btn btn-sm btn-secondary btn-toggle active" : "btn btn-sm btn-secondary btn-toggle"} data-toggle="button" aria-pressed="true" autocomplete="off" onClick={(e) => this.handleChangeStock(index, e.target.value, row)}> <div className="handle"></div> </button>
                                                                                </td>
                                                                                <td>
                                                                                    <input className="form-control" type="file" multiple name="files" onChange={this.fileSelectedHandler} />
                                                                                    <button className="save-btn hover-btn" type="submit" onClick={(e)=>this.handleUpload(row)}>Upload</button>
                                                                                </td>
                                                                                <Typography className="delete-btn" onClick={(e) => this.handlProductVarient(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                                            </tr>
                                                                        )) : ''
                                                                    }
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                        <td>
                                                            <button type="button" className={row.status === "active" ? "btn btn-sm btn-secondary btn-toggle active" : "btn btn-sm btn-secondary btn-toggle"} data-toggle="button" aria-pressed="true" autocomplete="off" onClick={(e) => this.handleStatus(index, e.target.value, row)}> <div className="handle"></div> </button>
                                                        </td>
                                                        <td className="action-btns">
                                                            <Link to={{
                                                                pathname: `/admin/product/edit/${row.id}`,
                                                                state: { row }
                                                            }}>
                                                                <Typography className="edit-btn"><i className="fas fa-edit" /></Typography>
                                                            </Link>
                                                            <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                        </td>
                                                    </tr>
                                                ))
                                                : 'Loading...'

                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    containerClassName={'pagination'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                    breakLabel={"..."}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    pageCount={getAllProduct.pages}
                                    onPageChange={this.handlePageClick}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
