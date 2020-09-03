import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getUser(post) {
  return http.get(`${apiUrl}/users/${post.user_id}`);
}
export async function favorite(postid) {
  const user = await http.put(`${apiUrl}/users/favorite/${postid}`);
  return user;
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export async function getCurrentUsername() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    const user_id = await http.get(`${apiUrl}/users/${user._id}`);
    return user_id;
  } catch (ex) {
    return null;
  }
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  getCurrentUser,
  getCurrentUsername,
  logout,
  getJwt,
  getUser,
  favorite,
};
