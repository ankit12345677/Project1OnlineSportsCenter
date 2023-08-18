import * as React from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Indicator from "../../header/Indicator";

import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Home, Category } from "@mui/icons-material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Paper from "@mui/material/Paper";

import classes from "./BottomBar.module.css";
import { history } from "../../../helpers/history";

function FixedBottomNavigation(props) {
  const ref = React.useRef(1);
  const [value, setValue] = React.useState("Home");
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (windowWidth > 650) {
    return true;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ width: 500 }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            className={value === "Home" ? classes.bottom_bar_element : null}
            label="Home"
            value="Home"
            icon={<Home />}
          />
          <BottomNavigationAction
            className={value === "Wishlist" ? classes.bottom_bar_element : null}
            label="Wishlist"
            icon={
              <Indicator
                className="indicator--mobile d-sm-flex"
                url="/shop/wishlist"
                value={props.wishlist.length}
                icon={<FavoriteBorderOutlinedIcon />}
              />
            }
          />
          <BottomNavigationAction
            className={value === "Category" ? classes.bottom_bar_element : null}
            label="Category"
            value="Category"
            icon={<Category />}
          />
          <BottomNavigationAction
            className={value == "Profile" ? classes.bottom_bar_element : null}
            label="Profile"
            value="Profile"
            icon={
              <PermIdentityIcon
                onClick={() => history.push("/account/profile")}
              />
            }
          />
          <BottomNavigationAction
            label="Profile"
            value="Profile"
            icon={<PermIdentityIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  wishlist: state.wishlist,
});

export default connect(mapStateToProps)(FixedBottomNavigation);
