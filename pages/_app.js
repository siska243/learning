
import "../styles/globals.css";
import { Provider, useSelector } from "react-redux";
import SocketProvider from "../context/SocketProvider";
import { store } from "../store/redux";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SocketProvider />
      <Component {...pageProps} />
    </Provider>
  );
}
