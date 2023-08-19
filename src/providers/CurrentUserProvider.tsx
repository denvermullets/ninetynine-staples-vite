import axios, { AxiosError } from "axios";
import { useState, createContext, ReactNode, useEffect } from "react";
import config from "../config";
import { UserModel } from "../models/User.model";
import { useCookies } from "react-cookie";

type ProviderProps = {
  children: ReactNode;
};

export type CurrentUserContext = {
  currentUser: UserModel | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  createAccount: (email: string, password: string, username: string) => Promise<boolean>;
  emailError: boolean;
  passwordError: boolean;
  usernameError: boolean;
};

// default values for when the app starts up, unsure if currentUser should be null
export const UserContext = createContext<CurrentUserContext>({
  currentUser: null,
  login: async () => false,
  createAccount: async () => false,
  emailError: false,
  passwordError: false,
  usernameError: false,
});

export const CurrentUserProvider = ({ children }: ProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["ninetynine_staples"]);

  const handleAxiosError = (error: unknown | AxiosError, username: boolean) => {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      if (axiosError.response?.status === 401) {
        setEmailError(true);
        setPasswordError(true);
        username && setUsernameError(true);
        return;
      } else {
        console.error("Something went wrong with the request");
        throw new Error(axiosError.message);
      }
    } else {
      console.error("A non-Axios error occurred:", error);
      throw new Error("An error occurred");
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || email === "" || password === "" || !password) {
      return false;
    }

    try {
      const loginRequest = await axios.post(`${config.API_URL}/login`, {
        player: {
          email: email,
          password: password,
        },
      });

      if (loginRequest.status === 200) {
        const { email, created_at, updated_at, id, username } = loginRequest.data.player;
        const token = loginRequest.data.token;
        const user = { email, created_at, updated_at, id, username, token };
        setCurrentUser(user);

        if (rememberMe) {
          setCookie("ninetynine_staples", user, {
            path: "/",
            secure: true,
            // i think a 4hr cookie is ok, probably not going to need more than that w/tokens exp
            expires: new Date(Date.now() + 3600 * 1000 * 4),
            sameSite: true,
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      handleAxiosError(error, false);
      return false;
    }
  };

  const createAccount = async (email: string, password: string, username: string) => {
    setEmailError(!email);
    setPasswordError(!password);
    setUsernameError(!username);

    if (!email || email === "" || password === "" || !password || !username || username === "") {
      return false;
    }

    try {
      const createUser = await axios.post(`${config.API_URL}/players`, {
        player: {
          username: username,
          password: password,
          email: email,
        },
      });

      if (createUser.status === 200) {
        const { email, created_at, updated_at, id, username } = createUser.data.player;
        const token = createUser.data.token;
        const user = { email, created_at, updated_at, id, username, token };
        setCurrentUser(user);
        return true;
      }
      return false;
    } catch (error) {
      handleAxiosError(error, true);
      return false;
    }
  };

  useEffect(() => {
    if (cookies?.ninetynine_staples) {
      const { email, created_at, updated_at, id, username, token } = cookies.ninetynine_staples;
      const user = { email, created_at, updated_at, id, username, token };
      setCurrentUser(user);
    }
  }, [cookies]);

  return (
    <UserContext.Provider value={{ currentUser, login, emailError, passwordError, usernameError, createAccount }}>
      {children}
    </UserContext.Provider>
  );
};
