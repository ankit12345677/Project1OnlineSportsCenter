import React, { useState, useEffect } from "react";
import { Grid, Button, MenuItem, Select, Paper } from "@material-ui/core";
import { GetSalonDetails } from "../../../../services";

export const ServiceAddParlour = ({ parentCallback, state }) => {
  const [inputList, setInputList] = useState(
    state.length > 0
      ? state.map((item) => ({ ...item, readonly: false }))
      : [
          {
            GENDER: null,
            SERVICEID: null,
            PRICE: null,
            GRANDTOTAL: null,
          },
        ]
  );

  const [listData, setServiceData] = useState([]);

  // handle input change
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
        GENDER: null,
        SERVICEID: null,
        PRICE: null,
        GRANDTOTAL: null,
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
  console.log(inputList);
  return (
    <Grid className="p-3">
      {inputList.map((x, i) => {
        return (
          <Paper
            className="row price_list_details"
            style={
              i % 2
                ? { background: "#F6F6F6", marginTop: "1rem" }
                : { background: "#E3F9F5", marginTop: "1rem" }
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
                name="GENDER"
                value={x.GENDER}
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
                name="SERVICEID"
                value={x.SERVICEID}
                onChange={(e) => handleInputChange(e, i)}
              >
                <MenuItem value="" selected>
                  <em>None</em>
                </MenuItem>
                {listData
                  ? listData.map((row, index) =>
                      row.gender === x.GENDER ? (
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
                PRICE<span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="PRICE"
                placeholder="ex: 100"
                value={x.PRICE}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Customer Price*</label>
              <input
                className="form-control"
                name="GRANDTOTAL"
                placeholder="ex: 1"
                value={x.GRANDTOTAL}
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
          </Paper>
        );
      })}
    </Grid>
  );
};

export default ServiceAddParlour;
