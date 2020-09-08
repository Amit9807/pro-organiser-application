import React,{useContext , useState , useEffect} from 'react'
import {Card} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {Button  } from 'react-bootstrap'
import Axios from 'axios';
// import { AuthContext} from '../../context/auth'
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

    const [EditCard , setEditCard] = useState(false);

       
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const CardhandleClose = () => setshowCardDetails(false);
    const CardhandleShow = () => setshowCardDetails(true);
    
    // const {currentUser}=useContext(AuthContext);

    // const UserId=currentUser.uid;

    const BoardId=props.BoardId;

    const memberArr = Member.split(",");

 
    useEffect(() => {
        getCardData(props.id);
        setMember(props.members)
    })

    const DeleteCard=(columnId)=>{
       if(window.confirm("Are you sure you want to Delete Card")){
        Axios.delete(`https://pro-organizer-cebf4.firebaseio.com/boardContents/${BoardId}/column/${columnId}.json`)
        .then((res)=>{
            console.log("addedd succefull");
        })
        .catch((error) => console.log("Error" + error));
       }
    }
    

    const CardSubmit=(columnId)=>{
        Axios.post(`https://pro-organizer-cebf4.firebaseio.com/boardContents/${BoardId}/column/${columnId}/card.json`,{
            title: CardTitle,
            team: Member,
            description: Description,
            date: Date
        })
        .then((response)=>{
            
            console.log("CardSubmit",response);
            setShowModal(false);
            getCardData(props.id);

        })
        .catch((error)=>{
            console.log(error);
        })
    }


    const getCardData=(columnId)=>{
        Axios.get(`https://pro-organizer-cebf4.firebaseio.com/boardContents/${BoardId}/column/${columnId}/card.json`)
        .then((response)=>{
            setCardData(response.data);
            
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


    const CardArchieve=(columnId,cardIdArchive)=>{
       
            Axios.delete(`https://pro-organizer-cebf4.firebaseio.com/boardContents/${BoardId}/column/${columnId}/card/${cardIdArchive}.json`)
            .then((response)=>{
                
                setshowCardDetails(false);
                getCardData(props.id);
            })
        
    }


    const Editdetail=()=>{
        CardhandleClose();
        handleShow();
        setEditCard(true);
    }

    const CardEdit=(columnId ,CardId)=>{
        if(window.confirm("Are you sure to Edit card")){
            Axios.put(`https://pro-organizer-cebf4.firebaseio.com/${BoardId}/column/${columnId}/card/${CardId}.json`,{
                title :  CardTitleDetail,
                team : CardTeamDetail,
                description :  CardDescDetail,
                date: CardDateDetail
            })
            .then((response)=>{
               
                handleClose();
                getCardData(props.id);
                setEditCard(false);

            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    const onSelectChange = (e) => {
        const values = [...e.target.selectedOptions].map((opt) => opt.value);
        setCardTeamDetail(values);
        setMember(values);
        console.log(values);

      };

      const drag = (itemData, dragCardId,columnId, e) => {
        var draggedCard = {
          columnId: columnId,
          dragCardId: dragCardId,
          cardData: itemData,
        };
       
         e.dataTransfer.setData("text/plain", JSON.stringify(draggedCard));
        console.log(draggedCard);


      };
    

        const allowDrop = (e) => {
            e.preventDefault();
          };

    
    return(
        
    <div > 

        <div className="mt-4" >

                     <Card className="Card mt-4 mx-3" style={{ width: '18rem' }} >
                        <Card.Body >
                          <Card.Title key={props.id} className="d-flex justify-content-between">
                              {props.name}
                             <DeleteIcon onClick={()=>{DeleteCard(props.id)}}/>   
                           </Card.Title>
                          <Card.Text>
                            {
                         CardData ? 
                            Object.entries(CardData).map((res)=>(
                               
                             <Card className="mt-4"     draggable="true"  onDragStart={(e)=>drag(res[1] ,res[0] ,props.id ,e)} >
                                <Card.Body key={res[0]}>
                                <Card.Title > {res[1].title}</Card.Title>
                               
                                <Card.Text className="d-flex justify-content-between">
                                <FormatListBulletedIcon onClick={(e)=> showDetail(
                                    res[0],
                                    res[1].title,
                                    res[1].team,
                                    res[1].description,
                                    res[1].date
                                )}  
                            /> 
                                
                                 <span className="cardMembers">{res[1].team.charAt(0)}</span>
                                
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
                          <Card.Link > <Button  variant="light" size="lg" block onClick={handleShow} onDragOver={allowDrop}  >Add a Card</Button></Card.Link>
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
                            <h5 className="modal-title" style={{color: "blue"}}>{EditCard ? "Edit Card" : "Add Card"}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Enter a title for your task</label>
                            <input type="text" id="title" className="form-control" style={{width: 750}}   value={EditCard ? CardTitleDetail : CardTitle} onChange={EditCard ? (e)=>{setCardTitleDetail(e.target.value)} : (e)=>{setCardTitle(e.target.value)}} placeholder={EditCard ? CardTitleDetail : "eg Add a new Card"} ></input>
                        </div>
                        <div className="modal-body">
                            <label>Choose members for this task (select multiple if needed)</label>
                            {/* <select type="text" id="membersList" className="form-control" style={{width: 750}}   value={EditCard ? CardTeamDetail : props.members}  > 
                             <option  value={props.members }>{props.members}</option>
                            </select> */}

                          <select  id="membersList" name="membersList" className="form-control" style={{width: 750}}  value={EditCard ? CardTeamDetail : Member} ><br />
                          {memberArr.map((item) => (<option value={EditCard ? CardTeamDetail : item} key={item} onChange={onSelectChange} >{item}</option>))}
                         </select>
                         </div>  
                         <div className="modal-body">
                            <label>Add the description for your task</label>
                            <input type="text" id="description" className="form-control" style={{width: 750}}  onChange={EditCard ? (e)=>{setCardDescDetail(e.target.value)} : (e)=>{setDescription(e.target.value)}} value={EditCard ? CardDescDetail : Description} placeholder="Add your description here" />
                        </div>   
                        <div className="modal-body">
                            <label>select the due-date for this task </label>
                            <input type="date" id="due_date" className="form-control" style={{width: 750}}  onChange={EditCard ? (e)=>{setCardDateDetail(e.target.value)} : (e)=>{setDate(e.target.value)}} value={EditCard ? CardDateDetail : Date}/>
                        </div>
                        <div className="modal-footer">
                        {
                            EditCard ? 
                            <button type="button" id="CreateCard" className="btn3 btn-primary" onClick={()=>{CardEdit(props.id , CardId)}}>Edit Cart</button>
                            :
                            <button type="button" id="CreateCard" className="btn3 btn-primary" onClick={()=>{CardSubmit(props.id)}}>Add Cart</button>
                        }
                        </div>
                        </div>
                    </div>
                </div>
             </form>
        </div>
        <div>
        <form className="CardShowDetails">
                <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{
                   display: showCardDetails ? 'block' : 'none'
                     }}>
                    <div className="modal-dialog modal-lg" role="document">
                 
                        <div className="modal-content ">
                        <div className="modal-header">
                           <h5 className="modal-title" >{CardTitleDetail}</h5>
                           <button type="button " className="close" data-dismiss="modal" aria-label="Close" onClick={CardhandleClose}>
                             <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-footer">
                            <button type="button" id="CreateColumn" className="btn3 btn-primary" onClick={Editdetail}>Edit</button>
                            <button type="button" id="CreateColumn" className="btn3 btn-danger" onClick={()=>{CardArchieve(props.id,CardId)}}>Archive</button>
                           </div>
                        </div>
                        <div className="modal-body">
                               <h4>Description</h4><br/>
                              <span>{CardDescDetail}</span>
                        </div>
                        <div className="modal-body">
                            <h4>Members</h4><br />
                              <span>{CardTeamDetail}</span>
                        </div>
                        <div className="modal-body">
                              <h4>Date</h4><br />
                              <span>{CardDateDetail}</span>
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


