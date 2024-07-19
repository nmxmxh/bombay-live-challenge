"use client";

import StyledComponentsRegistry from "./registry";

import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = (props: React.PropsWithChildren) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={storeRef.current.__persistor}>
        <StyledComponentsRegistry>{props.children}</StyledComponentsRegistry>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
