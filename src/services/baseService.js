import axios from "axios";
import { store } from "../redux/store";
// import { clearAuth, setrefreshToken } from "../redux/slice/authSlice"
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL)
const baseService = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        'ngrok-skip-browser-warning': '1'
    },
});

export default baseService;