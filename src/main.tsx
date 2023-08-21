import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import customTheme from "./theme/index.tsx";
import { RouterProvider } from "react-router-dom";
import { CurrentUserProvider } from "./providers/CurrentUserProvider.tsx";
import { UserCollectionsProvider } from "./providers/UserCollectionsProvider.tsx";
import { router } from "./routes/router.routes.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <CurrentUserProvider>
        <UserCollectionsProvider>
          <RouterProvider router={router} />
        </UserCollectionsProvider>
      </CurrentUserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
