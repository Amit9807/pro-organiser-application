import React, { useState , useContext} from 'react';
import fire from '../../config/fire';
import { AuthContext } from '../../context/auth';
import { withRouter, Redirect } from 'react-router-dom';
import {Form , Button ,Col} from 'react-bootstrap';
import  './Login.css'


function Login(props){
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const login = (event) => {
    event.preventDefault();
    fire.auth().createUserWithEmailAndPassword(email, password)
     .catch((error) => {
        alert(error);
     })
    
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  

  

  return(
               <div className="LoginForm">
                  
                  <h2 className="mx-4 p-4 mt-4">Sign up</h2>
                    <Form.Group  sm={12}  as={Col} controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <input type="password" className="form-control " id="email" name="email" value={email} placeholder="Enter a Email" onChange={(event) => setEmail(event.target.value)}  />
                  </Form.Group>
                    <Form.Group  sm={12} as={Col} controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter a password" onChange={(event) => setPassword(event.target.value)} />
                     </Form.Group>
                    <Button variant="primary"  type="submit" className="mx-3  my-4" onClick={login}>
                      Sign up
                    </Button>
             

             </div>
  )

}

export default withRouter(Login);

