
import React from 'react'


function Grid(props){
    
return(


<div className="">
   <div className="col-md-3">
    <div className="card" style={{width:' 18rem'}}>
  <a href={`/movie/${props.movid}`}><img src={props.image} className="card-img-top" alt="..."/></a>
  
  
   
  </div>
  
</div>
</div>
)


}

export default Grid


   