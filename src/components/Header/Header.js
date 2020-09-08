import React,{Component} from 'react'
import fire from '../../config/fire'
import { Link} from 'react-router-dom'
import {Navbar} from 'react-bootstrap';
import './Header.css';

export default class Header extends Component{
    render(){
        return(
            <div>
           <Navbar className="Navbar">
             <a  href="#"  className="mx-sm-5 " style={{color: "white"}}>Pro-Organizer</a>
             <Navbar.Toggle />
             <Navbar.Collapse className="justify-content-end">
             <Navbar.Text className="Nav-link" >
             <a className="mx-sm-3 "><Link to="/"  style={{color: "white"}}>Home</Link></a>
             <a className="mx-sm-3 mx-1"><Link to="/CreateBoard" style={{color: "white"}}>Create Board</Link></a>
             {/* <a  className="mx-sm-3 mx-1" style={{color: "white"}} onClick={()=>fire.auth().signOut()}>Logout</a> */}
             </Navbar.Text>
            </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}


