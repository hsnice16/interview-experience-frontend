import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { App } from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://ec2-34-218-222-162.us-west-2.compute.amazonaws.com:4000/",
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
