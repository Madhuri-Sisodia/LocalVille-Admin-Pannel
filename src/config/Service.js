import axios from "axios";
import { base_url, prod_url } from "./WebConstant";
console.log(base_url)
const UserToken = JSON.parse(sessionStorage.getItem("loggedIn"))
console.log(UserToken)
export var Http = {
  GetAPI: (url, data) => {
    let header = {
      "Content-Type": "multipart/form-data",
      "Accept":'application/json',
      "Authorization":UserToken
  }
  console.log(header)
    return axios({
        method: 'GET',
        url: base_url + url,
        params: {data},
        headers:header,
    }).then((e) => {
      console.log("getData", e);
        return e;
    }).catch((e) => {
      console.log("error", e);
        alert('Something went wrong!');
        return e;
    })
},//Authorization
  PostAPI: (url, body) => {
    console.log("Api",base_url + url);
    console.log(body)
    var headers = {
      "Content-Type": "multipart/form-data",
      "Accept":'application/json',
      "Authorization":JSON.parse(sessionStorage.getItem("loggedIn"))
  };
       
  console.log('body', body)
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
