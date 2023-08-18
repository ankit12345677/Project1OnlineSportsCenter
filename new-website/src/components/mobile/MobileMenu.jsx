// react
import React, { useState, useEffect } from "react";

// third-party
import classNames from "classnames";
import { connect } from "react-redux";
import { Box, Link, Button, Typography, Avatar, Stack } from "@mui/material";
import Iconify from "../Icons/Icons";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { history } from "../../helpers/history";

// application
import MobileLinks from "./MobileLinks";
// import { Cross20Svg } from "../../svg";
import { currencyChange } from "../../store/currency";
import { localeChange } from "../../store/locale";
import { mobileMenuClose } from "../../store/mobile-menu";

// data stubs
import mobileMenuLinks from "../../data/mobileMenu";
import { getCookie } from "../../function";
import { GetUserLogin } from "../../services";

function MobileMenu(props) {
  const { mobileMenuState, closeMobileMenu } = props;
  const classes = classNames("mobilemenu", {
    "mobilemenu--open": mobileMenuState.open,
  });

  const handleItemClick = (item) => {
    if (item.type === "link" || item === "link") {
      closeMobileMenu();
    }
  };
  const AccountStyle = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: "rgba(145, 158, 171, 0.12)",
  }));
  const [user, setUser] = useState([]);
  const token = getCookie("token");

  useEffect(async () => {
    let canceled = false;
    if (token) {
      const user = await GetUserLogin.getCustomerDetail(token);
      if (user) {
        if (canceled) {
          return;
        }
        setUser(user.data);
      }
      return () => {
        canceled = true;
      };
    }
  }, [token]);
  const handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };
  return (
    <div className={classes}>
      <div className="mobilemenu__backdrop" onClick={closeMobileMenu} />
      <div className="mobilemenu__body">
        <Stack sx={{ mb: 1, background: "#04555c" }}>
          <Box
            sx={{
              px: 2.5,
              py: 3,
              display: "inline-flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              Chitwshop
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              <button
                type="button"
                className="mobilemenu__close"
                onClick={closeMobileMenu}
              >
                <Iconify
                  icon="gridicons:cross"
                  sx={{ color: "white", width: 20, height: 20 }}
                />
                {/* <Cross20Svg /> */}
              </button>
            </Typography>
          </Box>

          <Box sx={{ mb: 0.2 }} className={token && user ? "" : "d-none"}>
            <Link underline="none" to="#">
              <AccountStyle>
                <Avatar alt="photoURL" />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="title" sx={{ color: "white" }}>
                    {user?.firstName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {user?.email}
                  </Typography>
                </Box>
              </AccountStyle>
            </Link>
          </Box>
        </Stack>
        <div className="mobilemenu__header">
          <div className="mobilemenu__title">Shop By</div>
          {/* <button
            type="button"
            className="mobilemenu__close"
            onClick={closeMobileMenu}
          >
            <Cross20Svg />
          </button> */}
        </div>
        <div className="mobilemenu__content">
          <MobileLinks links={mobileMenuLinks} onItemClick={handleItemClick} />
        </div>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ px: 0.5, pb: 3, mt: 10 }}>
          {token && user ? (
            <Stack
              alignItems="center"
              spacing={3}
              sx={{ pt: 5, borderRadius: 2, position: "relative" }}
              onClick={closeMobileMenu}
            >
              <Box sx={{ width: 100, position: "absolute", top: -50 }} />

              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Stack>
          ) : (
            <Stack
              alignItems="center"
              spacing={3}
              sx={{ pt: 5, borderRadius: 2, position: "relative" }}
              onClick={closeMobileMenu}
            >
              <Box sx={{ width: 100, position: "absolute", top: -50 }} />

              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={() => history.push("/account/login")}
              >
                Login
              </Button>
            </Stack>
          )}
        </Box>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  mobileMenuState: state.mobileMenu,
});

const mapDispatchToProps = {
  closeMobileMenu: mobileMenuClose,
  changeLocale: localeChange,
  changeCurrency: currencyChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
