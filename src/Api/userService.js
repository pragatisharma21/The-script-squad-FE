import apiClient from "./index.js";

const loginUser = (data) => {
  return apiClient.post("/user/login", data);
};

const signupUser = (data) => {
  return apiClient.post("/user/signup", data);
};

const googleSingnupUser = (token)=>{
  return apiClient.post("/user/googleSignup", {token})
}

export { loginUser, signupUser, googleSingnupUser };
