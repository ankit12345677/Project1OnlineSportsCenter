import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import RichTextEditor from '../../../../../RichTextEditor';

export const Pricecolormanagement = ({ parentCallback, state }) => {
    const [inputList, setInputList] = useState(state.ProductVariants.length > 0 ? state.ProductVariants.map(item =>({ ...item, readonly: true })) : [{ 
        id:null,
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
        refundable: true,
        qtyWarning: null,
        COD: null
    }]);
   
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
                                disabled
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Product Code<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="productCode"
                                placeholder="ex: FGSTW"
                                value={x.productCode}
                                disabled
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Size*</label>
                            <input
                                className="form-control"
                                name="unitSize"
                                placeholder="ex: 100g, 200g, L, M, S"
                                value={x.unitSize}
                                disabled
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label">Brand(<b>{x.brand?x.brand.name:''}</b>)*</label>
                            <input
                                className="form-control"
                                name="unitSize"
                                value={x.brand ? x.brand.name:''}
                                disabled
                            />
                        </Grid>
                        <Grid item md={12} lg={12}>
                            <label className="form-label">Color(<b>{x.color ? x.color.TITLE:''}</b>)</label>
                            <input
                                className="form-control"
                                name="unitSize"
                                value={x.color ? x.color.TITLE:''}
                                disabled
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Stock Visibility*</label>
                            <select className="form-control" name="stockType" value={x.stockType} disabled>
                                <option disabled selected>Select type</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Refundabe*</label>
                            <select className="form-control" name="refundable" value={x.refundable} disabled>
                                <option disabled selected>Select type</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Stock Quantity*</label>
                            <input
                                className="form-control"
                                name="qtyWarning"
                                placeholder="ex: 100"
                                value={x.qtyWarning}
                                disabled
                            />
                        </Grid><Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Cash On Delivery*</label>
                            <select className="form-control" name="COD" value={x.COD} disabled>
                                <option disabled selected>Select type</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">MRP Price<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="distributorPrice"
                                placeholder="ex: 100"
                                value={x.distributorPrice}
                                disabled
                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Your Selling Price*</label>
                            <input
                                className="form-control"
                                name="buyerPrice"
                                placeholder="ex: 1"
                                value={x.buyerPrice}
                                disabled
                            />
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <label className="form-label font-weight-bold">YouTube Video Url*</label>
                            <input
                                className="form-control"
                                name="youTubeUrl"
                                placeholder="ex: https://youtu.be/nqWZV_OYVIk"
                                value={x.youTubeUrl}
                                disabled
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
                    </Grid>
                );
            })}

        </Grid>
    )
}

export default Pricecolormanagement
