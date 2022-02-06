import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ItemsPage from "./ItemsPage";
import HistoryPage from "./HistoryPage";
import StatsPage from "./StatsPage";
import ErrorPage from "./ErrorPage";
import Header from "../component/Header";
import { useDispatch } from "react-redux";
import { clear, modifyStatusOfListAction } from "../actions/ListsAction";

const PrincipalePage = () => {
    let cooks = document.cookie.split(";")

    let id = null;
    for (let index = 0; index < cooks.length; index++) {
        try {
            let a = jwt(cooks[index])
            if (a) {
                id = a.id
            }
        } catch (err) {
            //console.error("this cookie are not valide")
        }
    }
    if (id === null) {
        document.location.href = "/signin"
    }

    const dispatch = useDispatch();

    const [canShoppingList,setCanShoppingList] = useState(true);
    const [itemsContainerClass,setItemsContainerClass] = useState("itemsContainer")
    const [canSeeCancelBloc,setCanSeeCancelBloc] = useState(false)

    const [allElementsThatWeNeedForACancelFunction,setAllElementsThatWeNeedForACancelFunction] = useState({})

    const onClickInYesButton = (status,e) => {
        let {userId,dateList,listToModifySpecialId,setTypeOfShoppingList} = allElementsThatWeNeedForACancelFunction
      
        //console("on ca regler lihala, voici tout les elements recuperé:")
        //console(allElementsThatWeNeedForACancelFunction)

        const data = {
            userId: userId,
            newStatusOfList: status,
            listToModifyDate: dateList,
            listToModifySpecialId: listToModifySpecialId
        }
        dispatch(modifyStatusOfListAction(data,setTypeOfShoppingList))
        setCanSeeCancelBloc(false)
        dispatch(clear())
    }

    const [TypeOfShoppingList, setTypeOfShoppingList] = useState("TypeOneOfShoppingList")
    const [elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList,setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList] = useState({})


    
    return (
        <BrowserRouter>
            <Switch>
                <div style = {{display: "flex"}} className="globalContainer">
                {canSeeCancelBloc===true&&
                        <div className="cancelBlocPR">
                            <div className="contentOfCancelBlocPR">
                                <div className="cancelBloc">
                                    <div className="contentOfCancelBloc">
                                        <div className="topPart">
                                            <h3>Are you sure that you want to cancel this list?</h3>
                                        </div>
                                        <div className="bottomPart">
                                            <div className="inputs">
                                                <button onClick={()=>setCanSeeCancelBloc(false)} className="btn cancelButtonYN">cancel</button>
                                                <button onClick={(e)=>onClickInYesButton("cancel",e)} className="btn confirmButtonYN">Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="blackBackground"></div>
                        </div>
                    } 
                    <Header itemsContainerClass={itemsContainerClass} setItemsContainerClass={setItemsContainerClass} canShoppingList={canShoppingList} setCanShoppingList={setCanShoppingList} />

                    <Route path="/" exact ><ItemsPage setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} setTypeOfShoppingList = {setTypeOfShoppingList} TypeOfShoppingList = {TypeOfShoppingList} itemsContainerClass = {itemsContainerClass} canShoppingList = {canShoppingList} canSeeCancelBloc ={canSeeCancelBloc} setCanSeeCancelBloc={setCanSeeCancelBloc} setAllElementsThatWeNeedForACancelFunction = {setAllElementsThatWeNeedForACancelFunction} /></Route>
                    <Route path="/history" exact><HistoryPage setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} setTypeOfShoppingList = {setTypeOfShoppingList} TypeOfShoppingList = {TypeOfShoppingList} itemsContainerClass = {itemsContainerClass} canShoppingList = {canShoppingList} /></Route>
                    <Route path="/stats" exact><StatsPage setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} setTypeOfShoppingList = {setTypeOfShoppingList} TypeOfShoppingList = {TypeOfShoppingList} canShoppingList = {canShoppingList} /></Route>
                </div>
                <Route>
                    <ErrorPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default PrincipalePage;