// react
import React, { Component } from "react";

// third-party
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

// application
import NavPanel from "./NavPanel";
import Search from "./Search";
import Topbar from "./Topbar";
import { history } from "../../helpers/history";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOpen: false,
    };
    this.searchInput = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchOpen } = this.state;

    if (
      searchOpen &&
      searchOpen !== prevState.searchOpen &&
      this.searchInput.current
    ) {
      this.searchInput.current.focus();
    }
  }

  handleOpenSearch = () => {
    this.setState(() => ({ searchOpen: true }));
  };

  handleCloseSearch = () => {
    this.setState(() => ({ searchOpen: false }));
  };
  render() {
    const { layout } = this.props;
    let bannerSection;

    if (layout === "default") {
      bannerSection = (
        <div className="site-header__middle container">
          <div
            className="site-header__logo"
            onClick={() => {
              history.push("/");
            }}
          >
            <img className="logo_desk" src="/logo.png" />
          </div>
          <div className="site-header__search">
            <Search
              context="header"
              inputRef={this.searchInput}
              onClose={this.handleCloseSearch}
            />
          </div>
          <div className="site-header__phone">
            <div className="site-header__phone-title">
              <FormattedMessage
                id="header.phoneLabel"
                defaultMessage="Customer Service"
              />
            </div>
            <div className="site-header__phone-number">
              <FormattedMessage
                id="header.phone"
                defaultMessage="+91 8652873912"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="site-header">
        <Topbar />
        {bannerSection}
        <div className="site-header__nav-panel">
          <NavPanel layout={layout} />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  /** one of ['default', 'compact'] (default: 'default') */
  layout: PropTypes.oneOf(["default", "compact"]),
};

Header.defaultProps = {
  layout: "default",
};

export default Header;
