import apiClient from "./index.js";

export const getFleetAdminPayments = (page = 1, limit = 10) => {
  return apiClient.get(`/admin/getFleetList?${page}&${limit}`);
};

export const updateUserType = (userId)=>{
    return apiClient.patch(`/admin/updateType/${userId}`)
}
