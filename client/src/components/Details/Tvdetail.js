import React from 'react'

import Navigation from '../Navigation'
import Castgrid from './Castgrid'
import Tvsim from'./Tvsim'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Mylistadd from'../Mymovies/Mylistadd'

import 'bootstrap/dist/js/bootstrap.js'

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
    items: 1
  }
};

class Tvdetail extends React.Component{
  
constructor(){
super()
this.state={
mm:[],
count:0,
cast:[],
trail:false,
video:[],
similar:[]
}

this.handelclick=this.handelclick.bind(this)
this.handeltrail=this.handeltrail.bind(this)
}
handelclick(){
  const movid=this.props.match.params.tvid
    fetch(`${url}tv/${movid}/credits?api_key=${key}`)
    .then(response=>response.json())
    .then(data=>{
       this.setState({
           cast:data.cast
       })
   

      })
      window.scrollTo(0,500);
}

componentDidMount(){
  const movid=this.props.match.params.tvid;
  console.log(movid)
    
    fetch( `${url}tv/${movid}?api_key=${key}&language=en-US`)
    .then(response=>response.json())
    .then(data=>{
     this.setState({
        mm:data
      })
     })

     fetch(`${url}tv/${movid}/videos?api_key=${key}&language=en-US`)
     .then(response=>response.json())
     .then(data=>{
        this.setState({
         video:data.results


        })

     })
     fetch(`${url}tv/${movid}/similar?api_key=${key}&language=en-US`)
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
console.log('Clicked')


}


render(){
   
return(
<div>
  <Navigation path={this.props.match.path}/>
<div className="poster" style={{backgroundImage:`url('${img_url}w1280/${this.state.mm.backdrop_path}')`}}>


{this.state.trail ? (<div className="movietrailer">
  <iframe  src={`https://www.youtube.com/embed/${this.state.video[0] && this.state.video[0].key}?autoplay=1`} allow="autoplay"/>
 
</div>):null}


</div>
<i onClick={this.handeltrail} className="fa fa-play fa-4x" aria-hidden="true">Watch Trailer</i>
{this.state.trail ?(
<span className="closetrailer" onClick={this.handeltrail}>Close Trailer</span>):null}

<Mylistadd userid={localStorage.getItem('userId')} movieid={this.props.match.params.tvid}
 movieinfo={this.state.mm} iden="tv"/>


<table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col" style={{width:'10rem'}}>Title</th>
<td scope="col">{this.state.mm && this.state.mm.original_name}</td>
      <th scope="col" style={{width:'10rem'}}>Platform</th>
<td scope="col">{this.state.mm.networks && this.state.mm.networks[0].name}</td>
      <th scope="col" style={{width:'15rem'}}>Status</th>
      <td scope="col">{this.state.mm.status}</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Seasons</th>
      <td>{this.state.mm.number_of_seasons} 
      
      
      </td>
      <th>Episodes</th>
      <td>{this.state.mm.number_of_episodes}</td>
      <th>Rating</th>
      <td>{this.state.mm.vote_average}/10</td>
    </tr>

    
  </tbody>
</table>
<div className="dettitle text-center"><span >{this.state.mm.original_name}</span></div>
<p className="detdesc text-center">{this.state.mm.overview}</p>


{this.state.similar.length !==0 ? (<div className="simcara">
<div className="container">
  <p>Similar Shows</p>
<Carousel  focusOnSelect={true} responsive={responsive}>
{this.state.similar && this.state.similar.map(s=>(

<Tvsim id={s.id} image={`${img_url}w200${s.poster_path}`}/>






))}
</Carousel>
</div>
</div>
):null}

 <div className="container"> 
 <div className="row">
  {this.state.cast.map(c=>(
  <React.Fragment>
  {c.profile_path && <Castgrid name={c.name} char={c.character} image={`${img_url}w500${c.profile_path}`}/>}
</React.Fragment>

 ))} 

  </div>
  <button className="castbut" onClick={this.handelclick}>CAST</button>


</div> 



</div>





)




}

}

export default Tvdetail