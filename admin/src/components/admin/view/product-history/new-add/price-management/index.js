import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import RichTextEditor from '../../../../../RichTextEditor';

export const Pricecolormanagement = ({ parentCallback }) => {
    const [inputList, setInputList] = useState([{
        longDesc: null,
        shortDesc: null,
        specification: null,
        productName: null,
        productCode: null,
        distributorPrice: null,
        buyerPrice: null,
        unitSize: null,
        qty: 1,
        colorId: null,
        thumbnail: null,
        galleryImg: null,
        youTubeUrl: null,
        stockType: false,
        REFUNDABLE: true,
        QTYWARNING: null,
        COD: true
    }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        parentCallback(list)

    };
    const handleContentChange = (contentHtml, index) => {
        const list = [...inputList];
        list[index].longDesc = contentHtml;
        setInputList(list);
    };
    const handleShortDesc = (contentHtml, index) => {
        const list = [...inputList];
        list[index].shortDesc = contentHtml;
        setInputList(list);
    };
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        parentCallback(list)
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, {
            longDesc: null,
            shortDesc: null,
            specification: null,
            productName: null,
            productCode: null,
            distributorPrice: null,
            buyerPrice: null,
            unitSize: null,
            qty: 1,
            colorId: null,
            thumbnail: null,
            galleryImg: null,
            youTubeUrl: null,
            stockType: false,
            REFUNDABLE: true,
            QTYWARNING: null,
            COD: true
        }]);

    };
    //end block
    return (
        <Grid >
            {/* <label>Product Price</label> */}
            {inputList.map((x, i) => {
                return (
                    <Grid container spacing={2} style={i % 2 ? { marginTop: '1rem', background: 'rgb(195 232 191 / 25%)' } : { background: '#DAF7A6' }}>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Product Name<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="productName"
                                placeholder="ex: Enter product name"
                                value={x.productName}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Product Code<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="productCode"
                                placeholder="ex: FGSTW"
                                value={x.productCode}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Size*</label>
                            <input
                                className="form-control"
                                name="unitSize"
                                placeholder="ex: 100g, 200g, L, M, S"
                                value={x.unitSize}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid>
                        <Grid item md={3} lg={3} xl={3}>
                            <label className="form-label font-weight-bold">Brand*</label>
                            <input
                                className="form-control"
                                name="unitSize"
                                placeholder="ex: 100g, 200g, L, M, S"
                                value={x.unitSize}
                                disabled
                            />
                        </Grid>
                        <Grid item md={12} lg={12} xl={12}>
                            <label className="form-label font-weight-bold">Color*</label>
                            <input
                                className="form-control"
                                name="unitSize"
                                placeholder="ex: 100g, 200g, L, M, S"
                                value={x.unitSize}
                                disabled
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Stock Visibility*</label>
                            <select className="form-control" name="stockType" value={x.stockType} onChange={e => handleInputChange(e, i)}>
                                <option disabled selected>Select type</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Refundabe*</label>
                            <select className="form-control" name="REFUNDABLE" value={x.REFUNDABLE} onChange={e => handleInputChange(e, i)}>
                                <option disabled selected>Select type</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Stock Quantity*</label>
                            <input
                                className="form-control"
                                name="QTYWARNING"
                                placeholder="ex: 100"
                                value={x.QTYWARNING}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid><Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Cash On Delivery*</label>
                            <select className="form-control" name="COD" value={x.COD} onChange={e => handleInputChange(e, i)}>
                                <option disabled selected>Select type</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">MRP Price<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="distributorPrice"
                                placeholder="ex: 100"
                                value={x.distributorPrice}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Your Selling Price*</label>
                            <input
                                className="form-control"
                                name="buyerPrice"
                                placeholder="ex: 1"
                                value={x.buyerPrice}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <label className="form-label font-weight-bold">YouTube Video Url*</label>
                            <input
                                className="form-control"
                                name="youTubeUrl"
                                placeholder="ex: https://youtu.be/nqWZV_OYVIk"
                                value={x.youTubeUrl}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <label className="form-label font-weight-bold"><b>Short Description*</b></label>
                            <RichTextEditor
                                content={x.shortDesc}
                                handleContentChange={e => handleShortDesc(e, i)}
                                placeholder="insert text here..."
                            />
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <label className="form-label font-weight-bold">Long Description*</label>
                            <RichTextEditor
                                content={x.longDesc}
                                handleContentChange={e => handleContentChange(e, i)}
                                placeholder="insert text here..."
                            />
                        </Grid>
                        <Grid item md={12} lg={12}>
                            <div className="btn-box" style={{ marginTop: '1rem' }}>
                                {inputList.length !== 1 && <Button
                                    variant="contained"
                                    onClick={() => handleRemoveClick(i)} style={{ marginRight: '1rem' }}>Remove</Button>}
                                {inputList.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
                            </div>
                        </Grid>
                    </Grid>
                );
            })}

        </Grid>
    )
}

export default Pricecolormanagement
