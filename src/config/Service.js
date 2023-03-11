import axios from "axios";
import { base_url, prod_url } from "./WebConstant";

const userToken = JSON.parse(sessionStorage.getItem("loggedIn"));

export var Http = {
  GetAPI: (url, data, token = userToken) => {
    console.log("token", token);
   let header = {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: userToken,
    }
    return axios({
      method: "GET",
      url: base_url + url,
      params: {},
      headers:header,
      
    })
      .then((e) => {
        console.log("getData", e);
        return e;
      })
      .catch((e) => {
        console.log("error", e);
        if (e?.response?.status == 401) {
          alert(
            "Your account is logged in another device, Please login again."
          );
          sessionStorage.clear();
          history.push("/login");
        } else {
          ("Something went wrong!");
        }
        return e;
      });
  },
  PostAPI: (url, body, token = userToken) => {
    console.log("Api", base_url + url);
    var headers = {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: userToken,
    };

    console.log("body", body);
    return axios({
      method: "POST",
      url: base_url + url,
      data: body,
      headers: headers,
    })
      .then((e) => {
        return e;
      })
      .catch((e) => {
        if (e?.response?.status == 401) {
          alert(
            "Your account is logged in another device, Please login again."
          );
          sessionStorage.clear();
           history.push("/login");
        } else {
          ("Something went wrong!");
        }
        return e;
      });
  },
};
