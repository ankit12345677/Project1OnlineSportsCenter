import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Images from "./imageData";
import "./style.css";

const Loader = () => {
  return (
    <Fragment>
      <div id="fullScreenLoader"
        className="loader-wrapper">
        <img
          className="loader-img"
          src={Images?.LoaderGif}
          alt="Loading..."
        />
      </div>
    </Fragment>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loader;
