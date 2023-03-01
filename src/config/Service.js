import axios from "axios";
import { base_url, prod_url } from "./WebConstant";

export var Http = {

  GetAPI: (url, data, token = null) => {
    return axios({
        method: 'GET',
        url: base_url + url,
        params: {data},
        headers: {},
    }).then((e) => {
      console.log("getData", e);
        return e;
    }).catch((e) => {
      console.log("error", e);
        alert('Something went wrong!');
        return e;
    })
},
  PostAPI: (url, body, token = null) => {
    console.log("Api",base_url + url);
    console.log(body)
    var headers = {
      "Content-Type": "multipart/form-data",
      "Accept":'application/json',
      "Authorization":token
  };
       
  console.log('body', body)
    return axios({
      method: 'POST',
      url: base_url + url,
      data: body,
      headers: headers,
  }).then((e) => {
      return e;
  }).catch((e) => {
      console.log('Error', e);
      alert( 'Something went wrong!')
      return e;
  })
  },
};



