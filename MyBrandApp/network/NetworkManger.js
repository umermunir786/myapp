// import { accessToken } from "../store/redux/Slices/Authslice";
// import { store } from "../store/store";

// export const AUTHORIZE = "AUTHORIZE";
// export const NETWORK_ERROR = "NETWORK ERROR";

// export const Method = {
//   GET: "GET",
//   POST: "POST",
//   PUT: "PUT",
//   PATCH: "PATCH",
//   DELETE: "DELETE",
// };

// export const Status = {
//   SUCCESS: 200,
//   ERROR: 400,
//   AUTHENTICATION_FAIL: 401,
//   NOT_FOUND: 400,
// };

// var defaultHeaders = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };
// // export const BASE_URL = "https://5b4b-58-84-31-246.ngrok-free.app/";

// export const callApi = async (
//   method,
//   Url,
//   bodyParams,
//   onSuccess,
//   onError,
//   count = 0,
//   multipart
// ) => {
//   let token = store.getState()?.auth?.accessToken ?? false;
//   let refreshToken = store.getState()?.auth?.refreshToken ?? false;
//   let url = BASE_URL + Url;
//   if (multipart) {
//     defaultHeaders["Content-Type"] = "multipart/form-data";
//   } else {
//     defaultHeaders["Content-Type"] = "application/json";
//   }
//   if (token) {
//     defaultHeaders["Authorization"] = token;
//   }
//   let fetchObject = {
//     method: method,
//     headers: defaultHeaders,
//     body:
//       method == "GET"
//         ? null
//         : method == "DELETE"
//         ? null
//         : multipart
//         ? bodyParams
//         : JSON.stringify(bodyParams),
//   };
//   if (bodyParams == null) {
//     delete fetchObject.body;
//   }
//   try {
//     let response = await fetch(url, fetchObject);
//     let responseJson = await response.json();
//     if (responseJson?.message == "jwt expired" && count < 2 && refreshToken) {
//       let fetchObject = {
//         method: "POST",
//         headers: defaultHeaders,
//         body: JSON.stringify({
//           device: {
//             id: getDeviceId(),
//           },
//         }),
//       };
//       await fetch(`${BASE_URL}user/refresh/${refreshToken}`, fetchObject)
//         .then(async (res) => {
//           let resJson = await res.json();
//           store.dispatch(accessToken(resJson.data.accessToken));
//           callApi(method, Url, bodyParams, onSuccess, onError, count + 1);
//         })
//         .catch((err) => console.log("error refresh token=> ", err));
//     } else if (responseJson?.status < 400) {
//       onSuccess(responseJson);
//       // if (responseJson?.errorType) {
//       //   console.log(responseJson?.errorType);
//       // } else if (responseJson?.message) {
//       //   console.log('Eror', responseJson?.message);
//       // }
//     } else {
//       onError(responseJson?.message);
//       if (responseJson?.errorType) {
//         console.log(responseJson?.errorType);
//       } else if (responseJson?.message) {
//         console.log("on error", responseJson);
//       }
//     }
//   } catch (error) {
//     console.log("Network request failed");
//     console.log("Api call try catch error:", error.message);
//   }
// };
