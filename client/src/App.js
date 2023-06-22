
import React,{useState,useEffect, Fragment} from 'react'
import './App.css';
import {BrowserRouter, Route, Switch } from "react-router-dom"
import Main from './Main'
import Register from './Register'
import Login from './Login' 
import Usercontext from './context/Usercontext'
import axios from 'axios'
import Recommend from './components/Mymovies/recommended';

import Shows from './components/tv/Shows'
import Moviedetail from './components/Details/Moviedetail'
import Tvdetail from './components/Details/Tvdetail'
import Mymovies from './components/Mymovies/Mymovies'
import { MovieProvider } from './context/Movcontext';
function App() {
 

  const [userdata,setUserdata]=useState({
 
    token:undefined,
   user:undefined,
   recid:[]
})



useEffect(()=>{
const checklogin=async()=>{
let token = localStorage.getItem('auth-token')

if(token===null){
localStorage.setItem('auth-token','')
token=''

}

const tokenresp=await axios.post('http://localhost:6060/api/user/validtoken',null,{headers:{"t-auth-token":token}})

if(tokenresp.data){
const userresp= await axios.get('http://localhost:6060/api/user/',{headers:{"t-auth-token":token}})
setUserdata({

token,
user:userresp.data,


})

}

}
checklogin()


},[])

  return (
    
    <BrowserRouter>

    <Usercontext.Provider value={{userdata,setUserdata}}>
      
    <MovieProvider>
   <Switch>
   <Route exact path="/register" component={Register}/>
    <Route exact path="/login" component={Login}/>
   
    <Route exact path="/" component={Main} />
    <Route exact path="/tv" component={Shows} />
    <Route exact path="/movie/:movid" component={Moviedetail} />
    <Route exact path="/tv/:tvid" component={Tvdetail} />
    <Route exact path="/mylist" component={Mymovies} />
    <Route exact path="/recmov" component={Recommend} />
    


   </Switch>
   </MovieProvider>
   </Usercontext.Provider>
   </BrowserRouter>
  )
}

export default App;
