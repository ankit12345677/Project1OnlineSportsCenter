import { useRef, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var weekfullday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var day_suffix = {
  1: "st",
  2: "nd",
  3: "rd",
  21: "st",
  22: "nd",
  23: "rd",
  31: "st",
};
var months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
var months_full = {
  1: "January",
  2: "Febuary",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


const disableArrow = (
  { year, month },
  disableFromCalendarDate,
  arrowClick = "right"
) => {
  const disableYear = disableFromCalendarDate.getFullYear();
  const disableMonth = disableFromCalendarDate.getMonth();
  if (arrowClick === "right") {
    return year < disableYear
      ? false
      : year > disableYear
      ? true
      : month > disableMonth;
  } else {
    return year > disableYear
      ? false
      : year < disableYear
      ? true
      : month <= disableMonth;
  }
};

const disableFutureDate = () => {};

const getNumberOfWeek = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const d = new Date(year, month, 0);
  return Math.floor((d.getDate() - 1) / 7) + 1;
};

const range = (start, end) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const onKeyDown = (e, type = "number") => {
  // const { key } = e;
  // console.log(
  //   "e",
  //   typeof key,
  //   (key >= "0" && key <= "9") ||
  //     key == "+" ||
  //     key == "(" ||
  //     key == ")" ||
  //     key == "-" ||
  //     key == "ArrowLeft" ||
  //     key == "ArrowRight" ||
  //     key == "Delete" ||
  //     key == "Backspace"
  // );
  // switch (type) {
  //   case "number":
  //   default:
  //     return (key >= "0" && key <= "9") ||
  //       key == "+" ||
  //       key == "(" ||
  //       key == ")" ||
  //       key == "-" ||
  //       key == "ArrowLeft" ||
  //       key == "ArrowRight" ||
  //       key == "Delete" ||
  //       key == "Backspace"
  //       ? key
  //       : "";
  // }
};
const getIdsObject = (object, id) => {
  const ids = [];
  JSON.stringify(object, (key, value) => {
    if (key === `${id}`) ids.push(value);
    return value;
  });
  return ids;
};

const updateDate = (numberOfDays, format = "", date = new Date()) =>
  moment(moment(date).add(numberOfDays, "d").toDate()).format(
    format.toLocaleUpperCase()
  );

const getTime = (time) =>
  `${parseInt(time)}:${(time * 60) % 60 < 10 ? 0 : ""}${(time * 60) % 60}:00`;
const getIntFromTime = (time) => {
  const arr = time.split(":");
  return parseInt(arr[0]) + arr[1] / 60;
};
const getTimeDuration = (d1, d2) => {
  return (Math.abs(new Date(d1) - new Date(d2)) / 60000 / 60).toPrecision(2);
};

const exractObject = (obj, data = {}, keyName = "") => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && Array.isArray(obj[key])) {
      data[keyName ? `${keyName}_${key}` : key] = obj[key];
    } else if (typeof obj[key] === "object" && !_.isEmpty(obj[key])) {
      data = {
        ...data,
        ...exractObject(obj[key], data, keyName ? `${keyName}_${key}` : key),
      };
    } else {
      data[keyName ? `${keyName}_${key}` : key] = obj[key];
    }
  });
  return { ...data };
};

const exractObjectArr = (arr, formatObj = [], condtions = {}) => {
  const data = [];
  for (let index = 0; index < arr.length; index++) {
    const element = exractObject(arr[index], {});
    let obj = {};
    formatObj.forEach((key) => {
      if (
        condtions.hasOwnProperty(key) &&
        Array.isArray(condtions[key]) &&
        !isNaN(element[key]) &&
        element[key] !== null
      ) {
        obj[key] = condtions[key][element[key]];
      } else if (
        condtions.hasOwnProperty(key) &&
        typeof condtions[key] === "object" &&
        condtions[key].type === "date"
      ) {
        if (element[key]) {
          obj[key] = get_formated_date(
            new Date(element[key]).getTime(),
            condtions[key].format
          );
        }
      } else {
        obj[key] = element[key];
      }
      if (element["TAT_UNIT"] === "") {
        element["TAT"] = element.TAT + " -";
      }
      element["TAT"] = element.TAT + " " + element.TAT_UNIT;
    });
    obj = { ...obj, ..._.omit(element, formatObj) };
    data.push({ ...obj });
  }
  return data;
};
const exractUpdateArray = (arr, formatObj = [], condtions = {}) => {
  const data = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    let obj = {};
    formatObj.forEach((key) => {
      if (
        condtions.hasOwnProperty(key) &&
        Array.isArray(condtions[key]) &&
        !isNaN(element[key]) &&
        element[key] !== null
      ) {
        obj[key] = condtions[key][element[key]];
      } else if (
        condtions.hasOwnProperty(key) &&
        typeof condtions[key] === "object" &&
        condtions[key].type === "date"
      ) {
        if (element[key]) {
          obj[key] = get_formated_date(
            new Date(element[key]).getTime(),
            condtions[key].format
          );
        }
      } else {
        obj[key] = element[key];
      }
    });
    obj = { ...obj, ..._.omit(element, formatObj) };
    data.push({ ...obj });
  }
  return data;
};

const formatObj = (arr, formatObj = []) => {
  const data = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    let obj = {};
    formatObj.forEach((key) => {
      obj[key] = element[key];
    });
    obj = { ...obj, ..._.omit(element, formatObj) };

    data.push({ ...obj });
  }
  return data;
};
const getStartAndLastDate = (date = new Date()) => {
  return {
    START_DATE: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    END_DATE: moment(
      new Date(date.getFullYear(), date.getMonth() + 1, 0)
    ).format("YYYY-MM-DD"),
  };
};

const get_full_date_var = (ip) => {
  if (ip < 10) {
    ip = "0" + ip;
  }
  return ip;
};

const get_curr_date = (format) => {
  var dt = new Date();
  dt.setMinutes(dt.getMinutes() + 330 + Number(dt.getTimezoneOffset()));
  return get_formated_date(dt / 1000, format);
};

const get_formated_date = (timestamp, format, time_zone = 330) => {
  if (format === undefined) {
    format = "Y-m-d H:i:s";
  }
  if (timestamp === undefined) {
    timestamp = new Date() / 1000;
  }
  var dt;
  if (typeof timestamp === "string") {
    if (timestamp.length == 10) {
      timestamp += " 00:00:00";
    }
    dt = new Date(timestamp);
  } else if (typeof timestamp === "object") {
    dt = new Date(timestamp);
  } else {
    dt = new Date(timestamp * 1000);
  }
  if (dt == "Invalid Date") {
    return null;
  }
  var Y = dt.getFullYear();
  if (Y.toString().length > 4) {
    dt = new Date(timestamp);
  }
  //dt.setMinutes(dt.getMinutes() + Number(time_zone) + Number(dt.getTimezoneOffset()));
  var dobj = {};
  dobj["Y"] = dt.getFullYear();
  dobj["y"] = dt.getYear();
  dobj["n"] = dt.getMonth() + 1;
  dobj["m"] = get_full_date_var(dobj.n);
  dobj["j"] = dt.getDate();
  dobj["d"] = get_full_date_var(dobj.j);
  if (dobj["Y"] + "-" + dobj["m"] + "-" + dobj["d"] == "1970-01-01") {
    return null;
  }
  dobj["w"] = dt.getDay();
  dobj["N"] = dobj.w;
  dobj["D"] = weekday[dobj.w];
  dobj["l"] = weekfullday[dobj.w];
  dobj["S"] = day_suffix[dobj.j] || "th";
  dobj["M"] = months[dobj.n];
  dobj["F"] = months_full[dobj.n];
  dobj["G"] = dt.getHours();
  dobj["H"] = get_full_date_var(dobj.G);
  dobj["i"] = get_full_date_var(dt.getMinutes());
  dobj["s"] = get_full_date_var(dt.getSeconds());
  dobj["g"] = dobj.G;
  dobj["t"] = get_full_date_var(new Date(dobj.Y, dobj.n, 0).getDate());
  dobj["A"] = " AM";
  dobj["a"] = " am";
  if (dobj["g"] >= 12) {
    dobj["g"] %= 12;
    dobj["A"] = " PM";
    dobj["a"] = " pm";
  }
  if (dobj["g"] == 0) {
    dobj["g"] = 12;
  }
  if (dobj.N == 0) {
    dobj.N = 7;
  }
  if (dobj.y >= 100) {
    dobj.y -= 100;
  }
  dobj["W"] =
    1 +
    Math.round(
      ((dt.getTime() - new Date(dobj.Y, 0, 4).getTime()) / 86400000 + 1) / 7
    );
  dobj["h"] = get_full_date_var(dobj.g);
  var date_str = "";
  format
    .toString()
    .split("")
    .forEach((fm) => {
      date_str += dobj.hasOwnProperty(fm) ? dobj[fm] : fm;
    });
  return date_str;
};
const getPreviousMonth = (month) => {
  const d = new Date();
  return d.setMonth(d.getMonth() - month);
};

export {
  exractObject,
  exractObjectArr,
 
};
