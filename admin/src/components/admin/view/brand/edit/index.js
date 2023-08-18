import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import { GetProductDetails } from '../../../../services';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        const { name , title, keyword, desc} = this.props.state;
        this.state = {
            name: name, title: title, keyword: keyword, desc : desc
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    convertToSlug(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    handleOpen() {
        this.setState({ open: !this.state.open, loading: true })
    }

    handleClose() {
        this.setState({ open: !this.state.open })
    }
    handleChangeLocation = (value) => {
        this.setState({ selectLocation: value });
    }

    async handleSubmit(e) {
        let slug = this.convertToSlug(this.state.name);
        let { name, title, keyword, desc } = this.state;
        let data = { id: this.props.state.id, name: name, slug:slug, title: title, keyword: keyword, desc: desc }
        let list = await GetProductDetails.updatebrandList(data);
        if (list) {
            NotificationManager.success(list.message,"Message")
            window.location.reload();
        }
    }
    render() {
        return (
            <div >
                <a className="edit-btn" onClick={(e) => this.handleOpen()}><i className="fas fa-edit" /></a>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Brand</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Name*</label>
                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Meta Title*</label>
                                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Meta Keyword*</label>
                                    <input type="text" className="form-control" name="keyword" value={this.state.keyword} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Meta Desc*</label>
                                    <input type="text" className="form-control" name="desc" value={this.state.desc} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.handleClose()}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

