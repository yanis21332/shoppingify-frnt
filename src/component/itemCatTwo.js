import React from "react";
import ItemTypeTwoBloc from "./ItemTypeTwoBloc";

const ItemCatTwo = ({ categories, items,checkbox,dateList,typeOfShop,specialId,allFalse }) => {
    /*const onHoverInItemNumber = (type,id) => {
        let itemNumberParentDisabled = document.getElementById(id);
        if (type === "simple") {
            itemNumberParentDisabled.classList.replace(`itemNumberParentDisabled`, `itemNumberParentAble`)
            setItemNumberAbled(true)
        } else if (type === "reverse") {
            itemNumberParentDisabled.classList.replace(`itemNumberParentAble`, `itemNumberParentDisabled`)
            setItemNumberAbled(false)
        }
    }*/


    return (
        <div className="itemCatTwo">
            <p className="griser">{categories}</p>
            {
                items.map((itm,key)=>{
                    return <ItemTypeTwoBloc allFalse = {allFalse} specialId = {specialId} typeOfShop = {typeOfShop} dateList = {dateList} itm = {itm} key = {key} checkbox={checkbox?checkbox:null}/>
                })
            }
        </div>
    )
}

export default ItemCatTwo;