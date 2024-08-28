import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { App } from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://interview-experience-backend.onrender.com/",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([{ path: "*", Component: App }]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>
);
