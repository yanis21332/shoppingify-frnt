import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Cookie from '../import/cookies.svg';
import Items from '../import/list.svg';
import History from '../import/reload.svg';

const Header = ({ canShoppingList, setCanShoppingList, itemsContainerClass, setItemsContainerClass }) => {

    const onClickInCartButton = () => {
        if (canShoppingList) {
            setCanShoppingList(false)
            setItemsContainerClass("itemContainerTypeTwo55")
        } else {
            setCanShoppingList(true)
            setItemsContainerClass("itemContainer")
        }
    }

    const tempListsReducer = useSelector(state=>state.tempListReducer)
    const [notifNumber,setNotifNumber] = useState(tempListsReducer.length)

    useEffect(()=>{
        setNotifNumber(tempListsReducer.length)
    },[tempListsReducer.length])

    return (
        <header className="HeaderLeft">
            <div className="falseUserProfilePicture">
                <img src={Cookie} alt="cookie" />
            </div>
            <div className="pagesBalancer">
                <div className="balancer itemsBalancer">
                    <NavLink activeClassName="balancerSelected" exact to="/" className="linkToItems">
                        <img src={Items} alt="items" />
                    </NavLink>
                </div>
                <div className="balancer HistoryBalancer">
                    <NavLink activeClassName="balancerSelected" exact to="/history" className="linkToItems">
                        <img src={History} alt="history" />
                    </NavLink>
                </div>
                <div className="balancer StatsBalancer">
                    <NavLink activeClassName="balancerSelected" exact to="/stats" className="linkToItems">
                        <svg width="19.5" height="18.75" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>
                    </NavLink>
                </div>
            </div>
            <div className="seeCart">
                <div className="cartImage" onClick={onClickInCartButton}>
                    <svg fill="#fff" width="20.01" height="20" className="cartImageSVG" focusable="false" viewBox="0 0 24 24" aria-hidden="true" ><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                </div>
                <div className="numberOfCommande btn2" onClick={onClickInCartButton}>
                    <p>{notifNumber}</p>
                </div>
            </div>
        </header>
    )
}

export default Header;