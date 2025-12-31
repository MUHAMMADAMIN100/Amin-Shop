import { Provider } from "react-redux"
import { store } from "../store/store"

type Props = {
  children: React.ReactNode
}

export const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;