import React from 'react'
import axios from 'axios'
import Mymovdat from '../Details/Mymovdat'
import Navigation from '../Navigation'

const img_url='http://image.tmdb.org/t/p/'

class Mymovies extends React.Component{
constructor(){
super()

this.state={
moviedat:[]

}



}

componentDidMount(){
    const variable = {
      userFrom:localStorage.getItem('userId')}
      let token = localStorage.getItem('auth-token')
axios.post('/api/favorites/mymovies',variable,{headers:{"t-auth-token":token}})
.then(response=>{

  this.setState({
    moviedat:response.data

  })



})


}


render(){

return(
<div>
<Navigation path={this.props.match.path}/>
<table class="table table-bordered mylistab">
  <thead>
    <tr>
       <th></th>    
       <th className="text-center" scope="col">Movie Name</th>
      <th className="text-center" scope="col">Movie runtime</th>
      <th className="text-center" scope="col">Remove from favorites</th>
    </tr>
  </thead>
   
    {this.state.moviedat.map(item=>(

      item.identifier==="mov" ?(  <Mymovdat movieid={item.movieid} image={`${img_url}w200${item.movieimg}`} movietitle={item.movietitle} movierun={item.movierun} cid={item.movieid} ide={item.identifier}/>)
      :   <Mymovdat movieid={item.movieid} image={`${img_url}w200${item.movieimg}`} movietitle={item.tvtitle} movierun="--" cid={item.movieid} ide={item.identifier}/>
     


    ))



  } 
</table>
  

  




</div>



)


}


}

export default Mymovies