import axios from "axios";
import jwt from "jwt-decode";

let userId = ""
let cooks = document.cookie.split(";")

for (let index = 0; index < cooks.length; index++) {
    try {
        let a = jwt(cooks[index])
        if (a) {
            userId = a.id
        }
    } catch (err) {
        //console.error("this cookie are not valide")
    }
}
  

export const ADD_LIST_ACTION = "ADD_LIST_ACTION";
export const MODIFY_LIST_ACTION = "MODIFY_LIST_ACTION";
export const MODIFY_STATUS_OF_LIST_ACTION = "MODIFY_STATUS_OF_LIST_ACTION";
export const GET_ALL_LISTS = "GET_ALL_LISTS";
export const CLEAR_ALL = "CLEAR_ALL"


export const getLists = () => {
    return dispatch => {
        axios.get(`http://localhost:4000/web/getAllLists/${userId}`).then(res=>{
            if(!res.data.error){
                dispatch({type:GET_ALL_LISTS,payload:res.data.data})
            }else{
                console.error(res.data.error)
            }
        }).catch(err=>{
            console.error(err)
        })
    }
}
export const addListAction = (data) => {
    return dispatch=>{
        //console("nous fesont nos requêtes")
        axios.post("http://localhost:4000/web/createonelist",{...data,userId:userId}).then(res=>{
            if(!res.data.error){
                //console("y'a pas d'erreur tout se passe a merveille")
                //console(res.data)
                dispatch({type:ADD_LIST_ACTION,payload:data})
            }else{
                console.error(res.data.error)
            }
        }).catch(err=>{
            console.error(err)
        })
    }
}
export const modifyListAction = data => {
    return dispatch=>{
        let additionelData = {
            userId: userId,
            specialIdOfList: data.specialId,
            itemImported: data.theItem
        }
        console.log(data.theItem)
        axios.put("http://localhost:4000/web/modifyIsCheckedOfItemsInList",{...data,...additionelData}).then(res=>{
            if(!res.data.error){
                console.log("normalement tout s'est bien passé !")
                dispatch({type:MODIFY_LIST_ACTION,payload:data})
            }else{
                console.error(res.data.error)
            }
        }).catch(err=>{
            console.error(err)
        })
       
    }
}
export const modifyStatusOfListAction = (data,setTypeOfShoppingList) => {
    return dispatch => {
        axios.post("http://localhost:4000/web/modifyOneList",data).then(res=>{
            if(!res.data.error){        
                dispatch({type:MODIFY_STATUS_OF_LIST_ACTION,payload:data})
                setTypeOfShoppingList("TypeOneOfShoppingList")
                return true
            }else{
                console.error(res.data.error)
                return false
            }
        }).catch(err=>{
            console.error(err)
            return false
        })
    }
}
export const clear = () => {
    return dispatch => {
        dispatch({type:CLEAR_ALL,payload:{}})
    }
}