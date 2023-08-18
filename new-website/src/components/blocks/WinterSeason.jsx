// react
import React, { useState, useEffect } from "react";

// third-party
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
// application
import { Link } from "react-router-dom";
import { GetUserLogin } from "../../services";
export default function WinterSeason(props) {
  const { layout } = props;
  const [item, setItem] = useState([]);
  useEffect(async () => {
    let canceled = false;
    const user = await GetUserLogin.getCollection();
    if (user) {
      if (canceled) {
        return;
      }
      setItem(user.data);
    }
    return () => {
      canceled = true;
    };
  }, []);
  const winterList = item?.map((winter, index) => (
    <div className="container" key={index}>
      <div class={index % 1 ? "block-header my-3" : "block-header my-3"}>
        <h4 class="block-header__title">{winter.name}</h4>
        <div class="block-header__divider"></div>
      </div>
      <div className="block-features__list_winter">
        <Grid container spacing={24}>
          {winter.items && winter.items.length
            ? winter.items.map((row, index) => (
                <Grid
                  key={index}
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                  style={{ padding: "4px" }}
                >
                  <Card key={index}>
                    <Link to={`/shop/catalog/${row.slug}`}>
                      <CardMedia
                        component="img"
                        image={row.thumbnail}
                        alt={row.slug}
                      />
                    </Link>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </div>
    </div>
  ));
  return (
    <div className={`block block-features block-features--layout--${layout}`}>
      {winterList}
    </div>
  );
}

WinterSeason.propTypes = {
  layout: PropTypes.oneOf(["classic", "boxed"]),
};

WinterSeason.defaultProps = {
  layout: "classic",
};
