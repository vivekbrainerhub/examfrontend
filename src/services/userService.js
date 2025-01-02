import { setToken, setUpdate, setUser } from "../redux/slice/userSlice";
import { store } from "../redux/store";
import baseService from "./baseService";
export const registerService = (data) => {
  return baseService
    .post("/create", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
export const loginService = (data) => {
  return baseService
    .post("/login", data)
    .then((response) => {
      store.dispatch(setToken(response?.data?.data));
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
// export const upadteUserService = (data, id) => {
//   return baseService
//     .put(`/profile/${id}`, data)
//     .then((response) => {
//       store.dispatch(setUpdate(response?.data?.data));
//       return response.data;
//     })
//     .catch((error) =>
//       error.response?.data ? error.response?.data : error.message
//     );
// };
// export const allUserService = (limit = 5, page = 2) => {
//   return baseService
//     .get(`/alluser?page=${page}&pageSize=${limit}`)
//     .then((response) => {
//       store.dispatch(setUser(response?.data?.data));
//       return response.data;
//     })
//     .catch((error) =>
//       error.response?.data ? error.response?.data : error.message
//     );
// };
