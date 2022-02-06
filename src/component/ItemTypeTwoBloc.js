import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { modifyListAction } from "../actions/ListsAction";
import { delItemFromTempList, modifyItemInTempList } from "../actions/tempListAction";

const ItemTypeTwoBloc = ({ itm,checkbox,dateList,typeOfShop,specialId,allFalse }) => {
    const [itemNumberAbled, setItemNumberAbled] = useState(false);

    const [tempLists] = useSelector(state=>state.tempListReducer)

    const dispatch = useDispatch();


    const onHoverInItemNumber = (type, idd) => {
        //console(typeOfShop)
        if(typeOfShop!=="wrongYouNow"){
            let itemNumberParentDisabled = document.getElementById(idd);
            if (type === "simple") {
                itemNumberParentDisabled.classList.replace(`itemNumberParentDisabled`, `itemNumberParentAble`)
                setItemNumberAbled(true)
            } else if (type === "reverse") {
                itemNumberParentDisabled.classList.replace(`itemNumberParentAble`, `itemNumberParentDisabled`)
                setItemNumberAbled(false)
            }
        }
    }
    const onClickInLessOrMoreIcon = (type) => {
        setItemNumberAbled(false);
        setItemNumberAbled(true)
        if(itemNumberAbled===true){
            if(type==="less"){
                if(itm.numberOfElements>1){
                    dispatch(modifyItemInTempList({...itm,type:"less"}))
                }
            }
            else if(type==="more"){
                dispatch(modifyItemInTempList({...itm,type:"more"}))
            }
        }
    }
    const onClickInPoubelle = () => {
        dispatch(delItemFromTempList(itm))
    }
    const [id] = uuidv4()

    const [pBarre,setPBarre] = useState(allFalse==="allfalse"?false:itm.isChecked)

    return (
        <>
            <div className="itemOneTypeTwo" id={id}>
                {checkbox!==null?
                <div className="itemNamePR">
                    <div className="checkmarkandboxPR">
                        <input checked = {pBarre?true:false} onClick={e=>{setPBarre(!pBarre);dispatch(modifyListAction({date:dateList,theId:itm._id,isChecked:itm.isChecked,specialId:specialId,theItem:{...itm,isChecked:e.target.checked}}))}} type="checkbox" className="checkBoxInput2135465" />
                        <span className="checkMark21345"></span>
                    </div>
                    <p style={pBarre?{ textDecoration: "line-through",opacity: 0.5}:null}>{itm.name}</p>
                </div>:<p>{itm.name}</p>}
         
                <div onMouseOver={() =>{
                    if(typeOfShop!=="wrongYouNow"){
                        onHoverInItemNumber("simple",id)
                    }
                }} onMouseLeave={itemNumberAbled === true ? () => onHoverInItemNumber("reverse", id) : null} className={`itemNumberParentAbled itemNumberParent ${typeOfShop!=="wrongYouNow"?"itemNumberParentReallyAbled":""}`}>
                    <div onClick={onClickInPoubelle} className="poubellePlace btn">
                        <svg width="15.5" height="18.5" fill="#fff" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                    </div>
                    <button onSubmit={()=>onClickInLessOrMoreIcon("less")} className="lessIcon btn inbtn">
                        <svg   height="14" viewBox="0 -192 469.33333 469" fill="#C1C1C4" width="14" xmlns="http://www.w3.org/2000/svg"><path onClick={()=>onClickInLessOrMoreIcon("less")} d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0" /></svg>
                    </button>

                    <div onMouseOver={typeOfShop!=="wrongYouNow"?() => onHoverInItemNumber("simple", id):null} className="itemNumber">
                        <p style = {{userSelect: "none"}}>{itm.numberOfElements} <span className="pcs">pcs</span></p>
                    </div>
                    <button onSubmit={()=>onClickInLessOrMoreIcon("more")} className="moreIcon btn inbtn">
                        <svg height="14" viewBox="0 0 469.33333 469.33333" width="14" fill="#C1C1C4" xmlns="http://www.w3.org/2000/svg"><path onClick={()=>onClickInLessOrMoreIcon("more")} d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0" /></svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ItemTypeTwoBloc;