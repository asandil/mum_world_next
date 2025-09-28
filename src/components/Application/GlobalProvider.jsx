"use client";
import { persistor, store } from "@/store/store";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./Loading";

// Create a client
// const queryClient = new QueryClient()

const GlobalProvider = ({ children }) => {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          {children}
        </PersistGate>
      </Provider>
  );
};

export default GlobalProvider;
