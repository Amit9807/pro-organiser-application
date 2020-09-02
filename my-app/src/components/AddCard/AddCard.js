import React,{useContext , useState , useEffect} from 'react'
import {Card} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {Button , InputGroup , FormControl} from 'react-bootstrap'
import Axios from 'axios';
import { AuthContext} from '../../context/auth'
import './AddCard.css';


const AddCard=(props)=>{


    const [CardData , setCardData] =useState(""); 
    const [ShowModal, setShowModal] = useState(false);
    const [CardTitle , setCardTitle] = useState("");
    const [Member , setMember] = useState("")
    const [Description , setDescription] =useState("");
    const [Date , setDate ] =useState("");    


    const [showCardDetails , setshowCardDetails] =useState(false);
    const [CardId , setCardId] = useState('');
    const [CardTitleDetail , setCardTitleDetail] =useState('');
    const [CardTeamDetail , setCardTeamDetail] =useState('');
    const [CardDescDetail , setCardDescDetail] =useState('');
    const [CardDateDetail , setCardDateDetail] = useState('');
            
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const CardhandleClose = () => setshowCardDetails(false);
    const CardhandleShow = () => setshowCardDetails(true);
    
    const {currentUser}=useContext(AuthContext);

    const UserId=currentUser.uid;

    const BoardId=props.BoardId;


    useEffect(() => {
        getCardData(props.id);
    }, [])

    const DeleteCard=(Id)=>{
       if(window.confirm("Are you sure you want to Delete Card")){
        Axios.delete(`https://pro-organizers.firebaseio.com/${UserId}/boardContents/${BoardId}/column/${Id}.json`)
        .then((res)=>{
            alert("Card Deleted Succesfully");
        })
        .catch((error) => console.log("Error" + error));
       }
    }
    

    const CardSubmit=(Id)=>{
        Axios.post(`https://pro-organizers.firebaseio.com/${UserId}/boardContents/${BoardId}/column/${Id}/card.json`,{
            title: CardTitle,
            team: Member,
            description: Description,
            date: Date
        })
        .then((response)=>{
            alert("Card Data Added succesfully");
            console.log(response);
            setShowModal(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    const getCardData=(Id)=>{
        Axios.get(`https://pro-organizers.firebaseio.com/${UserId}/boardContents/${BoardId}/column/${Id}/card.json`)
        .then((response)=>{
            setCardData(response.data);
            console.log("getCardData",+CardData);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    

    const showDetail=(CardId , CardTitle, CardTeam , CardDesc , CardDate)=>{
        setCardId(CardId);
        setCardTitleDetail(CardTitle);
        setCardTeamDetail(CardTeam);
        setCardDescDetail(CardDesc);
        setCardDateDetail(CardDate);
        setshowCardDetails(true);
    }


    return(
        
    <div style={{display: "inline-block"}}> 

        <div className="mt-4" style={{display: "inline-block"}}>

                     <Card className="mt-4 mx-3" style={{ width: '18rem' , backgroundColor: "grey" }}>
                        <Card.Body >
                          <Card.Title key={props.id} className="d-flex justify-content-between">
                              {props.name}
                             <DeleteIcon onClick={()=>{DeleteCard(props.id)}}/>   
                           </Card.Title>
                          <Card.Text>
                            {
                                CardData ? 
                                Object.entries(CardData).map((res)=>(
                             <Card className="mt-4">
                                <Card.Body key={res[0]}>
                                <Card.Title > {res[1].title}</Card.Title>
                                <Card.Text className="d-flex justify-content-between">
                                <FormatListBulletedIcon onClick={(e)=> showDetail(
                                    res[0],
                                    res[1].title,
                                    res[1].team,
                                    res[1].description,
                                    res[1].date
                                )}/> 
                                <div>
                                    <span className="cardMembers">{res[1].team.charAt(0)}</span>
                                </div>
                                </Card.Text>
                                </Card.Body>
                             </Card>
                                ))

                                :
                                <div>
                                    <p>No Task is Added</p>
                                </div>
                            }
                           </Card.Text>
                          <Card.Link > <Button  variant="light" size="lg" block onClick={handleShow}>Add a Card</Button></Card.Link>
                        </Card.Body>
                      </Card>  
        </div>
        <div>
          <form className="AddCard">
             <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{
                display: ShowModal ? 'block' : 'none'
                    }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{color: "blue"}}>Add Cart</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Enter a title for your task</label>
                            <input type="text" id="title" className="form-control" style={{width: 750}}  onChange={(e)=>{setCardTitle(e.target.value)}} value={CardTitle} placeholder="eg Add a new Card" />
                        </div>
                        <div className="modal-body">
                            <label>Choose members for this task (select multiple if needed)</label>
                            <InputGroup>
                               <FormControl as="textarea" aria-label="With textarea" id="member" onChange={(e)=>{setMember(e.target.value)}}  >{props.members}</FormControl>
                            </InputGroup>    
                         </div>  
                         <div className="modal-body">
                            <label>Add the description for your task</label>
                            <input type="text" id="description" className="form-control" style={{width: 750}}  onChange={(e)=>{setDescription(e.target.value)}} value={Description} placeholder="Add your description here" />
                        </div>   
                        <div className="modal-body">
                            <label>select the due-date for this task </label>
                            <input type="date" id="due_date" className="form-control" style={{width: 750}}  onChange={(e)=>{setDate(e.target.value)}} value={Date}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="CreateColumn" className="btn3 btn-primary" onClick={()=>{CardSubmit(props.id)}}>Add Cart</button>
                        </div>
                        </div>
                    </div>
                </div>
             </form>
        </div>
        <div>
        <form class="CardShowDetails">
                <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{
                   display: showCardDetails ? 'block' : 'none'
                     }}>
                    <div className="modal-dialog modal-lg" role="document">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={CardhandleClose}>
                     <span aria-hidden="true">&times;</span>
                    </button>
                        <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{color: "blue"}}>Add Column</h5>
                            <div className="modal-footer">
                            <button type="button" id="CreateColumn" className="btn3 btn-primary" >Edit</button>
                            <button type="button" id="CreateColumn" className="btn3 btn-primary" >Archive</button>
                           </div>
                        </div>
                        <div className="modal-body">
                            <label>Enter a column name:</label>
                            <input type="text" id="column_name" className="form-control" style={{width: 750}}  onChange={(e)=>{setAddColumn(e.target.value)}} value={AddColumn}/>
                        </div>
                      
                        </div>
                    </div>
                </div>
                </form>
        </div>
    </div>
    )
}

export default AddCard;


