import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";


const middleWares = [logger]
const composedEnhancers = compose(applyMiddleware(...middleWares))

// create store
export const store = createStore(rootReducer, undefined, composedEnhancers)