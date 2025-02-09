import apiClient from "./index.js";

export const getPaginatedBooks = async (page = 1, limit = 10) => {
  return await apiClient.get(`/books/allBooks?${page}&${limit}`);
};

export const postBook = async (data) => {
  return await apiClient.post("/books/add", data);
};
