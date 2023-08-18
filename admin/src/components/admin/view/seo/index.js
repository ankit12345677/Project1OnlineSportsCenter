import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { GetProductDetails } from "../../../services";
import { useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";

export const Seomaster = () => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [keyword, setKeyword] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e) => {
    let data = {
      productId: id,
      title: title,
      description: description,
      keyword: keyword,
    };
    let seo = await GetProductDetails.createSeoForProduct(data);
    if (seo) {
      NotificationManager.success("Successfully created seo", "Seo");
    }
  };
  return (
    <Grid>
      <label>Seo Details</label>
      <div className="row price_list_details">
        <div className="col-md-4">
          <label className="form-label">
            Title<span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            name="title"
            placeholder="ex: title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">
            Description<span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            name="description"
            placeholder="ex: description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">
            Keyword<span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            name="keyword"
            placeholder="ex: keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <div
        className="form-group text-right" /* style={this.state.toggle ? { display: 'block' } : { display: 'none' }} */
      >
        <button
          className="save-btn hover-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </Grid>
  );
};

export default Seomaster;
