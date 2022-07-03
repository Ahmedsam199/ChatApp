import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { createTransform } from "redux-persist";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
const reducerFN = (state = { token: "",name:"",room:"" }, action) => {
  if (action.type === "add") {
    return { ...state,token: (state.action = action.token) };
  } else if(action.type==="addN") {
    return { ...state,name: (state.action = action.name) };
  }else if(action.type==="addR"){
    return { ...state, room: (state.action = action.room) };
  }else{
    return state
  }
};

const persistConfig = {
  // Local Storage Name
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "4AM",
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
};
// ///// /////////////////////
const persistedReducer = persistReducer(persistConfig, reducerFN, );
// Export Them To The Index.js File
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);