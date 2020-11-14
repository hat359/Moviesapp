import React,{useContext,useState} from 'react'
import {Navbar} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Usercontext from '../context/Usercontext'

function Navigation(){
  const {userdata,setUserdata}=useContext(Usercontext)
  
  const str=userdata.user && userdata.user.name.split(" ",1)

 


  const logout=()=>{
    
     setUserdata({
    token:undefined,
    user:undefined


  })
    localStorage.setItem("auth-token","")
    localStorage.removeItem("userId")
    window.location.reload()

 
   

  }
return(
<div>
<Navbar className="navbar navbar-static-top" bg="light" expand="lg">
  <Navbar.Brand href="/"><img src="https://lh3.googleusercontent.com/CtJZQ5wzxkjm6H9fvmmujKJSN9TytDqvmvl_vkWPfi62gObAZWHCGCenm0SKjZEzwO0" /></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="/"><span>Movies</span></Nav.Link>
    <Nav.Link href="/tv"><span>Tv Shows</span></Nav.Link>
    <Nav.Link href="/mylist"><span>MyList</span></Nav.Link>
   
    </Nav>
    
    <Nav className="ml-auto">
     
      {userdata.user ?( 
    <div> <span>Welcome {str[0]}!</span>&nbsp <a className="logoutbut" onClick={logout}><span>Logout</span> </a></div> ):(<>
  <Nav.Link href="/login"><span>SignIn</span></Nav.Link>
  <Nav.Link href="/register"><span>SignUp</span></Nav.Link>
</>
)}
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>





</div>



)


}

export default Navigation