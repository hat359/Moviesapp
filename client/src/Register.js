import React from 'react'
import axios from'axios'
import Usercontext from './context/Usercontext'


class Register extends React.Component{
    static contextType=Usercontext
constructor(){
super()

this.state={
    name:'',
    email:'',
    password:'',
    error:''
}
this.handelchange=this.handelchange.bind(this)
this.handelsub=this.handelsub.bind(this)


}
handelchange(event){
    const {name,value}= event.target
    this.setState({[name]:value})

}

handelsub(e){
e.preventDefault()
const variable={
name:this.state.name,
email:this.state.email,
password:this.state.password
}
axios.post('http://localhost:6060/api/user/register',variable)
.then(response=>{
    this.setState({
        error:''
        
        })
alert('saved')
this.props.history.push("/login");

}).catch(err=>{


this.setState({
    error :err.response.data
})

})


}

render(){


    return(
<div className="bckgr">
<img src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY-1920-80.jpg.webp"/>
    
    <form class="form" >
        <div className="inpreg">
        <h1 className="signin">Sign Up</h1>
<input type="text" value={this.state.name} name="name" placeholder="Name" onChange={this.handelchange}/><br/>
<input className="pass" type="text" value={this.state.email} name="email" placeholder="Email" onChange={this.handelchange}/><br/>
<input  className="pass" type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handelchange}/><br/>
<span>{this.state.error}</span>
<button className="but" onClick={this.handelsub}>Sign Up</button>
<div className="switch"><p>Already Signed up ? <a href="/login"> Sign In </a></p></div>
</div>
</form>

</div>



    )}



}

export default Register