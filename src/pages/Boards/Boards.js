import React, { useContext , useState} from 'react';
import {AuthContext} from '../../context/auth'
import Column from '../../components/Addcolumn/Column'
import {Button} from 'react-bootstrap'
import { withRouter, useHistory } from "react-router-dom";
import Axios from 'axios';
import './Boards.css'

const Boards=(props)=>{
console.log("boards",props);

const [AddColumn , setAddColumn] = useState('');
const [show, setShow] = useState(false);


const {currentUser} = useContext(AuthContext);

const userId=currentUser.uid;

const history = useHistory();

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const BoardId=props.location.state.boardId

const DeleteBoard=()=>{
    if(window.confirm("Are you sure yo want to delete Board")){
    Axios.delete(`https://pro-organizers.firebaseio.com/${userId}/Boards/${BoardId}.json`)
    .then((response)=>{
        alert("Boards Delete Succesfully");
        history.push("/");
    })
    .catch((error)=>{
        console.log(error);
    })
  }
}



const ColumnSubmit=(props)=>{
    console.log("ColumnSubmit",props);
    Axios.post(`https://pro-organizers.firebaseio.com/${userId}/boardContents/${BoardId}/column.json`,{
        name: AddColumn
    })
    .then((response)=>{
        console.log(response);
        alert("Column addedd succesfully");
        setShow(false);
    })
    .catch((error)=>{
        console.log("Columnsubmit error",error);
    })
}


    return(
        <div>
            <div className="title d-flex justify-content-between mt-4">
                    <h2 className="borad-title">{props.match.params.boardName}</h2>
                    <Button variant="danger" onClick={DeleteBoard}>Delete Board</Button>
                    
            </div>
            <div className="Column-Data">
            <Column BoardId={props.location.state.boardId} members={props.location.state.members}/>
            <button className="btn1 mt-4 mx-4 border-0" onClick={handleShow}>Add Column</button> 
            </div>

        <div>
        <form >
                <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{
                   display: show ? 'block' : 'none'
                     }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{color: "blue"}}>Add Column</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Enter a column name:</label>
                            <input type="text" id="column_name" className="form-control" style={{width: 750}}  onChange={(e)=>{setAddColumn(e.target.value)}} value={AddColumn}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="CreateColumn" className="btn3 btn-primary" onClick={ColumnSubmit}>Add Column</button>
                        </div>
                        </div>
                    </div>
                </div>
                </form>
           
           </div>
           
        </div>

    )
}

export default withRouter(Boards);

