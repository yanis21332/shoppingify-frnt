

const BackButton = ({setTypeOfShoppingList,setTypeOfHistoryPage,setCanShoppingList}) => {
    console.log("voici ce que nous avons:  le shoppinglist: " + setTypeOfShoppingList + "    , et le history page:  " + setTypeOfHistoryPage)
    if(setTypeOfHistoryPage!==""&&setTypeOfHistoryPage!==null&&setTypeOfHistoryPage!==undefined){
        return(
            <button onClick={()=>setTypeOfHistoryPage("TypeOne")} className="theBackButton btn">
                <svg class="MuiSvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                <p>Back</p>
            </button>
        )
    }else if(setTypeOfShoppingList!==""&&setTypeOfShoppingList!==null&&setTypeOfShoppingList!==undefined){
        return(
            <button onClick={()=>{setTypeOfShoppingList("TypeOneOfShoppingList");setCanShoppingList(false)}} className="theBackButton btn">
                <svg class="MuiSvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                <p>Back</p>
            </button>
        )
    }
}

export default BackButton;