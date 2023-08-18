import React, { Component } from 'react'
import {
    Button, Typography
} from "@material-ui/core";
import { NotificationManager } from 'react-notifications';
import { GetCategoryDetails } from '../../../../services';
import Edit from './edit'
import swal from 'sweetalert';
import './index.css'
export default class MainCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', getList: [], keyword: '', description: '', desc: '', title: ''
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    async getCategory() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({ getList: list.data })
    }
    async componentDidMount() {
        this.getCategory();
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    handleStatus = async (index, value, getData) => {
        let status = !getData.status ? 1 : 0;
        const formData = new FormData();
        formData.append('id', getData.id);
        formData.append('status', status);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let list = await GetCategoryDetails.getUpdateCategoryList(formData, config);
        if (list) {
            NotificationManager.success(list.message)
            window.location.reload();
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { name, slug, title, keyword, desc } = this.state;
        let data = { name: name, title: title, slug: slug, keyword: keyword, desc: desc };
        swal({
            title: "Are you sure?",
            text: "You want to Add New Category",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.createCategoryList(data);
                    if (list) {
                        this.getCategory();
                    }
                }
            });
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
                    let value = await GetCategoryDetails.getCategoryDeleteById(id);
                    if (value) {
                        this.getCategory();  
                    }
                }
            });
    }
    render() {
        let self = this.state.getList
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Categories</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Category</li>
                </ol>
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add Main Category</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Name<b className="text-danger">*</b></label>
                                        <input type="text" className="form-control" placeholder="Category name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label">Title<b className="text-danger">*</b></label>
                                        <input type="text" className="form-control" placeholder="ex: buy now" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group my-1">
                                        <label className="form-label">Keyword<b className="text-danger">*</b></label>
                                        <textarea className="form-control" placeholder="ex: janakpur,chitwashop" name="keyword" value={this.state.keyword} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group my-1">
                                        <label className="form-label">Meta Descriptoin<b className="text-danger">*</b></label>
                                        <textarea className="form-control" placeholder="description...." name="desc" value={this.state.desc} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add New</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="all-cate-tags">
                            <div className="row justify-content-between">
                                <div className="col-lg-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h4>All Main Categories</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                            <th scope="col">thumbnail</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Slug</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            self.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td><img src={row.thumbnail} alt="thumbnail" height="30" /></td>
                                                                    <td>{row.name}</td>
                                                                    <td>{row.slug}</td>
                                                                    <td>
                                                                        <button type="button" className={row.status ? "btn btn-sm btn-secondary btn-toggle active" : "btn btn-sm btn-secondary btn-toggle"} data-toggle="button" aria-pressed="true" autocomplete="off" onClick={(e) => this.handleStatus(index, e.target.value, row)}> <div className="handle"></div> </button>

                                                                    </td>
                                                                    <td className="action-btns">
                                                                        <Edit state={row} />
                                                                        <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
