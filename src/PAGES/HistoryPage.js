import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BackButton from "../component/BackButton";
import ItemCat from "../component/itemCat";
import List from "../component/List";
import ShoppingList from "../component/ShoppingList";

const HistoryPage = ({canShoppingList, itemsContainerClass,canSeeCancelBloc,setCanSeeCancelBloc,setAllElementsThatWeNeedForACancelFunction,TypeOfShoppingList,setTypeOfShoppingList,elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList,setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList}) => {

    const allListsBrut = useSelector(state=>state.ListsReducer)

    const [TypeOfHistoryPage,setTypeOfHistoryPage] = useState("TypeOne")
    const [allElementsThatWeNeedForAListContainer,setAllElementsThatWeNeedForAListContainer] = useState({})

    const allMonths = []
    allListsBrut.forEach(list=>{
        let today = new Date(list.date) + "";
        let dd = today.split(" ")[0]
        let month = today.split(" ")[1] === "Jan"?1:today.split(" ")[1]==="Feb"?2:today.split(" ")[1]==="Mar"?3:today.split(" ")[1]==="Apr"?4:today.split(" ")[1]==="May"?5:today.split(" ")[1]==="June"?6:today.split(" ")[1]==="July"?7:today.split(" ")[1]==="Aug"?8:today.split(" ")[1]==="Sept"?9:today.split(" ")[1]==="Oct"?10:today.split(" ")[1]==="Nov"?11:today.split(" ")[1]==="Dec"?12:"Fuck"
        let day = today.split(" ")[2]
        let year = today.split(" ")[3]
        let textMonth = today.split(" ")[1] === "Jan"?"January":today.split(" ")[1]==="Feb"?"February":today.split(" ")[1]==="Mar"?"March":today.split(" ")[1]==="Apr"?"April":today.split(" ")[1]==="May"?"May":today.split(" ")[1]==="June"?"June":today.split(" ")[1]==="July"?"July":today.split(" ")[1]==="Aug"?"August":today.split(" ")[1]==="Sept"?"September":today.split(" ")[1]==="Oct"?"October":today.split(" ")[1]==="Nov"?"November":today.split(" ")[1]==="Dec"?"December":"Fuck"

        const realDate = dd + " " + day + "." + month + "." + year;

        let verificator = true;
        allMonths.forEach(mn=>{
            if(mn.mon===month){
                mn.content.push(list)
                verificator = false;
            }
        })
        if(verificator){
            allMonths.push({realDate:realDate,yearName:year,monthName:textMonth,mon:month,content:[{...list}]})
        }
    })

    const [randomId,setRandomId] = useState([])
    const [allCat,setAllCat] = useState([])
    let newAllCat;
    
    const allCategories = []
    
    let newAllCategories
    const [realCategories,setRealCategories] = useState([])
    
    const allNutrients = allElementsThatWeNeedForAListContainer.items
    useEffect(()=>{
        if(allNutrients){
            allNutrients.forEach(nut=>{
                let weCan = true
                allCategories.forEach(cat=>{
                    if(cat.categories===nut.categories){
                        cat.content.push(nut)
                        weCan = false
                        return;
                    }
                })    
                if(weCan){
                    allCategories.push({categories:nut.categories,content:[nut]})
                }
            })
            //avec cett ligne on elimine tout les doublons qui se trouve dans cette array
            newAllCategories = [...new Set(allCategories)];
            console.log(allCategories)
            console.log(newAllCategories)
            setRealCategories(newAllCategories)
        }
    },[allNutrients])

    return (
        
        <div style = {{width:"100%"}} className = "HistoryContainer">
            {TypeOfHistoryPage==="TypeOne"&&
            <div className = {`all2251 ${canShoppingList ? "allWithShoppingList": "allIndepandante"}`}>
                <div className = "ShoppingHistory">
                    <div className = "principaleTitle">
                        <h2>Shopping history</h2>
                    </div>
                    <div className = "listsHistory">
                        <div className = "onSetsOfLists">
                         
                            <div className = "allLists">
                            
                                {allMonths.sort((a,b)=>b.mon-a.mon).map((mont,keyOne)=>{
                                    return (
                                        <Fragment key={keyOne}>
                                            <p className = "dateOfSetsLists">{mont.monthName} {mont.yearName}</p>
                                            {
                                                mont.content.sort((a,b)=>b.date-a.date).map((list,keyTwo)=>{
                                                    return(
                                                        <List items = {list.items} setAllElementsThatWeNeedForAListContainer = {setAllElementsThatWeNeedForAListContainer} setTypeOfHistoryPage = {setTypeOfHistoryPage} key={keyTwo} listName = {list.name} creationDate = {mont.realDate} stateOfList = {list.statusOfList==="cancel"?"canceled":list.statusOfList==="complete"?"completed":list.statusOfList==="current"?"current":"Fuck"} />
                                                    )
                                                })
                                            }
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {canShoppingList && <ShoppingList setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} TypeOfShoppingList = {TypeOfShoppingList} setTypeOfShoppingList = {setTypeOfShoppingList} elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList}  setAllElementsThatWeNeedForACancelFunction = {setAllElementsThatWeNeedForACancelFunction} canSeeCancelBloc ={canSeeCancelBloc} setCanSeeCancelBloc = {setCanSeeCancelBloc} />}
            </div>}
            {TypeOfHistoryPage==="TypeTwo"&&
            <div  className={`contHistoryCont ${canShoppingList ? "contHistWithShoppingList":"contHistIndepandante"}`}>
                <div className="parentOfAll">
                    <div className="returnBackButton">
                        <BackButton setTypeOfHistoryPage = {setTypeOfHistoryPage} setTypeOfShoppingList = {undefined} />
                    </div>
                    <div className="pseudoInformationOfList">
                        <div className="containerOfPIOL">
                            <div className="titleOfList">
                                <h3>{allElementsThatWeNeedForAListContainer.title}</h3>
                            </div>
                            <div className="dateOfList">
                            <div id="DateElement">
                                <svg width="20" height="20" fill="#9ca3af" className="calendarSVGimage" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z"></path></svg>
                                <p className="creationDate">{allElementsThatWeNeedForAListContainer.date}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="itemsInList">
                        <div className="containerOfItemsInList">
                            {realCategories.map((one,keyOne)=>{
                                return( 
                                    <Fragment key={keyOne}>
                                        <div className="oneCat">
                                            <h3 className="listName">{one.categories}</h3>
                                            <div className="itemsInQuestion">
                                               {one.content.map((itm,keyTwo)=>{
                                                   return(
                                                    <div className="oneNutrient" key={keyTwo}>
                                                        <p style={{marginRight:"10px"}} className="btnOchten">{itm.name}</p>
                                                        <p className="numberOfPcs">{itm.numberOfElements}pcs</p>
                                                    </div>
                                                )
                                               })}
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {canShoppingList && <ShoppingList setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} TypeOfShoppingList = {TypeOfShoppingList} setTypeOfShoppingList = {setTypeOfShoppingList} elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList}  setAllElementsThatWeNeedForACancelFunction = {setAllElementsThatWeNeedForACancelFunction} canSeeCancelBloc ={canSeeCancelBloc} setCanSeeCancelBloc = {setCanSeeCancelBloc} />}
            </div>
            }
            
        </div>
        
    )
}

export default HistoryPage