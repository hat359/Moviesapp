
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

function Banner(props){
return(
 <div  > 


<Carousel className="cara">
  <Carousel.Item>
  {props.p1==="/" ? (<a href={`/movie/${props.mid}`}>  <img
      className="d-block w-100 mimg img-fluid"
      src={props.image1}
      alt="Third slide"
    /></a>):<a href={`/tv/${props.mid}`}>  <img
    className="d-block w-100 mimg img-fluid"
    src={props.image1}
    alt="Third slide"
  /></a>}
  
    <Carousel.Caption>
    <div className="title">
        {props.title1}
   </div>
   <div className="desc"><p>{props.ov1}</p></div>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
  {props.p2==="/" ? (<a href={`/movie/${props.mid2}`}>  <img
      className="d-block w-100 mimg img-fluid"
      src={props.image2}
      alt="Third slide"
    /></a>):<a href={`/tv/${props.mid2}`}>  <img
    className="d-block w-100 mimg img-fluid"
    src={props.image2}
    alt="Third slide"
  /></a>}
  
    <Carousel.Caption>
    <div className="title">
        {props.title2}
   </div>
   <div className="desc"><p>{props.ov2}</p></div>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    {props.p3==="/" ? (<a href={`/movie/${props.mid3}`}>  <img
      className="d-block w-100 mimg img-fluid"
      src={props.image3}
      alt="Third slide"
    /></a>):<a href={`/tv/${props.mid3}`}>  <img
    className="d-block w-100 mimg img-fluid"
    src={props.image3}
    alt="Third slide"
  /></a>}
  

    <Carousel.Caption>
    <div className="title">
        {props.title3}
   </div>
   <div className="desc"><p>{props.ov3}</p></div>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
  {props.p4==="/" ? (<a href={`/movie/${props.mid4}`}>  <img
      className="d-block w-100 mimg img-fluid"
      src={props.image4}
      alt="Third slide"
    /></a>):<a href={`/tv/${props.mid4}`}>  <img
    className="d-block w-100 mimg img-fluid"
    src={props.image4}
    alt="Third slide"
  /></a>}
  
    <Carousel.Caption>
    <div className="title">
        {props.title4}
   </div>
   <div className="desc"><p>{props.ov4}</p></div>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>




</div>


)




}

export default Banner;
