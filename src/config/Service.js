import axios from "axios"; //import { base_url, prod_url } from "./WebConstant";

const base_url = process.env.REACT_APP_BASEURL;
// const prod_url = process.env.REACT_APP_PRODURL

export var Http = {
  GetAPI: async (url, data) => {
    const UserToken = await JSON.parse(sessionStorage.getItem("loggedIn"));
    let header = {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: UserToken,
    };

    return axios({
      method: "GET",
      url: base_url + url,
      params: { data },
      headers: header,
    })
      .then((e) => {
        return e;
      })
      .catch((e) => {
        console.log("error", e);
        alert("Something went wrong!");
        return e;
      })
      .then((e) => {
        // console.log("getData", e);
        return e;
      })
      .catch((e) => {
        console.log("error", e);
        alert("Something went wrong!");
        return e;
      });
  }, //Authorization
  PostAPI: (url, body) => {
    var headers = {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: JSON.parse(sessionStorage.getItem("loggedIn")),
    };
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
