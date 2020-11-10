import React,{useState,useEffect} from 'react'
import axios from 'axios'

function Mylistadd(props){

const [added,setadded]=useState(false)

const variable={

movieid:props.movieid ,
movietitle: props.movieinfo.original_title,
movieimg:props.movieinfo.poster_path ,
tvtitle:props.movieinfo.original_name,
movierun:props.movieinfo.runtime,
identifier:props.iden


}

useEffect(()=>{
    let token = localStorage.getItem('auth-token')
    axios.post('/api/favorites/added',variable,{headers:{"t-auth-token":token}})
   .then( response=>{
      if(response.data.success){
            setadded(response.data.added)
 
     }
         


   }).catch(err=>{
   console.log('.')
        
   })
   

},[])


function handel(){
    let token = localStorage.getItem('auth-token')
if(added){
   
    axios.post('/api/favorites/remove',variable,{headers:{"t-auth-token":token}})
    .then(response=>{
    if(response.data.success){
        setadded(false)
    }
    
    }).catch(err=>
        {alert('Did not commit')
    })
    

}else{
axios.post('/api/favorites/add',variable,{headers:{"t-auth-token":token}})
.then(response=>{
setadded(true)
alert('added')

}).catch(err=>
    { alert('Login/Register to add Movies to List')
})







}

}

return(
<div>

<button className="mylistbut" onClick={handel}>{added ? "Remove from Mylist" :"Add to Mylist"}  </button>

</div>

)




}

export default Mylistadd