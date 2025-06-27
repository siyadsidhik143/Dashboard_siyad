import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./ReduxStore";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
