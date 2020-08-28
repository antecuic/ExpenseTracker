import axios from "axios";

class AuthService {
  login(email, password) {
    return axios
      .post('/api/login', {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          let data = response.data
          localStorage.setItem("user", JSON.stringify(data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password, currency) {
    return axios.post('/api/signup', {
      name,
      email,
      password,
      currency
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();