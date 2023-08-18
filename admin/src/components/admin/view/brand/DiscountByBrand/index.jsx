import React, { Component } from 'react';
import {
    Button 
} from "@material-ui/core";
import { Modal } from '@material-ui/core';
import { GetSupplierDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
export default class DiscountByBrand extends Component {
    constructor(props) {
        super(props);
        const data = this.props.state;
        this.state = {
            id: data.id,
            name: data.name,
            discountPer: ''
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleOpen() {
        this.setState({ open: !this.state.open, loading: true })
    }

    handleClose() {
        this.setState({ open: !this.state.open })
    }
    async handleSubmit(e) {
        let { id, discountPer } = this.state;
        let data = { id: id, discountPer: Number(discountPer) }
        let list = await GetSupplierDetails.updateBrandByPrice(data);
        if (list.code===200) {
            NotificationManager.success("successfully updated")
            window.location.reload();
        }
    }
    render() {
        const { 
            discountPer
        } = this.state;
        let disableSaveButton = !discountPer
        return (
            <div >
            <a className="edit-btn" onClick={(e) => this.handleOpen()}><i className="fas fa-edit" />Update Price</a>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Discount By Brand</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.handleClose()}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Brand Name</label>
                                <input type="text" className="form-control" value={this.state.name} disabled/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Discount(%)</label>
                                <input type="number" className="form-control" name="discountPer" value={this.state.discountPer} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.handleClose()}>Close</button>
                            <Button variant="contained" disabled={disableSaveButton} className={disableSaveButton ? "bg-grey":"save-btn hover-btn"} onClick={() => this.handleSubmit()}>update</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
        )
    }
}
