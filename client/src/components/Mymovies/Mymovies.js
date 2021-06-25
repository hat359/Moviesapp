import React,{useContext} from 'react'
import axios from 'axios'
import Mymovdat from '../Details/Mymovdat'
import Navigation from '../Navigation'
import Usercontext from '../../context/Usercontext'
import { MovieContext } from '../../context/Movcontext'

const img_url='http://image.tmdb.org/t/p/'
const key='ba2afa852f6cea12821cf3b701fb92b2'
const url='https://api.themoviedb.org/3/'
class Mymovies extends React.Component{
  static contextType=MovieContext
constructor(){
super()

this.state={
moviedat:[],
x:['rec.py'],
cast:[],
recid:[],
loading:false


}
this.fe=this.fe.bind(this)
this.hand=this.hand.bind(this)


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



}).then(()=>{
  this.fe()
  
})

}

hand(){
  let token = localStorage.getItem('auth-token')
  const list=this.state.x
  const variable={
    reclist:this.state.x,
    cast:this.state.cast
  }
 console.log(this.state.x)
 console.log(this.state.cast)
  this.setState({
    loading:true
  })
  axios.post('/api/favorites/reclist',variable,{headers:{"t-auth-token":token}})
  .then(response=>{
  
 localStorage.setItem('reclist',response.data.movlist)
  this.setState({
    loading:false
  })
  this.props.history.push('/recmov')

  })



}



 fe(){
   var i=0
   
  const movid=19995
  
  
  for(i=0;i<this.state.moviedat.length;i++){
  var movi=this.state.moviedat[i].movieid
    axios.get( `${url}movie/${movi}?api_key=${key}&language=en-US`)
  .then(response=>{
    delete response.data.belongs_to_collection
    delete response.data.adult
    delete response.data.backdrop_path
    delete response.data.imdb_id
    delete response.data.poster_path
    delete response.data.video
    delete response.data.homepage
    delete response.data.production_companies

    
    const myJSON = JSON.stringify(response.data);
    this.setState({
      x:[...this.state.x,myJSON]
    })
    

  }).catch(err=>{
    console.log(err.response.data)
  })

}

this.cr()


}

cr(){
  var i=0;
  for(i=0;i<this.state.moviedat.length;i++){
    var mov=this.state.moviedat[i].movieid
    axios.get(`${url}movie/${mov}/credits?api_key=${key}`)
  .then(response=>{
    
   const s=JSON.stringify(response.data)
   this.setState({
    cast:[...this.state.cast,s]
    
  })
  console.log(response.data)

  })

  }


}

render(){

return(
<div className="mylist">
<Navigation path={this.props.match.path}/>
{localStorage.getItem('userId')==""?<div className="notlogged">Login to view </div>:<div>
{this.state.loading ?<div className="loading"><img src="https://i.imgur.com/kv2oHwT.gif"/></div> :<div className="recbut"><button onClick={this.hand}>Generate Recommendations</button></div> }

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


  
  </div>}

  




</div>



)


}


}

export default Mymovies