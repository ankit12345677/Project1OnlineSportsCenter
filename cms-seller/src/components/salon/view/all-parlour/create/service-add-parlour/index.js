import React, { useState, useEffect } from "react";
import { Grid, Button, MenuItem, Select } from "@material-ui/core";
// import { exractObjectArr } from "../../../../../../helper/HelpersFunction";
import { GetSalonDetails } from "../../../../../services";

export const ServiceAddParlour = ({ parentCallback }) => {
  const [inputList, setInputList] = useState([
    {
      gender: null,
      serviceId: null,
      SalonPrice: null,
      netPrice: null,
    },
  ]);
  const [listData, setServiceData] = useState([]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    parentCallback(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        gender: null,
        cat_id: null,
        serviceId: null,
        SalonPrice: null,
        discountPer: null,
        discountPrice: null,
        netPrice: null,
      },
    ]);
  };
  //end block

  useEffect(async () => {
    let list = await GetSalonDetails.getServiceByGender();
    if (list.code === 200) {
      setServiceData(list.data);
    }
  }, listData);

  return (
    <Grid container>
      {inputList.map((x, i) => {
        return (
          <div
            className={i % 2 ? "row bg-gray text-white" : "row my-2"}
            style={
              i % 2
                ? { background: "#f9f9f9", padding: "1rem" }
                : { background: "#e3e9e6", padding: "1rem" }
            }
          >
            <div className="col-md-2">
              <label className="form-label">
                Gender<b className="text-danger">*</b>
              </label>
              <Select
                className="form-control"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="gender"
                value={x.gender}
                onChange={(e) => handleInputChange(e, i)}
              >
                <MenuItem value="" selected>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
              </Select>
            </div>
            <div className="col-md-3">
              <label className="form-label">
                Service<span className="text-danger">*</span>
              </label>
              <Select
                className="form-control"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="serviceId"
                value={x.serviceId}
                onChange={(e) => handleInputChange(e, i)}
              >
                <MenuItem value="" selected>
                  <em>None</em>
                </MenuItem>
                {listData
                  ? listData.map((row, index) =>
                      row.gender === x.gender ? (
                        <MenuItem key={index} value={row.id}>
                          {row.serviceName + " - " + row.gender}
                        </MenuItem>
                      ) : null
                    )
                  : null}
              </Select>
            </div>
            <div className="col-md-2">
              <label className="form-label">
                Price<span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="SalonPrice"
                placeholder="ex: 100"
                value={x.SalonPrice}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">
                Customer Price<span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="netPrice"
                placeholder="ex: 200"
                value={x.netPrice}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>

            <div className="col-md-3">
              <div className="btn-box" style={{ marginTop: "2rem" }}>
                {inputList.length !== 1 && (
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveClick(i)}
                    style={{ marginRight: "1rem" }}
                  >
                    <i className="fas fa-trash-alt" />
                  </Button>
                )}
                {inputList.length - 1 === i && (
                  <Button variant="contained" onClick={handleAddClick}>
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </Grid>
  );
};

export default ServiceAddParlour;
