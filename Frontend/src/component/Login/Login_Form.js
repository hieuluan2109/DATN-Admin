import React, { Component } from 'react'
// import Status from './StatusRequest'
import axios from 'axios'
import Popup from "reactjs-popup";
import ForgotPassword from './ForgotPassword';
class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value           
        });
      }
    //   handleChanges = (event) => {
    //     this.setState({ password: event.target.value           
    //     });
    //   }
            handleSubmit=event=>{
             event.preventDefault();
            const{email,password}=this.state
            // POST #1
            axios({
                method: 'post',
                url: 'http://localhost:8000/admin/login',
                data: {email,password}
              }).then(res=>{
                    console.log(res.data)
              }).catch((error) => {
                    console.log("Lỗi",error.response.data )  
                        if(error.response.data.success===false){
                            
            }});
             
            //   console.log({email,password})

             // POST #2
            //  axios.get('http://localhost:8000/admin/logout').then(res=>{
            //     const persons = res.data;
            //        this.setState({ persons });
            //       console.log(this.state.persons)
            // //     this.setState({ persons });
            // //     console.log(this.state.persons)
            //     // if(res.msg=="true")return <Redirect to='/a' />
            //     // else return <Redirect to='/b' />
            //  }).catch(error => console.log("Lỗi" ,error));
            //  console.log(this.state.email);
            //  console.log(this.state.password);

                //GET dữ liệu được
            // axios.get('http://localhost:8000/admin/profile').then(res=>{
            //     const persons = res.data;
            //     this.setState({ persons });
            //     console.log(this.state.persons)
            //  }).catch(error => console.log("Lỗi" ,error));
            //  console.log(this.state.email);
            //  console.log(this.state.password);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2> Login </h2>
                    <div><i id="user" className="fas fa-user"></i> </div>
                    <div> <input className="iput" type="email" placeholder="Email" name="email" value={this.state.name} onChange={this.handleChange}></input></div>
                    <div><i id="lock" className="fa fa-lock" ></i></div>
                    <div><input className="iput" type="password" placeholder="********" name="password" value={this.state.password} onChange={this.handleChange} ></input></div>
                    <div className="checkb"> <input type="checkbox"></input><label id="remember">Remember me</label> </div>
                    <div><input type="submit" className="btn" value="Login" /> </div>
                    
                </form>
           
                    <Popup  trigger={<span>Forget Password</span>} modal> 
                         {close => <ForgotPassword close={close} />}
                    </Popup>
                   
            </div>
        );
    }
}
export default LoginForm;