import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import jwt from 'jwt-decode'

const AuthPage = ({ connexionType }) => {
    const [error,setError] = useState(null)
  
    let cooks = document.cookie.split(";")

    let id = null;
    for (let index = 0; index < cooks.length; index++) {
        try {
            let a = jwt(cooks[index])
            if (a) {
                id = a.id
                //console("le cookie est valid")
            }
        } catch (err) {
            //console.error("this cookie are not valide")
        }
    }
    if(id!==null){
        document.location.href = "/"
    }


    const onLogin = (e) => {
        e.preventDefault()
        //console(e)
        let data = {
            emailOrPseudo: e.target[0].value,
            password: e.target[1].value
        }
        axios.post("http://localhost:4000/auth/login",data).then(res=>{
            if(!res.data.error){
                //console("pas d'erreur")
                setError(null)
                let date = new Date(Date.now() + 1000*60*60*24*3); //86400000ms = 1 jour
                document.cookie = `user=${res.data.token}; path=/; expires=` + date;
                //console(document.cookie)
                window.location.href = "/"
            }else{
                setError(res.data.error)
                console.error(res.data.error)
            }
        }).catch(err=>{
            console.error(err)
        })
    }
    const onSignup = (e) => {
        e.preventDefault()
        //console(e)
        let data = {
            email: e.target[0].value,
            password: e.target[2].value,
            pseudo: e.target[1].value
        }
        axios.post("http://localhost:4000/auth/createuser",data).then(res=>{
            if(!res.data.error){
                setError(null)
                window.location.href = "/signin"
            }else{
                setError(res.data.error)
                console.error(res.data.error)
            }
        }).catch(err=>{
            console.error(err)
        })
    }

    return (
        <div className="AuthPage">
            {connexionType === "login" ?
                <div className="loginPage">
                    <div className="topPart">
                        <div className="presentationZone">
                            <h2 className="welcomeTitle">Welcome</h2>
                            <img alt="person" src="https://i.pinimg.com/236x/12/e2/05/12e205ff1fa9b108f4c1f64c22de4945--street-look-men-street.jpg" />
                        </div>
                        <div className="formPart">
                            <form onSubmit={onLogin}>
                                <input required className="userNameInput entrinput" placeholder="email or username" type="text" />
                                <input required className="passwordInput entrinput" placeholder="password" type="password" />
                                <input required className="submitInput sbmtinput" type="submit" value="LOGIN" />
                            </form>
                            {error!==false&&<p style = {{position:"relative",top:"15px",color:"red",fontWeight:"bold"}} className = "errorMessage">{error}</p>}

                      
                        </div>
                    </div>
                    <div className="bottomPart">
                        <ul className="propositions">
                            <li>Don't have an account ? <Link to="/signup" >Sign up</Link> </li>
                        </ul>
                    </div>
                </div> : <div className="SignupPage">
                    <div className="topPart">
                        <div className="presentationZone">
                            <h2 className="welcomeTitle">Welcome</h2>
                            <img alt="person" src="https://i.pinimg.com/236x/12/e2/05/12e205ff1fa9b108f4c1f64c22de4945--street-look-men-street.jpg" />
                        </div>
                        <div className="formPart">
                            <form onSubmit={onSignup} className="signupForm">
                                <input required className="emailInput entrinput" placeholder="Your email" type="email" />
                                <input required className="pseudoInput entrinput" placeholder="Your pseudo" type="text" />
                                <input required className="passwordInput entrinput" placeholder="password" type="password" />
                                <input required className="submitInput sbmtinput" type="submit" value="SIGN UP" />
                            </form>
                 
                        </div>
                        {error!==false&&<p style = {{position:"relative",top:"15px",color:"red",fontWeight:"bold"}} className = "errorMessage">{error}</p>}
                    </div>
                    <div className="bottomPart">
                        <ul className="propositions">
                            <li>Already have an account ? <Link to="/signin" >login</Link> </li>
                        </ul>
                    </div>
                </div>}


        </div>
    )
}

export default AuthPage;