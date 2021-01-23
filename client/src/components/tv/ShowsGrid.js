
import React from 'react'


function ShowsGrid(props){
    
return(


<div >
   <div className="col-md-3">
    <div className="card" style={{width:' 18rem'}}>
  <a href={`/tv/${props.tvid}`}><img src={props.image} className="card-img-top" alt="..."/></a>
  
  
   
  </div>
  
</div>
</div>
)


}

export default ShowsGrid


   