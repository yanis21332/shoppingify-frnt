import React from "react";

const List = ({ listName, creationDate, stateOfList,setTypeOfHistoryPage,setAllElementsThatWeNeedForAListContainer,items }) => {

    const onSubmitInButton = () => {
        const data = {
            title: listName,
            date: creationDate,
            items: items
        }
        setTypeOfHistoryPage("TypeTwo");
        setAllElementsThatWeNeedForAListContainer(data)
        console.log(data)
    }
    return (
        <div className="oneList">
            <div className="listcontainer">
                <div className="leftText">
                    <h3>{listName}</h3>
                </div>
                <div className="rightElements">
                    <div className="creationDateParent">
                        <div id="DateElement">
                            <svg width="20" height="20" fill="#9ca3af" className="calendarSVGimage" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z"></path></svg>
                            <p className="creationDate">{creationDate}</p>
                        </div>
                        <button className={`stateOfList ${stateOfList}`}>
                            <p>{stateOfList}</p>
                        </button>
                        <button onClick={onSubmitInButton} className="findOutMoreButton">
                            <svg fill = "#e19238" width = "20" height = "20" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List