import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AutoSelect from "../../../../common/autoselect";
import { GetProductDetails } from '../../../../services';
import Loader from '../../../../loader';
import ReactPaginate from 'react-paginate';
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


export default class Uploadphoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], files: '', selectedProduct: '',selectedSearchProduct:'', imagelist: [], isLoaded: false,
            searchList: []
        }
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

    // ADD Product Photo
    handleSelectedAddProduct = async (name, selected) => {
        if (name === "product_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectedAddProduct: selected,
            });
            this.setState({ changed: true });
        }
    }
    fileSelectedHandler = (e) => {
        this.setState({ files: e.target.files });
    }
    // pagination 
    handlePageClick = (e) => {
        let data = { page: e.selected + 1 }
        this.getProducPhototList(data); 
    };
    async getProducPhototList(data) {
        this.setState({ isLoaded: true })
        let imagelist = await GetProductDetails.getAllProductPhoto(data);
        if (imagelist) {
            this.setState({
                getdata: imagelist,
                isLoaded: false
            })
        }else{
            this.setState({ isLoaded: false})
        }
    }
    async SearchAllProductList() {
        let list = await GetProductDetails.searchAllProductList();
        if (list.data) {
            this.setState({
                searchList: list.data,
                getList: list.data,
            })
        }
    }
    handleSearchProduct = async (event) => {
        // event.preventDefault();
        this.setState({ isLoaded: true })
        let data = { id: this.state.selectedProduct.value }
        let list = await GetProductDetails.getAllProductPhotoList(data);
        if (list) {
            this.setState({
                getdata: list,
                isLoaded: false
            })
        }else{
            this.setState({ isLoaded: false})
        }
    }
    async componentDidMount() {
        this.getProducPhototList();
        this.SearchAllProductList();
        this.handleSearchProduct();
    }
   
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const formData = new FormData();
        formData.append('productId', this.state.selectedAddProduct.value);
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
                    let list = await GetProductDetails.getUploadProductImage(formData, config);
                    if (list) {
                        this.setState({ isLoaded: false})
                        window.location.reload();
                    } else {
                        toast.error("error");
                        this.setState({ isLoaded: false})
                    }
                }
            });

    }
    async handlDeleteById(data) {
        this.setState({ isLoaded: true})
        let list = { id: data.id, imgUrl: data.imgUrl }
        swal({
            title: "Are you sure?",
            text: "You want to delete Image from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetProductDetails.getProductPhotoDeleteById(list);
                    if (value) {
                        toast.success("successfully Deleted");
                        window.location.reload();
                        this.setState({ isLoaded: false})
                    } else { 
                        this.setState({ isLoaded: false})
                        toast.error("error"); }
                }else{
                    this.setState({ isLoaded: false })
                }
            });
    }
    render() {
        const { selectedProduct,selectedAddProduct, searchList, getdata, isLoaded } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/product/create">Products</a></li>
                    <li className="breadcrumb-item active">more image</li>
                </ol>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Upload Product Images</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Select Product*</label>
                                                <AutoSelect
                                                    className="basic-single"
                                                    value={selectedAddProduct}
                                                    onChange={this.handleSelectedAddProduct}
                                                    isSearchable={true}
                                                    name="product_id"
                                                    options={Arrays(searchList, "name", "id")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Slider Image*</label>
                                                <input className="form-control" type="file" multiple name="files" onChange={this.fileSelectedHandler} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Upload
                                                </button>
                                                <ToastContainer autoClose={1500} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                        {
                            isLoaded ? <Loader /> : ''
                        }
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="col-lg-12">
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
                                        <button className="save-btn hover-btn" type="submit" onClick={this.handleSearchProduct}>Search</button>
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
                                                <th style={{ width: 160 }}>S.N</th>
                                                <th style={{ width: '350px' }}>Product Name</th>
                                                <th style={{ width: '100px' }} >Brand</th>
                                                <th className="center"> Images</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getdata ? 
                                                getdata.data.map((row, index) => (
                                                    row.productphotos ?
                                                        <tr key={index}>
                                                            <td>{row.id}</td>
                                                            <td style={{ width: '350px' }}>{row.name}</td>
                                                            <td style={{ width: '100px' }}>{row.brand}</td>
                                                            <td>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: '350px' }}>Photo</th>
                                                                            <th style={{ width: '100px' }} >Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {row.productphotos.map((data, index) => (
                                                                            <tr key={index}>
                                                                                <td><img src={data.imgUrl} alt="product-name" height="65px" /></td>
                                                                                <td>
                                                                                    <span className="delete-btn" style={{ cursor: 'pointer' }} onClick={(e) => this.handlDeleteById(data)} ><i className="fas fa-trash-alt" /></span>
                                                                                </td>

                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr> : 'No data '
                                                )): 'No data'
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={getdata ? getdata.pages:''}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
