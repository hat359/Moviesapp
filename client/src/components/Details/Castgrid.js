
import React from 'react'


function Castgrid(props){

   
    
return(


<div >
   <div className="col-md-3">
    <div  className="card" style={{width:' 18rem'}}>
 <img className="castimg" src={props.image} className="card-img-top" alt="..."/>
<span className="castname">{props.name}</span>
<span className="castchar">{props.char}</span>
  
   
  </div>
  
</div>
</div>
)


}

export default Castgrid


   