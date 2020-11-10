import React from 'react'
import axios from 'axios'

function Mymovdat(props){

    function handel(){
        const variable={
         movieid:props.movieid

        }
        let token = localStorage.getItem('auth-token')
        axios.post('/api/favorites/remove',variable,{headers:{"t-auth-token":token}})
        .then(response=>{
        if(response.data.success){
             console.log('removed')
        }
        
        }).catch(err=>
            {alert('Did not commit')
        })
        
         window.location.reload()


    }

return(

<tbody>
    {props.ide==="mov" ? (<a href={`/movie/${props.cid}`}><td><img src={props.image}/></td></a>):(<a href={`/tv/${props.cid}`}><td><img src={props.image}/></td></a>)}

<td className="tablecon">{props.movietitle}</td>
<td className="tablecon">{props.movierun} mins</td>
<td><button className="removebut" onClick={handel}>Remove</button></td>




</tbody>



)
}

export default Mymovdat
