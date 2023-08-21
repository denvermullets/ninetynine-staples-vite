import { AxiosError } from "axios";
import { useState, createContext, ReactNode, useEffect } from "react";
import User, { UserRecord } from "../models/User.model";
import { useCookies } from "react-cookie";
import { handleAxiosError } from "../helpers/axiosErrors";

type ProviderProps = {
  children: ReactNode;
};

export type CurrentUserContext = {
  currentUser: UserRecord | null;
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
  const [currentUser, setCurrentUser] = useState<UserRecord | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["ninetynine_staples"]);

  const handlError = (error: unknown | AxiosError, username: boolean) => {
    // this is just a catch for us to nicely handle auth errors for the user, probably is overkill for this app
    const hasAuthError = handleAxiosError(error);
    if (hasAuthError === "auth") {
      setEmailError(true);
      setPasswordError(true);
      username && setUsernameError(true);
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || email === "" || password === "" || !password) {
      return false;
    }

    try {
      const user = await User.login(email, password);

      if (user) {
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
      handlError(error, false);
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
      const createUser = await User.createUser(username, password, email);

      if (createUser) {
        setCurrentUser(createUser);
        return true;
      }
      return false;
    } catch (error) {
      handlError(error, true);
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
