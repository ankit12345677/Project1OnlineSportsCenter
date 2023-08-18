import React, { Component } from 'react';
import {
    Grid, Paper, Button
} from "@material-ui/core";
import Loader from "../../../../../loader"
import { GetProductDetails } from '../../../../../services';
import swal from 'sweetalert';
import NotificationManager from 'react-notifications/lib/NotificationManager';

export default class ImageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [], files: null, thumbnail: null
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFileChange = event => {
        this.setState({ thumbnail: event.target.files[0] });
    };
    async getProductList() {
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        let data = { id: lastSegment }
        let list = await GetProductDetails.getProductById(data);
        if (list) {
            this.setState({ dataList: list.data })
        }

    }
    componentDidMount() {
        this.getProductList()
    }
    fileSelectedHandler = (e) => {
        this.setState({ files: e.target.files });
    }

    handleUpload = (row) => {
        this.setState({ isLoaded: true })
        const formData = new FormData();
        formData.append('productId', row.productId);
        formData.append('varientId', row.varientId);
        formData.append('thumbnail', this.state.thumbnail);
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
                    const list = await GetProductDetails.getSingeImageUpload(formData, config);
                    if (list) {
                        this.setState({ isLoaded: false })
                        this.getProductList()
                    } else {
                        this.setState({ isLoaded: false })
                    }
                }
            });

    }
    handleMultipeUpload = (row) => {
        this.setState({ isLoaded: true })
        const formData = new FormData();
        formData.append('productId', row.productId);
        formData.append('varientId', row.varientId);
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
                    let list = await GetProductDetails.getMultipleImageUpload(formData, config);
                    if (list) {
                        this.setState({ isLoaded: false })
                        this.getProductList()
                    } else {
                        this.setState({ isLoaded: false })
                    }
                }
            });

    }

    async handlDeleteById(row) {
        const data = { productId: row.productId, varientId: row.varientId, thumbnail: row.thumbnail }
        swal({
            title: "Are you sure?",
            text: "You want to delete thumnail from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetProductDetails.getThumbnailDelete(data);
                    if (value) {
                        NotificationManager.success(value.message, "Message")
                        this.getProductList()
                    }
                }
            });
    }
    handlMultipeDelete(row) {
        const data = { id: row.id, imgUrl: row.imgUrl }
        swal({
            title: "Are you sure?",
            text: "You want to delete thumnail from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetProductDetails.getMultipleImageDelete(data);
                    if (value) {
                        NotificationManager.success(value.message, "Message")
                        this.getProductList()
                    }
                }
            });
    }
    render() {
        const { dataList, isLoaded } = this.state;
        return (
            <Paper style={{ background: '#f7f7f' }}>
                {
                    isLoaded ? <Loader /> : ''
                }
                <div className="card card-static-2">
                    <div className="card-body-table">
                        <div className="table-responsive">
                            <table className="table ucp-table table-hover">
                                <thead>
                                    <tr>
                                        <th >ID</th>
                                        <th >Product Name</th>
                                        <th>Thumbnail</th>
                                        <th>Banner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataList ?
                                            dataList.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.productId}</td>

                                                    <td>{row.productName}</td>
                                                    <td>
                                                        {
                                                            row.thumbnail ?
                                                                <div>
                                                                    <img src={row.thumbnail} alt="thumnai" height="50" />
                                                                    <button className="save-btn hover-btn" type="submit" onClick={(e) => this.handlDeleteById(row)}><i className="fas fa-trash-alt" /></button>
                                                                </div> :
                                                                <Grid>
                                                                    <input type="file" className="form-control" name="thumbnail" onChange={this.onFileChange} />
                                                                    <small><b className="text-danger">*</b>Add at 1 images of your product & Size between 500x500 </small><br />
                                                                    <Button variant="contained" onClick={(e) => this.handleUpload(row)} disabled={!this.state.thumbnail}>Upload</Button>
                                                                </Grid>
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            row.photos.length ?
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: '350px' }}>Photo</th>
                                                                            <th style={{ width: '100px' }} >Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {row.photos.map((data, index) => (
                                                                            <tr key={index}>
                                                                                <td><img src={data.imgUrl} alt="product-name" height="65px" /></td>
                                                                                <td>
                                                                                    <span className="delete-btn" style={{ cursor: 'pointer' }} onClick={(e) => this.handlMultipeDelete(data)} ><i className="fas fa-trash-alt" /></span>
                                                                                </td>

                                                                            </tr>))}
                                                                    </tbody>
                                                                </table> :
                                                                <div>
                                                                    <input className="form-control" type="file" multiple name="files" onChange={this.fileSelectedHandler} />
                                                                    <small><b className="text-danger">*</b>Add at 4 images of your product & Size between 500x500 </small><br />
                                                                    <Button variant="contained" onClick={(e) => this.handleMultipeUpload(row)} disabled={!this.state.files}>Upload</Button>
                                                                </div>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                            : "not data found"
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }
}
