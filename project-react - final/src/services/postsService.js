import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAllPosts() {
  return http.get(`${apiUrl}/posts`);
}

export function getPost(postId) {
  return http.get(`${apiUrl}/posts/${postId}`);
}

export function deletePost(postId) {
  return http.delete(`${apiUrl}/posts/${postId}`);
}
export function getSearchPosts(search) {
  return http.get(`${apiUrl}/posts/search/${search}`);
}

export function editPost(post) {
  const postId = post._id;
  delete post._id;
  return http.put(`${apiUrl}/posts/${postId}`, post);
}

export function getMyPosts() {
  return http.get(`${apiUrl}/posts/my-posts`);
}

export function createPost(post) {
  return http.post(`${apiUrl}/posts`, post);
}
export function getFavoritedPosts() {
  return http.get(`${apiUrl}/users/favorited`);
}
export default {
  createPost,
  getMyPosts,
  getPost,
  editPost,
  deletePost,
  getAllPosts,
  getSearchPosts,
  getFavoritedPosts,
};
