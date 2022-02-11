import React from "react";
import Items from "../component/Items";

const ItemsPage = ({itemsContainerClass,canShoppingList,setCanShoppingList,canSeeCancelBloc,setCanSeeCancelBloc,setAllElementsThatWeNeedForACancelFunction,TypeOfShoppingList,setTypeOfShoppingList,elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList,setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList}) => {

    return (
        <>
            <div style = {{width:"100%",display:"flex"}} className="itemsContainer">
                <Items setCanShoppingList = {setCanShoppingList} setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} TypeOfShoppingList = {TypeOfShoppingList} setTypeOfShoppingList = {setTypeOfShoppingList} setAllElementsThatWeNeedForACancelFunction = {setAllElementsThatWeNeedForACancelFunction} itemsContainerClass = {itemsContainerClass} canShoppingList = {canShoppingList} canSeeCancelBloc = {canSeeCancelBloc} setCanSeeCancelBloc = {setCanSeeCancelBloc} />
            </div>
        </>
    )
}

export default ItemsPage