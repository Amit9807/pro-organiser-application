import React,{useState ,useContext} from 'react'
import axios from 'axios';
import {AuthContext} from '../../context/auth'
import { withRouter, useHistory } from "react-router-dom";

import './CreateBoards.css'



const CreateBoard=(props)=>{

    // const { currentUser } = useContext(AuthContext);

    const [Name, setName] = useState("");
    const [teamMembers, setTeamMembers] = useState("");
    const [type, setType] = useState("");

    // const userId =currentUser.uid;
    // const userId="2ImxSdEznhXNVC7wM8A2AmK2E1b2";
    const history = useHistory();

  const Create=(e)=>{
        e.preventDefault();
            axios.post(`https://pro-organizer-cebf4.firebaseio.com/Boards.json`, {
                    name: Name,
                    team: teamMembers,
                    type: type
                 })
                .then(response=>{
                    // alert("Board added succesfully");
                    history.push("/");
                    console.log(response);
                })
            }

    return(
        <div>
            <h2 className="board-title mt-4">Create a Boards</h2>
               <form className="form1 mx-sm-5 mt-sm-4" onSubmit={Create} >
                        <div className="form-group mx-sm-3 ">
                            <label>Enter a name of your board</label>
                            <input type="text" id="name" class="form-control col-sm-8"  value={Name} onChange={(event) => setName(event.target.value)} placeholder="eg Agile Sprint Board" />
                        </div>
                        <div className="form-group mx-sm-3 ">
                            <label >Add your team member</label>
                            <input type="text" id="team" class="form-control col-sm-8"  value={teamMembers} onChange={(event) => setTeamMembers(event.target.value)} placeholder="Add your team (seprate by commas)" />
                        </div>
                        
                        <div className="form-group mx-sm-3 ">
                            <label >Enter the type of your board</label>
                            <input type="text" id="type" class="form-control col-sm-8"  value={type} onChange={(event) => setType(event.target.value)} aria-describedby="emailHelp" placeholder="eg Design UX" />
                        </div>
                      
                        <button type="submit" class="btn btn-primary mx-sm-3" id="CreateBoard">Create</button>
                </form>
        </div>
    )
}

export default withRouter(CreateBoard);


