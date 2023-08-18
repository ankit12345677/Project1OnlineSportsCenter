import { createBrowserHistory } from "history";

export const history = createBrowserHistory(
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  })
);
