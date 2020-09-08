import React, {useState , useContext, useEffect} from 'react';


import AddCard from '../../components/AddCard/AddCard'
import Axios from 'axios';
// import { AuthContext} from '../../context/auth'


const Column=(props)=>{

   const [ColumnData , setColumnData] =useState({});

   const [isCardDragged, setIsCardDragged] = useState(false);


  //  const {currentUser}=useContext(AuthContext);

  //  const UserId=currentUser.uid;

   const BoardId=props.BoardId;

   useEffect(()=>{
       GetColumnData();
   } )

   const GetColumnData=()=>{
    Axios.get(`https://pro-organizer-cebf4.firebaseio.com/boardContents/${BoardId}/column.json`)
    .then((response)=>{
        setColumnData(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
   }
 

   const handleCardDrop = (droppedColumnId, e) => {
    e.preventDefault();
    var droppedCardData = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log("dropesCradData",droppedCardData);
    const prevColId = droppedCardData.columnId;
    const prevCardId = droppedCardData.dragCardId;

    const draggedCardData = droppedCardData.cardData;
    console.log("draggedCardData",draggedCardData)

    if (draggedCardData !== null) {
      Axios
      .delete(`https://pro-organizer-cebf4.firebaseio.com/boardContents/${BoardId}/column/${prevColId}/card/${prevCardId}.json`)
        .then((response) => {
          console.log("card removed");
        })
        .catch((error) => console.log("Error" + error));
 
      Axios
      .post(`https://pro-organizer-cebf4.firebaseio.com/boardContents/${BoardId}/column/${droppedColumnId}/card.json`,
        {
            title : draggedCardData.title,
            team: draggedCardData.team,
            description: draggedCardData.description,
            date: draggedCardData.date,
        }
      )
        .then((res) => {
          console.log("card added in new column" , res);
          GetColumnData();
        
        })
        .catch((err) => console.log("Error" + err));
    }
  
  };


    return(
     
        <div>
          
            {
                (ColumnData !== null) ? 
                (
                
                    Object.entries(ColumnData).map((res)=>(
                   
                   <div className="" style={{display: "inline-block"}}
                    onDrop={(e) => handleCardDrop(res[0], e)}
                    onDragOver={(e) => {
                     e.preventDefault();
                     console.log("ondropevent")
                     
                   }}> 
                  

                  
                    <AddCard id={res[0]} name={res[1].name} BoardId={props.BoardId} members={props.members} isCardDragged={isCardDragged}  />
                    </div>
                  ))
                )
                :
                console.log("no data")
            }
        </div>
    )
}

export default Column;

