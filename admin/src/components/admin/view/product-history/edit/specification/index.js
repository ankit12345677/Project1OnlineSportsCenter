import React, { useState } from "react";
import { Grid } from "@material-ui/core";
const SpecificationList = ({ callback, state }) => {
  const [inputList, setInputList] = useState(
    state.length > 0
      ? state.map((item) => ({ ...item, readonly: true }))
      : [{ id: null, type: null, value: null }]
  );

  return (
    <React.Fragment>
      {inputList.map((x, i) => {
        return (
          <Grid
            container
            spacing={2}
            style={
              i % 2
                ? { marginTop: "1rem", background: "rgb(195 232 191 / 25%)" }
                : { background: "#DAF7A6" }
            }
          >
            <Grid item md={6} lg={6}>
              <input
                className="form-control"
                name="type"
                placeholder="ex: Battery Backup"
                value={x.type}
                disabled
              />
            </Grid>
            <Grid item md={6} lg={6}>
              <input
                className="form-control"
                name="value"
                placeholder="ex: Upto 15 hours"
                value={x.value}
                disabled
              />
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};
export default SpecificationList;
