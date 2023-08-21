import { createBrowserRouter } from "react-router-dom";
import NavHeader from "../components/NavHeader";
import ErrorPage from "../components/ErrorPage/error-page";
import LoginForm from "../components/Authentication/LoginForm";
import SignUp from "../components/Authentication/SignUp";
import Boxsets from "../views/Boxsets";
import Boxset from "../models/Boxset.model";
import { LoaderParam } from "../models/LoaderData.model";

const boxsetLoader = async ({ params }: { params: LoaderParam }) => {
  console.log("params: ", params);
  const boxsets = await Boxset.getBoxsets();
  const selectedBoxset = params?.boxsetId
    ? await Boxset.getBoxsetById(Number(params.boxsetId))
    : await Boxset.getBoxsetById(Number(boxsets[0].value));

  return { boxsets, selectedBoxset };
};

export const router = createBrowserRouter([
  {
    element: <NavHeader />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <div> hi buddy </div>,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sets",
        element: <Boxsets />,
        loader: boxsetLoader,
      },
      {
        path: "/sets/:boxsetId",
        element: <Boxsets />,
        loader: boxsetLoader,
      },
    ],
  },
]);
