import React from "react";
//import Header from "../component/Header";
import OneBarStat from "../component/OneBarStat";
import ShoppingList from "../component/ShoppingList";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useSelector } from "react-redux";



const StatsPage = ({ canShoppingList,TypeOfShoppingList,setTypeOfShoppingList,elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList,setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList }) => {
    const data = [
        { name: 'Jan', items: 0, pv: 200, amt: 2400 },
        { name: 'Feb', items: 0, pv: 250, amt: 2400 },
        { name: 'March', items: 0, pv: 300, amt: 2400 },
        { name: 'April', items: 0, pv: 350, amt: 2400 },
        { name: 'May', items: 0, pv: 400, amt: 2400 },
        { name: 'June', items: 0, pv: 450, amt: 2400 },
        { name: 'July', items: 0, pv: 500, amt: 2400 },
        { name: 'August', items: 0, pv: 500, amt: 2400 },
        { name: 'Sept', items: 0, pv: 500, amt: 2400 },
        { name: 'Oct', items: 0, pv: 500, amt: 2400 },
        { name: 'Nov', items: 0, pv: 500, amt: 2400 },
        { name: 'Dec', items: 0, pv: 500, amt: 2400 }

    ]

    let Jan = [];
    let Feb = [];
    let March = [];
    let April = [];
    let May = [];
    let June = [];
    let July = [];
    let August = [];
    let Sept = [];
    let Oct = [];
    let Nov = [];
    let Dec = [];

    const AllListsBrut = useSelector(state=>state.ListsReducer)
    const AllItems = []
    const AllCat = []

    AllListsBrut.forEach(list=>{
        let today = new Date(list.date) + "";
        let month = today.split(" ")[1] === "Jan"?1:today.split(" ")[1]==="Feb"?2:today.split(" ")[1]==="Mar"?3:today.split(" ")[1]==="Apr"?4:today.split(" ")[1]==="May"?5:today.split(" ")[1]==="June"?6:today.split(" ")[1]==="July"?7:today.split(" ")[1]==="Aug"?8:today.split(" ")[1]==="Sept"?9:today.split(" ")[1]==="Oct"?10:today.split(" ")[1]==="Nov"?11:today.split(" ")[1]==="Dec"?12:"Fuck"

        let realMonth = month - 1
        //console(month)
        list.items.forEach(oneitm=>{
            data[realMonth].items +=  1
        })

        list.items.forEach(itm=>{
            AllItems.push(itm)
            AllCat.push(itm.categories)
        })
    })
    //console(Jan)

    const countsCat = {}
    const realCountsCat = []

    for (const num of AllCat) {
        countsCat[num] = countsCat[num] ? countsCat[num] + 1 : 1;
    }

    for (let index = 0; index < AllCat.length; index++) {
        let number = Object.keys(countsCat).length

        for (let indx = 0; indx < number; indx++) {
            if(countsCat[Object.keys(countsCat)[indx]]===index){
                let pourcentageExact = (index*100) / AllCat.length
                let pourcentageArround = Math.round(pourcentageExact)
                realCountsCat.push({name:Object.keys(countsCat)[indx],num:pourcentageArround})
            }
        }
    }
    
    const countsItems = {}
    const realCountsItems = []

    for (const num of AllItems) {
        let realNum = num.name
        countsItems[realNum] = countsItems[realNum] ? countsItems[realNum] + 1 : 1;
    }

    
    for (let index = 0; index < AllItems.length; index++) {
        let number = Object.keys(countsItems).length

        for (let indx = 0; indx < number; indx++) {
            if(countsItems[Object.keys(countsItems)[indx]]===index){
                let pourcentageExact = (index*100) / AllCat.length
                let pourcentageArround = Math.round(pourcentageExact)
                realCountsItems.push({name:Object.keys(countsItems)[indx],num:pourcentageArround})
            }
        }
      
    }

    return (
        <div className="statsContainer" style={{ width: "100%" }} >
            <div style={{ display: "flex" }} className={`statsAll ${canShoppingList ? "statsAllWithShoppingList" : "statsAllIndepandant"}`}>
                <div className="ShoppingStats">
                    <div className="statistics">
                        <div className="firstInstallment installment">
                            <div className="tlt">
                                <h3 className="installmentTitle">Top items</h3>
                            </div>
                            <div className="loadingBars">
                                {realCountsItems.sort((a,b)=>b.num-a.num).map((cnt,key)=>{
                                    return (
                                        <>
                                            {key<3?<OneBarStat key={key} color="#f9a109" name={cnt.name} pourcentage={cnt.num} />:null}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="secondInstallment installment">
                            <div className="tlt">
                                <h3 className="installmentTitle">Top Categories</h3>
                            </div>
                            <div className="loadingBars">
                                {realCountsCat.sort((a,b)=>b.num-a.num).map((cnt,key)=>{
                                    return (
                                        <>
                                            {key<3?<OneBarStat key={key} color="#56CCF2" name={cnt.name} pourcentage={cnt.num} />:null}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="shemaStats">
                        <div className = "shemaTitle tlt">
                            <h2>Monthly Summary</h2>
                        </div>
                        <LineChart width={800} height={302} data={data}>
                            <Line type="monotone" dataKey="items" stroke="#F9A109" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis  />
                            <Tooltip />
                        </LineChart>
                    </div>
                </div>
                {canShoppingList && <ShoppingList elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {elementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList = {setElementsThatWeNeedIfWeUseTheTypeFourOfShoppingList} TypeOfShoppingList = {TypeOfShoppingList} setTypeOfShoppingList = {setTypeOfShoppingList} />}
            </div>
        </div>
    )
}

export default StatsPage