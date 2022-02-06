import { ADD_ITEM_ACTION, DELETE_ITEM_ACTION, GET_ITEMS_ACTION } from "../actions/ItemsAction";


export const ItemsReducer = (state=[],action) => {
    switch (action.type) {
        case GET_ITEMS_ACTION:
            return action.payload
        case ADD_ITEM_ACTION:
            let newLists = [...new Set(state)];
            return [action.payload,...newLists]
        case DELETE_ITEM_ACTION:
            return state.filter(el=>{
                //console(el.specialItemId + "     " + action.payload.item.itemId)
                console.log("the element")
                console.log(el.specialId + "   et   "+action.payload.item.specialId)
                if(el.specialId+""!==action.payload.item.specialId+""){
                    return el;
                }else{
                    return null;
                }
            })
        default:
            return state;
    }
}