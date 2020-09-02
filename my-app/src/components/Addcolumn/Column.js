import React, {useState , useContext, useEffect} from 'react';


import AddCard from '../../components/AddCard/AddCard'
import Axios from 'axios';
import { AuthContext} from '../../context/auth'


const Column=(props)=>{

   const [ColumnData , setColumnData] =useState({});


   const {currentUser}=useContext(AuthContext);

   const UserId=currentUser.uid;

   const BoardId=props.BoardId;

   useEffect(()=>{
       GetColumnData();
   })

   const GetColumnData=()=>{
    Axios.get(`https://pro-organizers.firebaseio.com/${UserId}/boardContents/${BoardId}/column.json`)
    .then((response)=>{
        setColumnData(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
   }
   

    return(
        <div>
            {
                (ColumnData !== null) ? 
                (
                    Object.entries(ColumnData).map((res)=>(
                           
                    <AddCard id={res[0]} name={res[1].name} BoardId={props.BoardId} members={props.members}/>
                               
                  ))
                )
                :
                null
            }
        </div>
    )
}

export default Column;

