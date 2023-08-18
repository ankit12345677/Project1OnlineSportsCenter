import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { GetCategoryDetails } from '../../../../../../services';
// import RichTextEditor from '../../../../../../RichTextEditor';

export default class SubEdit extends Component {
    constructor(props) {
        super(props);
        const { sub_name, title, keyword, desc } = this.props.state;
        this.state = {
            name: sub_name, keyword: keyword, desc: desc, title: title
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleOpen() {
        this.setState({ open: !this.state.open, loading: true })
    }
    handleContentChange = contentHtml => {
        this.setState({
            content: contentHtml
        });
    };
    handleClose() {
        this.setState({ open: !this.state.open })
    }
    async handleSubmit(e) {
        let data = { id: this.props.state.id, sub_name: this.state.name, keyword: this.state.keyword, desc: this.state.desc, title: this.state.title }
        let list = await GetCategoryDetails.getUpdateSubList(data);
        if (list) {
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
                                <h5 className="modal-title" id="exampleModalLabel">Update Sub Category</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Name*</label>
                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group my-1">
                                    <label className="form-label">Title<b className="text-danger">*</b></label>
                                    <textarea className="form-control" placeholder="ex:new title" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group my-1">
                                    <label className="form-label">Keyword<b className="text-danger">*</b></label>
                                    <textarea className="form-control" placeholder="ex: janakpur,chitwashop" name="keyword" value={this.state.keyword} onChange={(e) => this.handleChange(e)} />
                                </div>

                                <div className="form-group my-1">
                                    <label className="form-label">Meta Descriptoin<b className="text-danger">*</b></label>
                                    <textarea className="form-control" placeholder="description...." name="desc" value={this.state.desc} onChange={(e) => this.handleChange(e)} />

                                    {/* <RichTextEditor
                                        content={this.state.content}
                                        handleContentChange={this.handleContentChange}
                                        placeholder="insert text here..."
                                    /> */}
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

