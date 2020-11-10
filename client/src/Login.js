import React from 'react'
import axios from'axios'
import Usercontext from './context/Usercontext'


class Register extends React.Component{
    static contextType=Usercontext
constructor(){
super()

this.state={

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
axios.post('/api/user/login',variable)
.then(response=>{
    const {setUserdata}=this.context

    setUserdata({
    token:response.data.token,
    user:response.data.user


    })
    
    localStorage.setItem('auth-token',response.data.token)
     localStorage.setItem('userId',response.data.user.id)
    this.props.history.push("/");



}).catch(err=>{


this.setState({
    error :err.response.data
})

})


}

render(){

    
    return(
<div className="bckgr">
    <img src="https://cdn.hipwallpaper.com/i/98/21/dUyCkp.jpg" alt="backdrop"/>
    <form className="form">
<div className="inp" >
    <h1 className="signin">Sign In</h1>
<input type="text" value={this.state.email} name="email" placeholder="Email" onChange={this.handelchange}/><br/>
<input className="pass" type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handelchange}/><br/>
<span>{this.state.error}</span>
<button className="but" onClick={this.handelsub}>Sign In</button>
<p className="switch">Haven't Signed up ? <a href="/register"> Sign Up now</a></p>
<p>Sign In later <a href="/"> Go to Home</a></p>

</div>

</form>

</div>



    )}



}

export default Register