import localforage from "localforage";
import { PersistConfig } from "redux-persist";

const persistConfig: PersistConfig<any> = {
  key: "root",
  version: 1,
  storage: localforage,
  whitelist: ["auth"], // hanya auth yang dipersist karna ketika refresh page data token dll tidak hilang, jika ada data yg di refresh tidak hit api lagi tambahkan saja whitlist disini
};

export default persistConfig;
