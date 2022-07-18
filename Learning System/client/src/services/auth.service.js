import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
    login(email, password) {
        return axios.post(API_URL + "/login", {
            email,
            password,
        });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username, email, password, role) {
        return axios.post(API_URL + "/register", {
            username,
            email,
            password,
            role
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

// 需要寫new，是因為AuthService是一個class，我們直接幫這個class做一個object出來。
export default new AuthService();