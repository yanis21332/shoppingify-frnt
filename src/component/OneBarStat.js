import React from "react";

const OneBarStat = ({name,pourcentage,color}) => {

    return (
        <div className="oneLoadingBar">
            <div className="textualInformations">
                <p className="itemName PPPP">{name}</p>
                <p className="pourcentage PPPP">{pourcentage}%</p>
            </div>
            <div className="theBarGrayBackground"><div style = {{width: `${pourcentage}%`,backgroundColor: `${color}`}} className="theBar"></div></div>
        </div>
    )
}

export default OneBarStat