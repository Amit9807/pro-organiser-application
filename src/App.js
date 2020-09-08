import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
  
} from 'react-router-dom'


import MainComponents from './pages/MainComponents/MainComponents'
import CreateBoard from './pages/CreateBoard/CreateBoard'
import Boards from  './pages/Boards/Boards'
import './App.css';

function App() {
  return (
   <div>
  
     <Router>
       <Switch>
         {/* <PrivateRoute path="/" exact  component = {MainComponents} /> */}
         <Route path="/" exact  component = {MainComponents} /> 
         {/* <PrivateRoute path="/createboard" component = {CreateBoard} /> */}
         <Route path="/createboard" component = {CreateBoard} />
         {/* <PrivateRoute path="/board/:boardName" component = {Boards} /> */}
         <Route path="/board/:boardName" component = {Boards} />
       
          <Route path="*" render = {() => <h3>Page not Found!</h3>} />
        </Switch>
       </Router>  
    
   </div>
  );
}

export default App;



//2ImxSdEznhXNVC7wM8A2AmK2E1b2
