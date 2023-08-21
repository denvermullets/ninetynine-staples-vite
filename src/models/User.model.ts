import axios from "axios";
import config from "../config";

export interface UserRecord {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  username: string;
  token: string;
}

type UserModel = {
  createUser: (username: string, password: string, email: string) => Promise<UserRecord>;
  login: (email: string, password: string) => Promise<UserRecord>;
};

const User: UserModel = {
  createUser: async (username, password, email) => {
    const newUser = await axios
      .post(`${config.API_URL}/players`, {
        player: {
          username: username,
          password: password,
          email: email,
        },
      })
      .catch((error) => {
        throw error;
      });

    if (newUser.status === 200) {
      return { ...newUser.data.player, ...newUser.data.token };
    }
  },
  login: async (email, password) => {
    const user = await axios
      .post(`${config.API_URL}/login`, {
        player: {
          email: email,
          password: password,
        },
      })
      .catch((error) => {
        throw error;
      });

    if (user.status === 200) {
      return { ...user.data.player, ...user.data.token };
    }
  },
};

export default User;
