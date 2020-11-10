
import React from 'react'


function ShowsGrid(props){
    
return(


<div className="holder">
   <div className="col-md-3">
    <div className="card" style={{width:' 18rem'}}>
  <a href={`/tv/${props.tvid}`}><img src={props.image} className="card-img-top" alt="..."/></a>
  
  
   
  </div>
  <div className="progress">
  <div className="progress-bar bg-warning" role="progressbar" style={{width: `${props.vote*10}%`}} aria-valuenow={props.vote*10} aria-valuemin="0" aria-valuemax="100">{props.vote}/10</div>
</div>
</div>
</div>
)


}

export default ShowsGrid


   