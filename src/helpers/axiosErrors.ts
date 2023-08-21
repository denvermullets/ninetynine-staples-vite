import axios, { AxiosError } from "axios";

export const handleAxiosError = (error: unknown | AxiosError): "auth" => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      console.error("Authentication Error");
      return "auth";
    } else {
      console.error("Something went wrong with the request", error.message);
      throw error;
    }
  } else {
    console.error("A non-Axios error occurred:", error);
    throw error;
  }
};
