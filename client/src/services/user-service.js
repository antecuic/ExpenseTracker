import axios from 'axios';
import authHeader from './auth-headers';

class UserService {
  getBudget(uid) {
    return axios.get(`/api/getBudget/${uid}`, { headers: authHeader() });
  }

  getUser(uid) {
    return axios.get(`/api/userData/${uid}`, { headers: authHeader() });
  }

  addItem(value, description, creator, type) {
    return axios.patch('/api/add', {
      value,
      description,
      creator,
      type
    },
    {
      headers: authHeader()
    })
  }

  getItems(creator) {
    return axios.get(`/api/getItems/${creator}`, {
      headers: authHeader()
    })
  }

  deleteByID(id, creator, value, type) {
    return axios.delete(`/api/delete/${id}`, {
      headers: authHeader(),
      data: {
        creator,
        type,
        value
      }
    })
  }

  changeDescription(description ,id) {
    return axios.post('/api/changeDescription', {
      description,
      id
    }, {
      headers: authHeader()
    }
    )
  }

}

export default new UserService();