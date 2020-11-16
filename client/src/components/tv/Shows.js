import React from 'react'
import Navigation from '../Navigation'

import Banner from '../carousel/Banner'
import ShowsGrid from './ShowsGrid'

const key='ba2afa852f6cea12821cf3b701fb92b2'
const url='https://api.themoviedb.org/3/'
const img_url='http://image.tmdb.org/t/p/'
const x=Math.floor((Math.random() * 10) + 1);
class Shows extends React.Component{
constructor(){
super()

this.state={
  shows:[],
  count:1
}
this.handel=this.handel.bind(this)

}

handel(){
  this.setState({
  count:this.state.count +1
  
  
  })
  window.scrollTo(0,(window.pageYOffset)-50);
}

componentDidMount(){
  fetch( `${url}tv/popular/?api_key=${key}&language=en-US&page=1`)
  .then(response=>response.json())
  .then(data=>{
   this.setState({
      shows:data.results,
      count:data.page


   })
   

  })
}

componentDidUpdate(prevProps,prevState){
  if(prevState.count!==this.state.count){
  fetch(`${url}tv/popular/?api_key=${key}&language=en-US&page=${this.state.count}`)
.then(response=>response.json())
.then(data=>{
   this.setState(prevState=>({
      shows:[...this.state.shows,...data.results],
      count:data.page


   }))


})

}
}



render(){
return(
<div>
<Navigation path={this.props.match.path}/>

{ 
this.state.shows[x] &&  <Banner image1={`${img_url}w1280${this.state.shows[x].backdrop_path}`} title1={this.state.shows[x].original_name}
            ov1={this.state.shows[x].overview} mid={this.state.shows[x].id}
            
            image2={`${img_url}w1280${this.state.shows[x+1].backdrop_path}`} title2={this.state.shows[x+1].original_name}
            ov2={this.state.shows[x+1].overview} mid2={this.state.shows[x+1].id}
            
            image3={`${img_url}w1280${this.state.shows[x+2].backdrop_path}`} title3={this.state.shows[x+2].original_name}
            ov3={this.state.shows[x+2].overview} mid3={this.state.shows[x+2].id}
            image4={`${img_url}w1280${this.state.shows[x+3].backdrop_path}`} title4={this.state.shows[x+3].original_name}
            ov4={this.state.shows[x+3].overview} mid4={this.state.shows[x+3].id}
            
            
            
            
            />}
       <section id="gr1">
          <div className="container d-flex justify-content-centre">
              <div className="row">
              {this.state.shows && this.state.shows.map(movie=>(
               
                   <ShowsGrid key={movie.id}
                    image={movie.poster_path &&`${img_url}w500${movie.poster_path}` }
                    tvid={movie.id} vote={movie.vote_average}
                   
                   />
                       ))}

</div>
</div>
</section>
<div className="loadbut" >
   <button className="loadmore" onClick={this.handel}>LOAD MORE</button>
   
   </div>
   






</div>


)


}



}



export default Shows