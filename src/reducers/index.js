import { combineReducers } from "redux";
import { ItemsReducer } from "./ItemsReducer"
import { tempListReducer } from "./tempListReducer";
import { ListsReducer } from "./ListsReducer";

export default combineReducers({
    ItemsReducer,
    tempListReducer,
    ListsReducer
})