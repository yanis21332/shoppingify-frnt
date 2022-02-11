import axios from "axios";
import jwt from 'jwt-decode';

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

export const GET_ITEMS_ACTION = "GET_ITEMS_ACTION";
export const ADD_ITEM_ACTION = "ADD_ITEM_ACTION";
export const DELETE_ITEM_ACTION = "DELETE_ITEM_ACTION"

export const getItems = () => {
    return dispatch => {
        return axios.get(`https://back-shoppingify-younow.herokuapp.com/web/getAllItems/${userId}`).then(res=>{
            dispatch({type: GET_ITEMS_ACTION, payload:res.data.data})
        }).catch(err=>{
            console.error(err)
            return err
        })
    }
}

export const addItem = (data,setSubError) => {
    return dispatch => {
        return axios.put("https://back-shoppingify-younow.herokuapp.com/web/additem",{...data,userId:userId}).then(res=>{
            if(!res.data.error){
                setSubError("")
                dispatch({type:ADD_ITEM_ACTION, payload: data})
            }else{
                setSubError(res.data.error)
                console.error(res.data.error)
                return res.data.error
            }
        }).catch(err=>{
            return err
        })
    }
}
export const deleteItem = (data) => {
    return dispatch => {
        return axios.put("https://back-shoppingify-younow.herokuapp.com/web/deleteOneItem",{...data}).then(res=>{
            if(!res.data.error){
                console.log(res.data)
                dispatch({type:DELETE_ITEM_ACTION,payload:res.data})
            }else{
                console.error(res.data.error)
                return res.data.error
            }
        }).catch(err=>{
            return err
        })
    }
}
