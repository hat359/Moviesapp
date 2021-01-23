import React from 'react'

import Navigation from '../Navigation'

import Castgrid from './Castgrid'
import Similar from'./Similar'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import Mylistadd from'../Mymovies/Mylistadd'
import axios from 'axios'

//import Favorite from './section/Favorite'
const key='ba2afa852f6cea12821cf3b701fb92b2'
const url='https://api.themoviedb.org/3/'
const img_url='http://image.tmdb.org/t/p/'
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6.6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

class Moviedetail extends React.Component{
  
constructor(){
super()
this.state={
mm:[],
count:0,
cast:[],
trail:false,
video:[],
similar:[],
value:0,
ctoggle:false
}

this.handelclick=this.handelclick.bind(this)
this.handeltrail=this.handeltrail.bind(this)
this.slider=this.slider.bind(this)
this.rate=this.rate.bind(this)
}
handelclick(){
  const movid=this.props.match.params.movid
    fetch(`${url}movie/${movid}/credits?api_key=${key}`)
    .then(response=>response.json())
    .then(data=>{
       this.setState({
           cast:data.cast,
           ctoggle:!this.state.ctoggle
       })
       window.scrollTo(0,500);
        

      })

}

componentDidMount(){
  const movid=this.props.match.params.movid;
 console.log(localStorage.getItem('userId'))
    
    fetch( `${url}movie/${movid}?api_key=${key}&language=en-US`)
    .then(response=>response.json())
    .then(data=>{
     this.setState({
        mm:data
      })
     })

     fetch(`${url}movie/${movid}/videos?api_key=${key}&language=en-US`)
     .then(response=>response.json())
     .then(data=>{
        this.setState({
         video:data.results


        })

     })
     fetch(`${url}movie/${movid}/similar?api_key=${key}&language=en-US`)
     .then(response=>response.json())
     .then(data=>{
        this.setState({
         similar:data.results


        })


     })
  
  
   


    }

handeltrail(){
this.setState(prevState=>({
trail:!prevState.trail


}))



}
slider(event){
this.setState({
value:event.target.value

})


}

rate(event){
  const variable={
    value:(this.state.value)/10
  }

axios.post(`${url}movie/${this.state.mm.id}/rating?api_key=${key}`,variable)
.then(response=>{
  console.log(response.data)

}).catch(err=>{
console.log(err.response.data)

})


}


render(){
 
return(
<div className="details">
  <Navigation path={this.props.match.path}/>
<div className="poster" style={{backgroundImage:`url('${img_url}w1280/${this.state.mm.backdrop_path}')`}}>


{this.state.trail ? (<div className="movietrailer">
  <iframe  src={`https://www.youtube.com/embed/${this.state.video[0] && this.state.video[0].key}?autoplay=1`} allow="autoplay" allowFullScreen/>
 
</div>):null}


</div>


<i onClick={this.handeltrail} className="fa fa-play fa-4x" aria-hidden="true">Watch Trailer</i>
{this.state.trail ?(
<span className="closetrailer" onClick={this.handeltrail}>Close Trailer</span>):null}

<Mylistadd userid={localStorage.getItem('userId')} movieid={this.props.match.params.movid}
 movieinfo={this.state.mm} iden="mov"/>

<table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col" style={{width:'10rem'}}>Title</th>
<td scope="col">{this.state.mm && this.state.mm.original_title}</td>
      <th scope="col" style={{width:'10rem'}}>Release Date</th>
<td scope="col">{this.state.mm.release_date}</td>
      <th className="phone" scope="col" style={{width:'15rem'}}>Status</th>
      <td className="phone" scope="col">{this.state.mm.status}</td>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Runtime</th>
      <td>{this.state.mm.runtime} mins</td>
      <th>Rating</th>
      <td>{this.state.mm.vote_average}/10</td>
      <th className="phone">Vote Count</th>
      <td className="phone">{this.state.mm.vote_count}</td>
    </tr>
   
    
  </tbody>
</table>
<div className="dettitle text-center"><span >{this.state.mm.original_title}</span></div>
<p className="detdesc text-center">{this.state.mm.overview}</p>




{this.state.similar.length !==0 ? (<div className="simcara">
<div className="container">
  <p>Similar Movies</p>
<Carousel  focusOnSelect={true} responsive={responsive}>
{this.state.similar && this.state.similar.map(s=>(

<Similar id={s.id} image={`${img_url}w200${s.poster_path}`}/>






))}
</Carousel>
</div>
</div>
):null}

 <div className="container cast"> 
 <div className="row holder">
  {this.state.cast && this.state.cast.map(c=>(
    <React.Fragment>
    {this.state.ctoggle ? c.profile_path && <Castgrid name={c.name} char={c.character} image={`${img_url}w500${c.profile_path}`}/>:null}
  </React.Fragment>
    
 ))} 

 

  </div>
  <button class="castbut"onClick={this.handelclick}>CAST</button>


</div> 



</div>





)




}

}

export default Moviedetail