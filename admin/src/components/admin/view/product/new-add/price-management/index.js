import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';

export const Pricecolormanagement = ({ parentCallback }) => {
    const [inputList, setInputList] = useState([{ productName: null, productCode: null, actualPrice:null, distributorPrice: null, marginPer: null, marginPrice: null, buyerPrice: null, sellerPrice: null, unitSize: null, qty: null, colorCode: null, discountPer: null, discount: null, netPrice: null }]);
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;

        if (list[index].marginPer) {
            list[index].marginPrice = Math.round(((list[index].distributorPrice * list[index].qty) * list[index].marginPer) / 100);
        }

        list[index].buyerPrice = Math.round(((list[index].distributorPrice * list[index].qty)) - list[index].marginPrice);
        list[index].discount = Math.round((list[index].sellerPrice * list[index].discountPer) / 100);
        list[index].total = Math.round(list[index].sellerPrice);
        list[index].netPrice = Math.round(list[index].sellerPrice - list[index].discount);

        setInputList(list);
        parentCallback(list)
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { productName: null, productCode: null, actualPrice:null, distributorPrice: null, marginPer: null, marginPrice: null, buyerPrice: null, sellerPrice: null, unitSize: null, qty: null, colorCode: null, discountPer: null, discount: null, netPrice: null }]);
    };
    //end block

    return (
        <Grid >
            <label>Price List</label>
            {inputList.map((x, i) => {
                return (
                    <div className="row price_list_details">
                        <div className="col-md-3">
                            <label className="form-label">Product Name<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="productName"
                                placeholder="ex: Bultra"
                                value={x.productName}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Product Code<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="productCode"
                                placeholder="ex: FGSTW"
                                value={x.productCode}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Actual Price<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="actualPrice"
                                placeholder="ex: 100"
                                value={x.actualPrice}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">DistributerPrice<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="distributorPrice"
                                placeholder="ex: 100"
                                value={x.distributorPrice}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Quantity<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="qty"
                                placeholder="ex: 1"
                                value={x.qty}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Margin(%)<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="marginPer"
                                placeholder="ex: 5%"
                                value={x.marginPer}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Margin Price<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="marginPrice"
                                placeholder="ex: 50"
                                value={x.marginPrice}
                                /* disabled */
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">Buyer Price*</label>
                            <input
                                className="form-control"
                                name="buyerPrice"
                                placeholder="ex: 100"
                                value={x.buyerPrice}
                                disabled
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">Seller Price*</label>
                            <input
                                className="form-control"
                                name="sellerPrice"
                                placeholder="ex: 105"
                                value={x.sellerPrice}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">Size*</label>
                            <input
                                className="form-control"
                                name="unitSize"
                                placeholder="ex: 1L"
                                value={x.unitSize}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Color Code*</label>
                            <input
                                className="form-control"
                                name="colorCode"
                                placeholder="ex: #ffff"
                                value={x.colorCode}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Discount(%)*</label>
                            <input
                                className="form-control"
                                name="discountPer"
                                placeholder="ex: 1"
                                value={x.discountPer}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Discount Price*</label>
                            <input
                                className="form-control"
                                name="discount"
                                placeholder="ex: 1"
                                value={x.discount}
                                disabled
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Total*</label>
                            <input
                                className="form-control"
                                name="discountPer"
                                placeholder="ex: 1"
                                value={x.total}
                                disabled
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Grand Total*</label>
                            <input
                                className="form-control"
                                name="netPrice"
                                placeholder="ex: 1"
                                value={x.netPrice}
                                disabled
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <div className="btn-box" style={{ marginTop: '2rem' }}>
                                {inputList.length !== 1 && <Button
                                    variant="contained"
                                    onClick={() => handleRemoveClick(i)} style={{ marginRight: '1rem' }}>Remove</Button>}
                                {inputList.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* <button className=" btn btn-success col-sm-3 mt-3 py-2" onClick={caculationTable}>Add Category</button> */}
        </Grid>
    )
}

export default Pricecolormanagement
