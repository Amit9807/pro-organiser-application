import React, { useState , useContext} from 'react';
import fire from '../../config/fire';
import { AuthContext } from '../../context/auth';
import { withRouter, Redirect } from 'react-router-dom';
import {Form , Button ,Col} from 'react-bootstrap';
import  './Login.css'


function Login(props){
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBtn, setLoginBtn] = useState(true);
  const [formTitle, setFormTitle] = useState('Login');

  
  const signup = (event) => {
    event.preventDefault();
    fire.auth().createUserWithEmailAndPassword(email, password)
     .catch((error) => {
        alert(error);
     })
    
  }

  
  const login = (event) => {
    event.preventDefault();
    fire.auth().signInWithEmailAndPassword(email, password)
     .catch((error) => {
        alert(error.message)
     })
  }

  const getAction = action => {
    if(action === 'reg'){
          setFormTitle('Register');
          setLoginBtn(false);

    }else{
          setFormTitle('Login');
          setLoginBtn(true);
   
    }
}

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  let submitBtn = loginBtn ?
  (<button  type="submit" className="signbtn btn btn-primary rounded-top" onClick={login} >Sign In</button>) :
  (<button  type="submit" className="signbtn btn btn-primary rounded-top" onClick={signup} >Register</button>);

  let login_register = loginBtn ? 
  (<a  className="loginBtn btn  " onClick={() => getAction('reg')}>Register</a>) :
  (<a  className="loginBtn btn  " onClick={() => getAction('login')}>Login</a>);

  

  

  return(
               <div className="LoginForm">
                  
                  <h2 className="mx-4 p-4 mt-4" style={{color: "blue"}}> {formTitle}</h2>
                    <Form.Group  sm={12}  as={Col} controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <input type="password" className="form-control " id="email" name="email" value={email} placeholder="Enter a Email" onChange={(event) => setEmail(event.target.value)}  />
                  </Form.Group>
                    <Form.Group  sm={12} as={Col} controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter a password" onChange={(event) => setPassword(event.target.value)} />
                     </Form.Group>
                    <div className="">
                     <div className="submit mt ">
                        {submitBtn}
                      </div>
                      <h6 className="mt-4  d-flex justify-content-center">or</h6>
                     <div className="Login_register mt-4 my-4 d-flex justify-content-center">
                        {login_register}
                      </div>
                    </div>
             </div>
  )

}

export default withRouter(Login);

