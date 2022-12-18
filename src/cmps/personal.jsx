import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantFacts } from "../const/pagita";
import { getPagByUsername, loadPags } from "../store/actions/pagita.action";
import { PagDetails } from "./pag-details";
import CribIcon from '@mui/icons-material/Crib';
import { Link } from "react-router-dom";
export function Personal() {

    const pag = useSelector(state => state.pagitaModule.pag)
    const user = useSelector(state => state.userReducer.user)
    const [fact, setFact] = useState(importantFacts[0])
    const [factInterval, setFactInterval] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            dispatch(loadPags())
            dispatch(getPagByUsername())

        }
        factsBox()
        return () => {
            clearInterval(factInterval)
        }
    }, [])

    const factsBox = () => {
        let counter = 1
        const factInterval = setInterval(() => {
            setFact(importantFacts[counter])
            counter++
            if (counter === importantFacts.length) {
                counter = 1
            }
        }, 7000)
        setFactInterval(factInterval)
    }

    if (!pag) return <div className="no-user">
        <h1>עליך להתחבר על מנת להכנס לאיזור האישי</h1>
    </div>

    return <div className="personal">
        <div className="great">
            <h1> ברוכים השבים, {user.name} </h1>
            <h2> ליווי תינוקך משפיע רבות על הצלחת התהליך</h2>
        </div>

        <div className="main">
        <div className="baby-details">
                <span> נולדתי בתאריך : {pag.bornDate}</span>
                <span> תעודת הזהות שלי : {pag.id}</span>
                <span> המשקל שלי : {pag.weight}</span>
            </div>
            <div className="my-tests">
                <Link to={`${pag._id}`}>הבדיקות שלי  </Link>
            </div>
            <div className="img-important">
                <div className="img-container">
                    <div className="slider">
                        <div className="slides">
                            {pag?.pictures && pag?.pictures.map((picture,idx)=>{
                                return <div id={`slide-${idx+1}`}>
                                    <h3>{picture.title} </h3>
                                    <img src={picture.img}/>
                                </div>
                            })}
                           
                        </div>
                        {/* <a href="#slide-1">1</a>
                    <a href="#slide-2">2</a>
                    <a href="#slide-3">3</a>
                    <a href="#slide-4">4</a>
                    <a href="#slide-5">5</a> */}
                    </div>
                </div>
                <div className="important-facts">
                    <h2 className="title-important"><CribIcon className="icon" fontSize="35" /> חשוב לדעת</h2>
                    <p className="fact" >
                        {fact}
                    </p>
                </div>

            </div>
           

        </div>
    </div>
}
