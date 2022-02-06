

export const ADD_TEMP_ITEM = "ADD_TEMP_ITEM";
export const MODIFY_TEMP_ITEM = "MODIFY_TEMP_ITEM";
export const DELETE_TEMP_ITEM = "DELETE_TEMP_ITEM";
export const CLEAR_ALL = "CLEAR_ALL"

export const addItemInTempList = (data) => {
    return dispatch=>{
        dispatch({type:ADD_TEMP_ITEM,payload:data})
    }
}
export const modifyItemInTempList = (data) => {
    return dispatch=>{
        dispatch({type:MODIFY_TEMP_ITEM,payload:data})
    }
}
export const delItemFromTempList = (data) => {
    return dispatch => {
        dispatch({type:DELETE_TEMP_ITEM,payload:data})
    }
}
export const clear = data => {
    return dispatch => {
        dispatch({type:CLEAR_ALL,payload:data})
    }
}