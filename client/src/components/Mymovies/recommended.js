import React,{useContext,useEffect,useState} from 'react'
import axios from 'axios'
import Navigation from '../Navigation'
import Usercontext from '../../context/Usercontext'
import Grid from '../Grid'

function Recommend(props){
    const [rec,setrec]=useState('')
    const [recm,setrecm]=useState([])
    const img_url='http://image.tmdb.org/t/p/'
    const key='ba2afa852f6cea12821cf3b701fb92b2'
    const url='https://api.themoviedb.org/3/'

useEffect(()=>{
setrec(localStorage.getItem('reclist'))



},[])

useEffect(()=>{
   try{
    var list = rec.split(" ")
    console.log(list)
    for (var i=0;i<list.length-1;i++){
        var movi=list[i]
        console.log(i)
        axios.get( `${url}movie/${movi}?api_key=${key}&language=en-US`)
      .then(response=>{
       
        setrecm(prevmov=>[...prevmov,response.data])
    
    
        
        })
    
    
    }
}catch(err){
    console.log("no")
}


},[rec])






return(
<div className="rec"><Navigation path={props.match.path}/>

{localStorage.getItem("userId")==""?<div className="notlogged">Login to view </div>:<section id="recgr">
          <div className="container">
              <div className="row holder" >
              { recm.map(movie=>(
               
                   <Grid key={movie.id}
                    image={movie.poster_path &&`${img_url}w500${movie.poster_path}` }
                    movid={movie.id} vote={movie.vote_average}
                   
                   />
                       ))}

</div>
</div>
</section>}











</div>

)







}

export default Recommend