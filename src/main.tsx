import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import customTheme from "./theme/index.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/error-page.tsx";
import { CurrentUserProvider } from "./providers/CurrentUserProvider.tsx";
import NavHeader from "./components/NavHeader/index.tsx";
import LoginForm from "./components/Authentication/LoginForm.tsx";
import SignUp from "./components/Authentication/SignUp.tsx";

const router = createBrowserRouter([
  {
    element: <NavHeader />,
    children: [
      {
        path: "/",
        element: <div> hi buddy </div>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <CurrentUserProvider>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
