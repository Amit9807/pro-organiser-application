import React ,{useState,useContext , useEffect} from 'react'
import Header from '../../components/Header/Header'
import {AuthContext} from '../../context/auth'
import { Link } from "react-router-dom";
import Axios from 'axios';
import './MainComponents.css';

function MainComponents(){

    
    const { currentUser } = useContext(AuthContext);

    
    const userId = currentUser.uid;
    
    const [boardContents, setBoardContents] = useState({});
    const [showBoard, setshowBoard] = useState(false);


    useEffect(()=>{
        getBoardContent();
    }, [showBoard])


    const getBoardContent=()=>{
        Axios.get(`https://pro-organizers.firebaseio.com/${userId}/Boards.json`)
        .then((response)=>{
          setBoardContents(response.data)
          console.log("jsbsk",response.data);
            if(boardContents !==null){
              setshowBoard(true);
            }
            else setshowBoard(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    
    return(
       
        <div>
          <Header />
            {
                showBoard ? 
                (
                   Object.entries(boardContents).map((res)=>(
                  <Link
                    to={{
                      pathname: "/board/" + res[1].name,
                      state: {
                        type: res[1].type,
                        members: res[1].team,
                        boardId: res[0],
                      },
                    }}
                  >
                    <div className="d-flex flex-row" key={res[1].name}>
                     <button className="MainComp mx-4 mt-2">{res[1].name}</button>
                    </div>
                  </Link>
                   ))
                )
                :
                (
                    <p className="mx-sm-4 " >You haven't created any boards. Kindly click on the 'Create Board' button in the navigation bar to create a board.</p>
                      
                )
            }
         </div>
    )
}

export default MainComponents;


