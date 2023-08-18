import moment from "moment";
import _ from "lodash";

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

export { exractObject, exractObjectArr };
