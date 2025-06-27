import { configureStore } from "@reduxjs/toolkit";
import siyadsAppChatbotReducer from "./reduxSlices/chatbotSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      reduxChatbotStates: siyadsAppChatbotReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
