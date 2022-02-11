import ItemCat from "./itemCat";
import ShoppingList from "./ShoppingList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Items = ({ canShoppingList, setCanShoppingList, itemsContainerClass,canSeeCancelBloc,setCanSeeCancelBloc,setAllElementsThatWeNeedForACancelFunction,TypeOfShoppingList,setTypeOfShoppingList,elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList,setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList }) => {

    const generateHexString = (length) => {
        let ret = "";
        while (ret.length < length) {
          ret += Math.random().toString(16).substring(2);
        }
        return ret.substring(0,length);
    }

    const specialItemIdYN = generateHexString(16)

    const allNutrients = useSelector(state=>state.ItemsReducer)
    const allCategories = []
    
    let newAllCategories
    useEffect(()=>{
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
    },[allNutrients])
  
    const [realNewAllCategories,setRealNewAllCategories] = useState([])

    const onInputChange = (e) => {
        if(allNutrients){
            newAllCategories = realNewAllCategories

            const newQuetrur = []
            allNutrients.filter(elem=>{
              
                if(elem.name.startsWith(e.target.value.toUpperCase())){
                    if(newQuetrur.length===0){
                        newQuetrur.push({categories:elem.categories,content:[elem]})
                    }else{
                        let weFound = false;
                        newQuetrur.forEach(qtr=>{
                            if(qtr.categories+""===elem.categories+""){
                                qtr.content.push(elem)
                                weFound = true
                            }
                        })
                        if(!weFound){
                            newQuetrur.push({categories:elem.categories,content:[elem]})
                        }
                    }
                    return elem;
                }else{
                    return null;
                }
            })
            setRealNewAllCategories(newQuetrur)
            /*
             console.log(allCategories)
            let res = newAllCategories.filter(element=>{
                //console("la on filtre normalement")
                const result = element.content.filter(elem=>elem.name.startsWith(e.target.value.toUpperCase()))
                //element.content = result
                if(element.content.length>0){
                    return result;
                }
                return null;
            })
            setRealNewAllCategories(res)
            */
        }
    }


    const [pounce,setPounce] = useState(true)
    useEffect(()=>{
        if(newAllCategories){
            setRealNewAllCategories(newAllCategories)
            newAllCategories = realNewAllCategories
            setPounce(false)
        }
    })
    return (
        <div style = {{width:"100%"}} id="itemCOntainer2516" className={itemsContainerClass}>
            <div className={`items ${canShoppingList? "itemsWithShopppingList" : ""}`}>
                <div className="frstpz_2">
                    <div className="headPart">
                        <div className="titlePage">
                            <h2><span className="shoppingifyYellow">Shoppingify</span> allows you take your shopping list wherever you go</h2>
                        </div>
                        <div className="searchFunc">
                            <div className="searchItemsInput">
                                <svg width="18.47" height="18.48" fill="#34333A" className="loupeIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                                <input onChange={e=>onInputChange(e)} placeholder="search item" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="nutrientToAdd">
                        {realNewAllCategories.map(element=>{
                            return <ItemCat setCanShoppingList = {setCanShoppingList} specialItemIdYN = {specialItemIdYN} setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList={setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} setTypeOfShoppingList={setTypeOfShoppingList} categories={element.categories} nutrients={element.content} />
                        })}
                    </div>
                </div>
                {canShoppingList && <ShoppingList setCanShoppingList = {setCanShoppingList} elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} TypeOfShoppingList={TypeOfShoppingList} setTypeOfShoppingList={setTypeOfShoppingList} setAllElementsThatWeNeedForACancelFunction = {setAllElementsThatWeNeedForACancelFunction} canSeeCancelBloc ={canSeeCancelBloc} setCanSeeCancelBloc = {setCanSeeCancelBloc} />}
            </div>
        </div>
    )
}

export default Items;