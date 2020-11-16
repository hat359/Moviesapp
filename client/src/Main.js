import React from 'react'
import Navigation from './components/Navigation'
import Banner from './components/carousel/Banner'
import Grid from './components/Grid'

const key='ba2afa852f6cea12821cf3b701fb92b2'
const url='https://api.themoviedb.org/3/'
const img_url='http://image.tmdb.org/t/p/'
const x=Math.ceil((Math.random() * 10) );
class Main extends React.Component{
constructor(){
super()

this.state={
  movies:[],
  count:1,
  
}
this.handel=this.handel.bind(this)

}

handel(){
  this.setState({
  count:this.state.count +1,

  
  })
  window.scrollTo(0,(window.pageYOffset)-100);
}

componentDidMount(){
  fetch( `${url}movie/popular/?api_key=${key}&language=en-US&page=1`)
  .then(response=>response.json())
  .then(data=>{
   this.setState({
      movies:data.results,
      count:data.page


   })


  })

}

componentDidUpdate(prevProps,prevState){
  if(prevState.count!==this.state.count){
  fetch(`${url}movie/popular/?api_key=${key}&language=en-US&page=${this.state.count}`)
.then(response=>response.json())
.then(data=>{
   this.setState(prevState=>({
      movies:[...this.state.movies,...data.results],
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
this.state.movies[x] &&  <Banner mid={this.state.movies[x].id} image1={`${img_url}w1280${this.state.movies[x].backdrop_path}`} title1={this.state.movies[x].original_title}
            ov1={this.state.movies[x].overview} p1={this.props.location.pathname}
            
            image2={`${img_url}w1280${this.state.movies[x+1].backdrop_path}`} title2={this.state.movies[x+1].original_title}
            ov2={this.state.movies[x+1].overview} mid2={this.state.movies[x+1].id} p2={this.props.location.pathname}
            
            image3={`${img_url}w1280${this.state.movies[x+2].backdrop_path}`} title3={this.state.movies[x+2].original_title}
            ov3={this.state.movies[x+2].overview} mid3={this.state.movies[x+2].id} p3={this.props.location.pathname}
            image4={`${img_url}w1280${this.state.movies[x+3].backdrop_path}`} title4={this.state.movies[x+3].original_title}
            ov4={this.state.movies[x+3].overview} mid4={this.state.movies[x+3].id} p4={this.props.location.pathname}
            
            
            
            
            />}
       <section id="gr">
          <div className="container d-flex justify-content-centre">
              <div className="row">
              {this.state.movies && this.state.movies.map(movie=>(
               
                   <Grid key={movie.id}
                    image={movie.poster_path &&`${img_url}w500${movie.poster_path}` }
                    movid={movie.id} vote={movie.vote_average}
                   
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



export default Main