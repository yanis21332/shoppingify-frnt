import React, { useEffect, useState } from "react";
import wineIcon from '../import/wine.svg';
import ItemCatTwo from "./itemCatTwo";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../actions/ItemsAction";
import { addListAction, modifyStatusOfListAction } from "../actions/ListsAction";
import jwtDecode from "jwt-decode";
import { addItemInTempList, clear, delItemFromTempList } from "../actions/tempListAction";
import BackButton from "./BackButton";
import WomenSvg from '../import/WomenItem.svg';

const ShoppingList = ({setCanSeeCancelBloc,setAllElementsThatWeNeedForACancelFunction,TypeOfShoppingList,setTypeOfShoppingList,elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList}) => {
    //user id getage

    let cooks = document.cookie.split(";")

    let authUserId = null;
    for (let index = 0; index < cooks.length; index++) {
        try {
            let a = jwtDecode(cooks[index])
            if (a) {
                authUserId = a.id
            }
        } catch (err) {
            console.error(err)
        }
    }

    const generateHexString = (length) => {
        let ret = "";
        while (ret.length < length) {
          ret += Math.random().toString(16).substring(2);
        }
        return ret.substring(0,length);
    }
    const [specialId,setSpecialId] = useState("")

    const [dateList,setDateList] = useState("")
    const dispatch = useDispatch();
    const [subError,setSubError] = useState("")

    const [pounce,setPounce] = useState(true)
    useEffect(()=>{
        if(pounce){
            console.log("la il ne faut vraiment pas que ca se repete")
            setSpecialIdSecret(generateHexString(26))
            setPounce(false)
        }
    },[pounce])

    const onSubmitInAddItem = async e => {
        setPounce(true)
        e.preventDefault()
        console.log(elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList)
        const data = {
            name: e.target[0].value.toUpperCase(),
            note: e.target[1].value.toUpperCase(),
            image: e.target[2].value,
            categories: e.target[3].value.toUpperCase(),
            specialId: specialIdSecret
        }

        dispatch(addItem(data,setSubError))
        setTypeOfShoppingList("TypeOneOfShoppingList")
        
    }
    const [specialIdSecret,setSpecialIdSecret] = useState("")


    const AllLists = useSelector(state=>state.ListsReducer)
    const [itemsSpecialForTypeThreeOfShoppingList,setItemsSpecialForTypeThreeOfShoppingList] = useState([])
    const [specialPounce,setSpecialPounce] = useState(true)
    
    const [allFalse,setAllFalse] = useState("nopelo")

    const firstTempLists = useSelector(state=>state.tempListReducer)
    const allCategories = []
    firstTempLists.forEach(nut=>{
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
            //console("nous ajoutons une nouvelle categories")
        }
    })
    //avec cett ligne on elimine tout les doublons qui se trouve dans cette array
    const tempLists = [...new Set(allCategories)]

    useEffect(()=>{
        if(specialPounce&&AllLists.length>0){
           
            AllLists.forEach(oneList=>{
                if(oneList.statusOfList==="current"){
                    setTypeOfShoppingList("TypeThreeOfShoppingList")
                    setDateList(oneList.date)
                    setSpecialId(oneList.specialId)
                    let newListItems = oneList.items
                    const all = []
                    newListItems.forEach(nut=>{
                        let weCan = true
                        all.forEach(cat=>{
                            if(cat.categories===nut.categories){
                                cat.content.push(nut)
                                weCan = false
                                return;
                            }
                        })    
                        if(weCan){
                            all.push({categories:nut.categories,content:[nut]})
                        }
                    })
                    let ne = [...new Set(all)]
                    setItemsSpecialForTypeThreeOfShoppingList(ne)
                    //console(oneList.items)
                    setSpecialPounce(false)
                }
            })
           
        }
    })

    
   

    const onSubmitInForm = e => {
        e.preventDefault();
        setSpecialPounce(true)
        if(firstTempLists.length>0){
            let code = generateHexString(30)
            if(code!==""&&code!==undefined&&code!==null){
                setSpecialId(code)
                const data = {
                    listToModifyId: e.target[0].value,
                    newStatusOfList: "current",
                    items: firstTempLists,
                    date:Date.now(),
                    specialId: specialId
                }
                dispatch(addListAction({date:data.date,name:e.target[0].value,statusOfList:"current",items:firstTempLists,specialId:code}))
                setAllFalse("allfalse")
                setTypeOfShoppingList("TypeThreeOfShoppingList")
                setDateList(data.date)
            }
          
        }else{
            console.error("aucun element est present")
        }
    }


    const onClickInCompleteButton = (status,e) => {
        setSpecialPounce(true)
        e.target.outerHTML = "<button class=\"completeButton213546 btn\" disabled=\"true\">Complete</button>"

        const data = {
            userId: authUserId,
            newStatusOfList: status,
            listToModifyDate: dateList,
            listToModifySpecialId: specialId
        }
        //console(data)
        dispatch(modifyStatusOfListAction(data,setTypeOfShoppingList))
        dispatch(clear({}))
    }

    const onClickInCancelButton = () => {
        setSpecialPounce(true)
        setCanSeeCancelBloc(true)
        setAllElementsThatWeNeedForACancelFunction({setTypeOfShoppingList:setTypeOfShoppingList,dateList:dateList,listToModifySpecialId:specialId,userId:authUserId,AllLists:AllLists})
    }

    
    const [thatElementWasInTempList,setThatElementWasInTempList] = useState(false)

    useEffect(()=>{
        if(elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList){
            //console("we use it hahahahahah")
            let sure = false;
            firstTempLists.forEach(nut=>{
                //console("nous verifions si elle est dans le que tru")
                //console(nut)
                //console(elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList)
                if(nut._id===elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList._id){
                    setThatElementWasInTempList(true)
                    sure = true
                    //console("elle est dans le ceu tru")
                }
            })
            if(!sure){
                setThatElementWasInTempList(false)
            }
        }
    })

    const onClickInAddToList = (nutrient) => {
        dispatch(addItemInTempList({item:{...nutrient,numberOfElements:1,isChecked:false,date:Date.now()}}))
    }
    const onClickInDelete = () => {
        console.log(elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList)
        dispatch(delItemFromTempList(elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList))
        dispatch(deleteItem({userId:authUserId,itemId:elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList.specialId,...elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList}))
        setTypeOfShoppingList("TypeOneOfShoppingList")
    }
    return (
        <>
            <section style={TypeOfShoppingList === "TypeFourOfShoppingList"?{backgroundColor:"white"}:{}} className="ShoppingListContainer">
                <div className={TypeOfShoppingList === "TypeTwoOfShoppingList" ? "ShoppingListTypeTwo" : "ShoppingList"}>
                    {TypeOfShoppingList === "TypeOneOfShoppingList" && <>
                        <div className="TypeOneOfShoppingList">
                            <div className="firstPart">
                                <div className="AddItemFunc">
                                    <div className="winePart">
                                        <img alt="wine" src={wineIcon} />
                                    </div>
                                    <div className="funcPart">
                                        <p>Didn't find what you need ?</p>
                                        <button onClick = {()=>setTypeOfShoppingList("TypeTwoOfShoppingList")} className="btn addItemButton">Add item</button>
                                    </div>
                                </div>
                                <div className="itemsAded">
                                    <div className="titleOfZone">
                                        <h3>Shopping list</h3>
                                    </div>
                                    <div style={tempLists.length===0?{overflow:"hidden",maxHeight:"535px"}:{}} className="theItems">
                                        {tempLists.map(tempList=>{
                                            return <ItemCatTwo allFalse = {allFalse} categories={tempList.categories} items={tempList.content} />
                                        })}
                                        {tempLists.length===0&&
                                        <div className="noItemsZoneParent">
                                            <div className="containerOfNIZP">
                                                <p>No items</p>
                                                <div className="womenImage">
                                                    <img alt = "women with courses" src={WomenSvg} />
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="footerPart">
                            <form onSubmit={onSubmitInForm} className="listCreationForm">
                                <div className="inputs">
                                    <input maxLength={26} minLength={3} required className="textInput" type="text" placeholder="Enter a name" />
                                    <input disabled = {tempLists.length===0?true:false} className={`submitInput btn ${tempLists.length===0?"disabled":""}`} type="submit" value="Save" />
                                </div>
                            </form>
                        </div>
                    </>}
                    {TypeOfShoppingList === "TypeTwoOfShoppingList" && <>
                        <div className="TypeTwoOfShoppingList">
                            <div className="intro">
                                <h2>Add a new item</h2>
                            </div>
                            <form onSubmit={onSubmitInAddItem} className="inputsOfAddItemForm">
                                <div className="inputsOfAddItem">
                                    <div className="nameInput">
                                        <label for="inputName">Name</label>
                                        <input onFocus={e => {
                                            e.target.parentElement.children[0].style.color = "#F9A109"
                                            //console("c'('sez fairte")
                                            //console(e.target.parentElement.children[0].style)
                                        }} onBlur={e => { e.target.parentElement.children[0].style.color = "#34333a" }} required type="text" maxLength={21} placeholder="Enter a name" name="inputName" />
                                    </div>
                                    <div className="noteTextarea">
                                        <label style={{ color: "#34333A" }} htmlFor="noteTextarea">Note(Optionel)</label>
                                        <textarea onFocus={e => {
                                            e.target.parentElement.children[0].style.color = "#F9A109"
                                            //console("c'('sez fairte")
                                            //console(e.target.parentElement.children[0].style)
                                        }} onBlur={e => { e.target.parentElement.children[0].style.color = "#34333a" }} placeholder="Enter a note" name="noteTextarea" />
                                    </div>
                                    <div className="imageInput">
                                        <label style={{ color: "#34333A" }} htmlFor="imageInput">Image(Optionel)</label>
                                        <input onFocus={e => {
                                            e.target.parentElement.children[0].style.color = "#F9A109"
                                            //console("c'('sez fairte")
                                            //console(e.target.parentElement.children[0].style)
                                        }} onBlur={e => { e.target.parentElement.children[0].style.color = "#34333a" }} type="text" placeholder="Enter a url" name="imageInput" />
                                    </div>
                                    <div className="categoryInput">
                                        <label style={{ color: "#34333A" }} htmlFor="categoryInput">Enter a category</label>
                                        <input onFocus={e => {
                                            e.target.parentElement.children[0].style.color = "#F9A109"
                                            //console("c'('sez fairte")
                                            //console(e.target.parentElement.children[0].style)
                                        }} onBlur={e => { e.target.parentElement.children[0].style.color = "#34333a" }} required name="categoryInput" type="text" placeholder="Enter a category" />
                                    </div>
                                    {subError!==""&&subError!==null&&subError!==undefined&&<p className="ErrorQlq">{subError}</p>}
                                </div>
                                <div className="footerOfAddItem">
                                    <button onClick = {()=>{setTypeOfShoppingList("TypeOneOfShoppingList")}} className="cancelButton btn">cancel</button>
                                    <input className="submitInputOfForm btn" type="submit" value="Save" />
                                </div>
                            </form>
                        </div>
                    </>}
                    {TypeOfShoppingList === "TypeThreeOfShoppingList" && <>
                    <div className="TypeOneOfShoppingList">
                            <div className="firstPart">
                                <div className="AddItemFunc">
                                    <div className="winePart">
                                        <img alt="wine" src={wineIcon} />
                                    </div>
                                    <div className="funcPart">
                                        <p>Didn't find what you need ?</p>
                                        <button onClick = {()=>setTypeOfShoppingList("TypeTwoOfShoppingList")} className="btn addItemButton">Add item</button>
                                    </div>
                                </div>
                                <div className="itemsAded">
                                    <div className="titleOfZone">
                                        <h3>Shopping list</h3>
                                    </div>
                                    <div className="theItems">
                                        {itemsSpecialForTypeThreeOfShoppingList.map((tempList,key)=>{
                                            let theCat = tempList.categories
                                            let theList = []
                                            itemsSpecialForTypeThreeOfShoppingList.forEach(tt=>{
                                                if(tt.categories===theCat){
                                                    theList.push(tt)
                                                }
                                            })
                                            
                                            return <ItemCatTwo allFalse = {allFalse} specialId = {specialId} typeOfShop = "wrongYouNow" key={key} checkbox={true} categories={tempList.categories} items={tempList.content} dateList = {dateList} />
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footerPart">
                            <form onSubmit={e=>e.preventDefault()} className="listConfirmationForm">
                                <div className="inputs">
                                    <button onClick={e=>onClickInCancelButton()} className="cancelButton2515 btn">Cancel</button>
                                    <button onClick={e=>onClickInCompleteButton("complete",e)} className="completeButton213546 btn">Complete</button>
                                </div>
                            </form>
                        </div>
                        
                    </>}
                    {TypeOfShoppingList === "TypeFourOfShoppingList" && <>
                        <div className="TypeFourOfShoppingList">
                            <div className="containerOfTypeFour">
                                <div className="topPartYN">
                                    <div className="backButtonParent">
                                        <div className="backButton">
                                            <BackButton setTypeOfHistoryPage = {undefined} setTypeOfShoppingList = {setTypeOfShoppingList} />
                                        </div>
                                    </div>
                                    {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList.image!==""&&elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList.image!==null?
                                    <div className="itemImageZone">
                                        <div className="theImage">
                                            <img src={elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList.image} alt="presentation of one item" />
                                        </div>
                                    </div>:null}
                                    <div className="nameOfElement defElem">
                                        <div className="containerOfName defElemContPrinc">
                                            <p className="shortLabel">name</p>
                                            <p>{elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList.name}</p>
                                        </div>
                                    </div>
                                    <div className="categorieOfElement defElem">
                                        <div className="containerOfCat defElemCont">
                                            <p className="shortLabel">categories</p>
                                            <p>{elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList.categories}</p>
                                        </div>
                                    </div>
                                    <div className="noteOfElement defElem">
                                        <div className="containerOfNote defElemCont">
                                            <p className="shortLabel">note</p>
                                            <p>{elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList.note}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottomPart">
                                    <div className="inputsZoneYN">
                                        <button onClick={onClickInDelete} className="deleteItemButton btn">delete</button>
                                        <button onClick={()=>onClickInAddToList(elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList)} disabled = {thatElementWasInTempList} className={`addToListButton btn yellowBeatifulButton ${thatElementWasInTempList===true?"disabledButton":""}`}>Add to list</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </section>
        </>
    )
}

export default ShoppingList