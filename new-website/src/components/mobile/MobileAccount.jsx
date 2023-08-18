// react
import React, { useState, useEffect } from "react";
// third-party
import PropTypes from "prop-types";

// application
import Collapse from "../shared/Collapse";
import AppLink from "../shared/AppLink";
import { getCookie } from "../../function";
import { GetUserLogin } from "../../services";
function MobileAccount(props) {
  const { level, onItemClick } = props;
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };
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
    <ul className={`mobile-links mobile-links--level--${level}`}>
      <Collapse
        toggleClass="mobile-links__item--open"
        render={({ setItemRef }) => {
          let linkOrButton;
          linkOrButton = (
            <AppLink
              className="mobile-links__item-link"
              onClick={() => handleItemClick("link")}
            >
              {token && user ? (
                <div>
                  <li>
                    <div class="mobile-links__item">
                      <div class="mobile-links__item-title">
                        <a
                          class="mobile-links__item-link"
                          to={"/account/dashboard"}
                        >
                          Dashboard
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="mobile-links__item">
                      <div class="mobile-links__item-title">
                        <a
                          class="mobile-links__item-link"
                          href="/account/profile"
                        >
                          Edit Profile
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="mobile-links__item">
                      <div class="mobile-links__item-title">
                        <a
                          class="mobile-links__item-link"
                          href="/account/addresses/5"
                        >
                          Edit Address
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="mobile-links__item">
                      <div class="mobile-links__item-title">
                        <a
                          class="mobile-links__item-link"
                          href="/account/orders"
                        >
                          Order History
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="mobile-links__item">
                      <div class="mobile-links__item-title">
                        <a
                          class="mobile-links__item-link"
                          href="/account/orders/5"
                        >
                          Order Details
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="mobile-links__item">
                      <div class="mobile-links__item-title">
                        <a
                          class="mobile-links__item-link"
                          href="/account/addresses"
                        >
                          Address Book
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="mobile-links__item">
                      <div class="mobile-links__item-title">
                        <span
                          class="mobile-links__item-link"
                          onClick={handleLogout}
                        >
                          Logout
                        </span>
                      </div>
                    </div>
                  </li>
                </div>
              ) : (
                <li>
                  <div class="mobile-links__item">
                    <div class="mobile-links__item-title">
                      <a
                        class="mobile-links__item-link"
                        href={"/account/login"}
                      >
                        Login
                      </a>
                    </div>
                  </div>
                </li>
              )}
            </AppLink>
          );
          return (
            <div className="mobile-links__item" ref={setItemRef}>
              <div className="mobile-links__item-title">{linkOrButton}</div>
            </div>
          );
        }}
      />
    </ul>
  );
}

MobileAccount.propTypes = {
  links: PropTypes.array,
  level: PropTypes.number,
  onItemClick: PropTypes.func,
};

MobileAccount.defaultProps = {
  links: [],
  level: 0,
};

export default MobileAccount;
