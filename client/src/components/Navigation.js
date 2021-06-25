import React,{useContext} from 'react'

import Usercontext from '../context/Usercontext'

function Navigation(props){
  const {userdata,setUserdata}=useContext(Usercontext)
  
  const str=userdata.user && userdata.user.name.split(" ",1)

 


  const logout=()=>{
    
     setUserdata({
    token:undefined,
    user:undefined


  })
    localStorage.setItem("auth-token","")
    localStorage.setItem("userId","")
    localStorage.setItem('reclist',"")
    window.location.reload()

 
   

  }
return(
<div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/"><img src="https://lh3.googleusercontent.com/CtJZQ5wzxkjm6H9fvmmujKJSN9TytDqvmvl_vkWPfi62gObAZWHCGCenm0SKjZEzwO0" /></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item " className={props.path==="/" || props.path==="/movie/:movid" ? "active":" "}>
        <a class="nav-link" href="/">Movies </a>
      </li>
      <li class="nav-item" className={props.path==="/tv" ||props.path==="/tv/:tvid" ? "active":" "}>
        <a class="nav-link" href="/tv">Tv Shows</a>
      </li>
      <li class="nav-item" className={props.path==="/mylist"  ? "active":" "}> 
        <a class="nav-link" href="/mylist">Mylist</a>
      </li>
      <li class="nav-item" className={props.path==="/recmov"  ? "active":" "}> 
        <a class="nav-link" href="/recmov">Recommended Movies</a>
      </li>
     
     
    </ul>
    <ul class="navbar-nav ml-auto">
    {userdata.user ?( 
    <><li class="nav-item">
   <a id="wel" class="nav-link">Welcome {str[0]}!</a>
  </li>
  <li class="nav-item">
    <p class=" logoutbut" onClick={logout} >Logout</p>
  </li></>):(<>
   <li class="nav-item">
        <a class="nav-link" href="/login">SignIn</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/register">SignUp</a>
      </li>
    </>)}
     
     
    </ul>
    
  </div>
</nav>



</div>



)


}

export default Navigation