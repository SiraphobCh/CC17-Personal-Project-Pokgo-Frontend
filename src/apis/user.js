import axios from "../config/axios";

const userApi = {};

userApi.uploadUserImage = (formData) => axios.patch("/user", formData);

export default userApi;
