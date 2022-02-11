import React from "react";
import moreIcon from '../import/more.svg';
import { useDispatch } from "react-redux";
import { addItemInTempList } from "../actions/tempListAction";

const ItemCat = ({ categories, setCanShoppingList, nutrients,setTypeOfShoppingList,setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList,specialItemIdYN }) => {
    
    const dispatch = useDispatch();


    const onClickInMoreIcon = (nutrient) => {
        //console(nutrient)
        dispatch(addItemInTempList({item:{...nutrient,numberOfElements:1,isChecked:false,date:Date.now()}}))
    }
    return (
        <>
            <div className="itemCat">
                <p>{categories}</p>
                <div className="allNutrients">
                    {nutrients.map((nut, key) => {
                        return <div key={key} className="oneNutrient">
                            <p onClick={()=>{setCanShoppingList(true);setTypeOfShoppingList("TypeFourOfShoppingList");setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList({...nut,specialItemIdYN:specialItemIdYN})}} className="btnOchten">{nut.name}</p>
                            <img onClick={()=>onClickInMoreIcon(nut)} className="btn" alt="more" src={moreIcon} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default ItemCat