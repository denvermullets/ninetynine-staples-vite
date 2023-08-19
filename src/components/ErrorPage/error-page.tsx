import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // error is uknown which normally means you can't access properties on it
  // instead typing as any so i don't get grief
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
