import { DELETE_ITEM_ACTION } from "../actions/ItemsAction";
import { ADD_LIST_ACTION, CLEAR_ALL, GET_ALL_LISTS, MODIFY_LIST_ACTION, MODIFY_STATUS_OF_LIST_ACTION } from "../actions/ListsAction";

export const ListsReducer = (state=[],action) => {
    switch (action.type) {
        case ADD_LIST_ACTION:
            return [...state,action.payload]
        case MODIFY_LIST_ACTION:
            return state.map(list=>{
                //console(list)
                //console(list.date + "      " +action.payload.date)
                if(list.date===action.payload.date){
                    let newItems = [];
                    list.items.forEach(itm=>{
                        if(itm._id===action.payload.theId){
                            //console("le vrai est lu donc le prblm est ici")
                            newItems.push({...itm,isChecked:itm.isChecked?false:true})
                        }else{
                            //console("pas le meme id")
                            newItems.push(itm);
                        }
                    })
                    return {...list,items:newItems}
                }else{
                    //console("pas la meme date")
                    return list;
                }
            })
        case MODIFY_STATUS_OF_LIST_ACTION:
            return state.map(list=>{
                if(list.statusOfList==="current"){
                    return {...list,statusOfList:action.payload.newStatusOfList}
                }else{
                    return list;
                }
            })
        case GET_ALL_LISTS:
            return [...action.payload,...state]

        default:
            return state;
    }
}