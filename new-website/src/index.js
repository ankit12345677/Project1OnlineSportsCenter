// react
import React from "react";

import { Provider } from "react-redux";

// application
import * as serviceWorker from "./serviceWorker";
import Root from "./components/Root";
import store from "./store";
import { hydrate, render } from "react-dom";
// styles
import "slick-carousel/slick/slick.css";
import "react-toastify/dist/ReactToastify.min.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-input-range/lib/css/index.css";
import "./scss/style.scss";

const App = (
  <Provider store={store}>
    <NotificationContainer />
    <Root />
  </Provider>
);
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(App, rootElement);
} else {
  render(App, rootElement);
}

serviceWorker.unregister();
